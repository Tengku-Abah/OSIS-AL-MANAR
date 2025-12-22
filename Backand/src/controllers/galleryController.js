const db = require('../config/db');
const fs = require('fs');
const path = require('path');

exports.getAllGalleryItems = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM "GalleryItem" ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.uploadGalleryItem = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';

        if (!image) {
            return res.status(400).json({ message: 'Image is required' });
        }

        const query = `
            INSERT INTO "GalleryItem" ("title", "description", "image", "isActive") 
            VALUES ($1, $2, $3, $4) 
            RETURNING *`;

        const result = await db.query(query, [title || 'Untitled', description || '', image, true]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.toggleGalleryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const findResult = await db.query('SELECT * FROM "GalleryItem" WHERE id = $1', [id]);

        if (findResult.rows.length === 0) return res.status(404).json({ message: 'Item not found' });
        const item = findResult.rows[0];

        const updateQuery = `
            UPDATE "GalleryItem" 
            SET "isActive" = $1 
            WHERE id = $2 
            RETURNING *`;

        const result = await db.query(updateQuery, [!item.isActive, id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteGalleryItem = async (req, res) => {
    try {
        const { id } = req.params;
        const findResult = await db.query('SELECT * FROM "GalleryItem" WHERE id = $1', [id]);

        if (findResult.rows.length === 0) return res.status(404).json({ message: 'Item not found' });
        const item = findResult.rows[0];

        if (item.image) {
            const oldPath = path.join(__dirname, '../../', item.image);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        await db.query('DELETE FROM "GalleryItem" WHERE id = $1', [id]);
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
