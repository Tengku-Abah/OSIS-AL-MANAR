const { google } = require('googleapis');
const path = require('path');

// Auth dengan Service Account (tidak perlu refresh token, tidak expired)
const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../../service-account.json'),
    scopes: ['https://www.googleapis.com/auth/drive']
});

const drive = google.drive({ version: 'v3', auth });

// ============================================
// IN-MEMORY CACHE CONFIGURATION
// ============================================
const imageCache = new Map();
const CACHE_MAX_SIZE = 50 * 1024 * 1024; // 50MB max cache size
const CACHE_TTL = 60 * 60 * 1000; // 1 hour TTL
let currentCacheSize = 0;

/**
 * Membersihkan cache yang sudah expired
 */
function cleanExpiredCache() {
    const now = Date.now();
    for (const [key, value] of imageCache.entries()) {
        if (now - value.timestamp > CACHE_TTL) {
            currentCacheSize -= value.data.length;
            imageCache.delete(key);
            console.log(`🗑️ Cache expired: ${key}`);
        }
    }
}

/**
 * Evict oldest entries jika cache penuh (LRU-like)
 */
function evictIfNeeded(newSize) {
    while (currentCacheSize + newSize > CACHE_MAX_SIZE && imageCache.size > 0) {
        const oldestKey = imageCache.keys().next().value;
        const oldestValue = imageCache.get(oldestKey);
        currentCacheSize -= oldestValue.data.length;
        imageCache.delete(oldestKey);
        console.log(`🗑️ Cache evicted (LRU): ${oldestKey}`);
    }
}

// Jalankan cleanup setiap 10 menit
setInterval(cleanExpiredCache, 10 * 60 * 1000);

/**
 * Proxy endpoint untuk mengambil gambar dari Google Drive
 * Dengan in-memory caching untuk performa lebih cepat
 */
exports.getImage = async (req, res) => {
    try {
        const { fileId } = req.params;

        if (!fileId) {
            return res.status(400).json({ message: 'File ID is required' });
        }

        // Check cache first
        const cached = imageCache.get(fileId);
        if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
            console.log(`⚡ Cache HIT: ${fileId}`);
            res.setHeader('Content-Type', cached.contentType);
            res.setHeader('Cache-Control', 'public, max-age=86400'); // Browser cache 24 jam
            res.setHeader('X-Cache', 'HIT');
            return res.send(cached.data);
        }

        console.log(`🌐 Cache MISS: ${fileId} - Fetching from Google Drive...`);

        // Fetch from Google Drive
        const response = await drive.files.get({
            fileId: fileId,
            alt: 'media',
            supportsAllDrives: true
        }, { responseType: 'arraybuffer' }); // Use arraybuffer for caching

        const contentType = response.headers['content-type'] || 'image/jpeg';
        const imageData = Buffer.from(response.data);

        // Store in cache if size is reasonable (< 5MB per image)
        if (imageData.length < 5 * 1024 * 1024) {
            evictIfNeeded(imageData.length);
            imageCache.set(fileId, {
                data: imageData,
                contentType: contentType,
                timestamp: Date.now()
            });
            currentCacheSize += imageData.length;
            console.log(`💾 Cached: ${fileId} (${(imageData.length / 1024).toFixed(1)}KB) | Total cache: ${(currentCacheSize / 1024 / 1024).toFixed(2)}MB`);
        }

        // Send response
        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.setHeader('X-Cache', 'MISS');
        res.send(imageData);

    } catch (error) {
        console.error('❌ Error fetching image from Drive:', error.message);

        // Return placeholder image jika gagal
        res.status(404).json({
            message: 'Image not found',
            error: error.message
        });
    }
};

/**
 * Endpoint untuk melihat status cache (debugging)
 */
exports.getCacheStats = (req, res) => {
    res.json({
        cacheSize: `${(currentCacheSize / 1024 / 1024).toFixed(2)}MB`,
        maxSize: `${(CACHE_MAX_SIZE / 1024 / 1024).toFixed(0)}MB`,
        itemCount: imageCache.size,
        ttl: `${CACHE_TTL / 1000 / 60} minutes`
    });
};
