const db = require('../config/db');
const fs = require('fs');
const path = require('path');

exports.getAllNews = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM "NewsItem" ORDER BY "createdAt" DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createNews = async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const query = `
            INSERT INTO "NewsItem" ("title", "content", "image") 
            VALUES ($1, $2, $3) 
            RETURNING *`;

        const result = await db.query(query, [title, content, image]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const findResult = await db.query('SELECT * FROM "NewsItem" WHERE id = $1', [id]);
        if (findResult.rows.length === 0) return res.status(404).json({ message: 'News not found' });
        const news = findResult.rows[0];

        let image = news.image;
        if (req.file) {
            image = `/uploads/${req.file.filename}`;
            if (news.image) {
                const oldPath = path.join(__dirname, '../../', news.image);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
        }

        const updateQuery = `
            UPDATE "NewsItem" 
            SET "title" = $1, "content" = $2, "image" = $3 
            WHERE id = $4 
            RETURNING *`;

        const result = await db.query(updateQuery, [title, content, image, id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        const findResult = await db.query('SELECT * FROM "NewsItem" WHERE id = $1', [id]);

        if (findResult.rows.length === 0) return res.status(404).json({ message: 'News not found' });
        const news = findResult.rows[0];

        if (news.image) {
            const oldPath = path.join(__dirname, '../../', news.image);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        await db.query('DELETE FROM "NewsItem" WHERE id = $1', [id]);
        res.json({ message: 'News deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
