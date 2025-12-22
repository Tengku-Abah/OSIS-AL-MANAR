const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Auth dengan Service Account
const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../../service-account-key.json'),
    scopes: ['https://www.googleapis.com/auth/drive']
});

const drive = google.drive({ version: 'v3', auth });

/**
 * Mapping category -> folder ID dari environment variables
 * @param {string} category - 'panitia' | 'galeri' | 'news' | 'main' | 'proker'
 * @returns {string} Google Drive Folder ID
 */
function getFolderId(category) {
    switch (category) {
        case 'panitia':
            return process.env.DRIVE_ID_PANITIA;
        case 'galeri':
            return process.env.DRIVE_ID_GALERI;
        case 'news':
            return process.env.DRIVE_ID_NEWS;
        case 'main':
            return process.env.DRIVE_ID_MAIN;
        case 'proker':
            return process.env.DRIVE_ID_PROKER;
        default:
            throw new Error(`Invalid category: ${category}. Valid categories: panitia, galeri, news, main, proker`);
    }
}

/**
 * Upload file ke Google Drive
 * @param {Object} fileObject - Multer file object
 * @param {string} category - Target folder category
 * @returns {Object} Google Drive file metadata
 */
async function uploadFile(fileObject, category) {
    const folderId = getFolderId(category);

    if (!folderId) {
        throw new Error(`Folder ID for category '${category}' is not defined in environment variables`);
    }

    try {
        // Upload file ke Google Drive
        const response = await drive.files.create({
            requestBody: {
                name: fileObject.originalname,
                parents: [folderId]
            },
            media: {
                mimeType: fileObject.mimetype,
                body: fs.createReadStream(fileObject.path)
            },
            fields: 'id, name, mimeType, webViewLink, webContentLink'
        });

        // Set permission agar file bisa diakses publik
        await drive.permissions.create({
            fileId: response.data.id,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });

        // Hapus file temporary dari server
        fs.unlinkSync(fileObject.path);

        return response.data;
    } catch (error) {
        // Hapus file temp jika upload gagal
        if (fs.existsSync(fileObject.path)) {
            fs.unlinkSync(fileObject.path);
        }
        throw error;
    }
}

/**
 * Delete file dari Google Drive
 * @param {string} fileId - Google Drive file ID
 */
async function deleteFile(fileId) {
    await drive.files.delete({ fileId });
}

module.exports = { uploadFile, deleteFile, getFolderId };
