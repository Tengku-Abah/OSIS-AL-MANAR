const { google } = require('googleapis');

// OAuth2 client untuk Google Drive API
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const drive = google.drive({ version: 'v3', auth: oauth2Client });

/**
 * Proxy endpoint untuk mengambil gambar dari Google Drive
 * Ini mengatasi masalah CORS dan akses langsung
 */
exports.getImage = async (req, res) => {
    try {
        const { fileId } = req.params;

        if (!fileId) {
            return res.status(400).json({ message: 'File ID is required' });
        }

        // Ambil file dari Google Drive
        const response = await drive.files.get({
            fileId: fileId,
            alt: 'media',
            supportsAllDrives: true
        }, { responseType: 'stream' });

        // Set content type dari response Google Drive
        const contentType = response.headers['content-type'] || 'image/jpeg';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache 24 jam

        // Pipe stream ke response
        response.data.pipe(res);

    } catch (error) {
        console.error('Error fetching image from Drive:', error.message);

        // Return placeholder image jika gagal
        res.status(404).json({
            message: 'Image not found',
            error: error.message
        });
    }
};
