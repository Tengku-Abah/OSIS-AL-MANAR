const { google } = require('googleapis');
const path = require('path');
const db = require('../config/db');

// Auth dengan Service Account (tidak perlu refresh token, tidak expired)
const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../../service-account.json'),
    scopes: ['https://www.googleapis.com/auth/drive']
});

const drive = google.drive({ version: 'v3', auth });

// Extract file ID dari URL format /api/image/FILE_ID
function extractFileId(url) {
    if (!url) return null;

    // Format: /api/image/FILE_ID
    const proxyMatch = url.match(/\/api\/image\/([a-zA-Z0-9_-]+)/);
    if (proxyMatch) return proxyMatch[1];

    // Format Google Drive lainnya
    const driveMatch = url.match(/([a-zA-Z0-9_-]{25,})/);
    if (driveMatch) return driveMatch[1];

    return null;
}

// Cek apakah file masih ada di Google Drive
async function checkFileExists(fileId) {
    try {
        await drive.files.get({
            fileId: fileId,
            fields: 'id,name',
            supportsAllDrives: true
        });
        return true;
    } catch (error) {
        if (error.code === 404) return false;
        // Rate limit atau error lain, anggap file masih ada
        console.log(`Warning checking ${fileId}:`, error.message);
        return true;
    }
}

/**
 * Validate dan cleanup semua URL gambar di database
 * GET /api/cleanup/validate - Hanya scan tanpa delete
 * POST /api/cleanup/run - Scan dan cleanup URL invalid
 */
