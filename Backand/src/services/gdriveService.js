const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Auth dengan OAuth2 (menggunakan refresh token)
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
            fields: 'id, name, mimeType, webViewLink, webContentLink',
            supportsAllDrives: true
        });

        // Set permission agar file bisa diakses publik
        await drive.permissions.create({
            fileId: response.data.id,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            },
            supportsAllDrives: true
        });

        // Hapus file temporary dari server
        fs.unlinkSync(fileObject.path);

        // Generate embeddable URL menggunakan proxy backend
        // Ini lebih reliable daripada akses langsung ke Google Drive
        const fileId = response.data.id;
        const embedLink = `/api/image/${fileId}`;

        return {
            ...response.data,
            embedLink, // URL yang bisa langsung dipakai di <img src="">
            webViewLink: response.data.webViewLink
        };
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
    try {
        await drive.files.delete({
            fileId,
            supportsAllDrives: true
        });
    } catch (error) {
        console.error('Error deleting file from Drive:', error);
        throw error;
    }
}

// Fungsi test list files untuk debugging permission
async function listFilesTest(folderId) {
    try {
        const res = await drive.files.list({
            q: `'${folderId}' in parents`,
            fields: 'files(id, name)',
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
            pageSize: 5
        });
        console.log('Files in folder:', res.data.files);
        return res.data.files;
    } catch (error) {
        console.error('Error listing files:', error);
        throw error;
    }
}

module.exports = { uploadFile, deleteFile, getFolderId, listFilesTest };
