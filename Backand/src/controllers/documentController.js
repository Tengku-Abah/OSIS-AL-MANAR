const { PrismaClient } = require('@prisma/client');
const { uploadFile, deleteFile } = require('../services/gdriveService');

const prisma = new PrismaClient();

/**
 * Upload document ke Google Drive dan simpan metadata ke database
 * POST /api/documents/upload
 */
const uploadDocument = async (req, res) => {
    try {
        const file = req.file;
        const { category } = req.body;

        // Validasi input
        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'File is required'
            });
        }

        if (!category) {
            return res.status(400).json({
                success: false,
                message: 'Category is required. Valid categories: panitia, galeri, news, main'
            });
        }

        const validCategories = ['panitia', 'galeri', 'news', 'main', 'proker'];
        if (!validCategories.includes(category)) {
            return res.status(400).json({
                success: false,
                message: `Invalid category: ${category}. Valid categories: ${validCategories.join(', ')}`
            });
        }

        // Upload ke Google Drive
        const driveResult = await uploadFile(file, category);

        // Simpan metadata ke database
        const document = await prisma.document.create({
            data: {
                category,
                name: driveResult.name,
                mimeType: driveResult.mimeType,
                gdriveId: driveResult.id,
                webViewLink: driveResult.webViewLink || '',
                webContentLink: driveResult.webContentLink || ''
            }
        });

        res.status(201).json({
            success: true,
            message: 'File uploaded successfully',
            data: document
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to upload file'
        });
    }
};

/**
 * Get all documents, optionally filtered by category
 * GET /api/documents?category=galeri
 */
const getDocuments = async (req, res) => {
    try {
        const { category } = req.query;

        const where = category ? { category } : {};

        const documents = await prisma.document.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });

        res.json({
            success: true,
            data: documents
        });

    } catch (error) {
        console.error('Get documents error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get documents'
        });
    }
};

/**
 * Delete document dari database dan Google Drive
 * DELETE /api/documents/:id
 */
const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;

        // Cari document di database
        const document = await prisma.document.findUnique({
            where: { id: parseInt(id) }
        });

        if (!document) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }

        // Hapus dari Google Drive
        await deleteFile(document.gdriveId);

        // Hapus dari database
        await prisma.document.delete({
            where: { id: parseInt(id) }
        });

        res.json({
            success: true,
            message: 'Document deleted successfully'
        });

    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to delete document'
        });
    }
};

module.exports = { uploadDocument, getDocuments, deleteDocument };