exports.validateImages = async (req, res) => {
    try {
        const results = {
            heroSection: { total: 0, valid: 0, invalid: 0, items: [] },
            workProgram: { total: 0, valid: 0, invalid: 0, items: [] },
            organizationMember: { total: 0, valid: 0, invalid: 0, items: [] },
            gallery: { total: 0, valid: 0, invalid: 0, items: [] },
            news: { total: 0, valid: 0, invalid: 0, items: [] }
        };

        console.log('🔍 Starting image validation...');

        // Check HeroSection
        const heroes = await db.query('SELECT * FROM "HeroSection"');
        for (const hero of heroes.rows) {
            if (hero.eventImage) {
                results.heroSection.total++;
                const fileId = extractFileId(hero.eventImage);
                if (fileId) {
                    const exists = await checkFileExists(fileId);
                    if (exists) {
                        results.heroSection.valid++;
                    } else {
                        results.heroSection.invalid++;
                        results.heroSection.items.push({ id: hero.id, url: hero.eventImage });
                    }
                }
            }
        }

        // Check WorkProgram
        const programs = await db.query('SELECT * FROM "WorkProgram"');
        for (const prog of programs.rows) {
            if (prog.image) {
                results.workProgram.total++;
                const fileId = extractFileId(prog.image);
                if (fileId) {
                    const exists = await checkFileExists(fileId);
                    if (exists) {
                        results.workProgram.valid++;
                    } else {
                        results.workProgram.invalid++;
                        results.workProgram.items.push({ id: prog.id, title: prog.title, url: prog.image });
                    }
                }
            }
        }

        // Check OrganizationMember
        const members = await db.query('SELECT * FROM "OrganizationMember"');
        for (const member of members.rows) {
            if (member.photo) {
                results.organizationMember.total++;
                const fileId = extractFileId(member.photo);
                if (fileId) {
                    const exists = await checkFileExists(fileId);
                    if (exists) {
                        results.organizationMember.valid++;
                    } else {
                        results.organizationMember.invalid++;
                        results.organizationMember.items.push({ id: member.id, name: member.name, url: member.photo });
                    }
                }
            }
        }

        // Check Gallery
        const galleries = await db.query('SELECT * FROM "GalleryItem"');
        for (const gallery of galleries.rows) {
            if (gallery.image) {
                results.gallery.total++;
                const fileId = extractFileId(gallery.image);
                if (fileId) {
                    const exists = await checkFileExists(fileId);
                    if (exists) {
                        results.gallery.valid++;
                    } else {
                        results.gallery.invalid++;
                        results.gallery.items.push({ id: gallery.id, url: gallery.image });
                    }
                }
            }
        }

        // Check News
        const newsItems = await db.query('SELECT * FROM "News"');
        for (const news of newsItems.rows) {
            if (news.image) {
                results.news.total++;
                const fileId = extractFileId(news.image);
                if (fileId) {
                    const exists = await checkFileExists(fileId);
                    if (exists) {
                        results.news.valid++;
                    } else {
                        results.news.invalid++;
                        results.news.items.push({ id: news.id, title: news.title, url: news.image });
                    }
                }
            }
        }

        console.log('✅ Validation complete');

        res.json({
            success: true,
            message: 'Image validation complete',
            summary: {
                totalImages: Object.values(results).reduce((sum, r) => sum + r.total, 0),
                validImages: Object.values(results).reduce((sum, r) => sum + r.valid, 0),
                invalidImages: Object.values(results).reduce((sum, r) => sum + r.invalid, 0)
            },
            details: results
        });

    } catch (error) {
        console.error('Validation error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Cleanup - Reset URL gambar yang tidak valid ke empty string
 */
exports.cleanupImages = async (req, res) => {
    try {
        const cleaned = {
            heroSection: 0,
            workProgram: 0,
            organizationMember: 0,
            gallery: 0,
            news: 0
        };

        console.log('🧹 Starting image cleanup...');

        // Cleanup HeroSection
        const heroes = await db.query('SELECT * FROM "HeroSection"');
        for (const hero of heroes.rows) {
            if (hero.eventImage) {
                const fileId = extractFileId(hero.eventImage);
                if (fileId) {
                    const exists = await checkFileExists(fileId);
                    if (!exists) {
                        await db.query('UPDATE "HeroSection" SET "eventImage" = $1 WHERE id = $2', ['', hero.id]);
                        cleaned.heroSection++;
                        console.log(`  Cleaned HeroSection #${hero.id}`);
                    }
                }
            }
        }

        // Cleanup WorkProgram
        const programs = await db.query('SELECT * FROM "WorkProgram"');
        for (const prog of programs.rows) {
            if (prog.image) {
                const fileId = extractFileId(prog.image);
                if (fileId) {
                    const exists = await checkFileExists(fileId);
                    if (!exists) {
                        await db.query('UPDATE "WorkProgram" SET "image" = $1 WHERE id = $2', ['', prog.id]);
                        cleaned.workProgram++;
                        console.log(`  Cleaned WorkProgram #${prog.id}`);
                    }
                }
            }
        }

        // Cleanup OrganizationMember
        const members = await db.query('SELECT * FROM "OrganizationMember"');
        for (const member of members.rows) {
            if (member.photo) {
                const fileId = extractFileId(member.photo);
                if (fileId) {
                    const exists = await checkFileExists(fileId);
                    if (!exists) {
                        await db.query('UPDATE "OrganizationMember" SET "photo" = $1 WHERE id = $2', ['', member.id]);
                        cleaned.organizationMember++;
                        console.log(`  Cleaned Member #${member.id}`);
                    }
                }
            }
        }

        // Cleanup Gallery
        const galleries = await db.query('SELECT * FROM "GalleryItem"');
        for (const gallery of galleries.rows) {
            if (gallery.image) {
                const fileId = extractFileId(gallery.image);
                if (fileId) {
                    const exists = await checkFileExists(fileId);
                    if (!exists) {
                        await db.query('UPDATE "GalleryItem" SET "image" = $1 WHERE id = $2', ['', gallery.id]);
                        cleaned.gallery++;
                        console.log(`  Cleaned Gallery #${gallery.id}`);
                    }
                }
            }
        }

        // Cleanup News
        const newsItems = await db.query('SELECT * FROM "News"');
        for (const news of newsItems.rows) {
            if (news.image) {
                const fileId = extractFileId(news.image);
                if (fileId) {
                    const exists = await checkFileExists(fileId);
                    if (!exists) {
                        await db.query('UPDATE "News" SET "image" = $1 WHERE id = $2', ['', news.id]);
                        cleaned.news++;
                        console.log(`  Cleaned News #${news.id}`);
                    }
                }
            }
        }

        const totalCleaned = Object.values(cleaned).reduce((sum, c) => sum + c, 0);
        console.log(`✅ Cleanup complete. Cleaned ${totalCleaned} invalid URLs.`);

        res.json({
            success: true,
            message: `Cleanup complete. Cleaned ${totalCleaned} invalid image URLs.`,
            cleaned
        });

    } catch (error) {
        console.error('Cleanup error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
