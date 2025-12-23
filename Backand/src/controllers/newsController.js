const db = require('../config/db');
const { uploadFile } = require('../services/gdriveService');

exports.getAllNews = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM "NewsItem" ORDER BY "createdAt" DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM "NewsItem" WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'News not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createNews = async (req, res) => {
    try {
        const { title, content } = req.body;
        let image = null;

        if (req.file) {
            console.log('Uploading news image to Google Drive (category: news)...');
            const driveResult = await uploadFile(req.file, 'news');
            image = driveResult.embedLink;
        }

        const query = `
            INSERT INTO "NewsItem" ("title", "content", "image") 
            VALUES ($1, $2, $3) 
            RETURNING *`;

        const result = await db.query(query, [title, content, image]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating news:', error);
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
            console.log('Uploading new news image to Google Drive (category: news)...');
            const driveResult = await uploadFile(req.file, 'news');
            image = driveResult.embedLink;

            // Note: Tidak menghapus file lama di Drive karena hanya menyimpan URL
        }

        const updateQuery = `
            UPDATE "NewsItem" 
            SET "title" = $1, "content" = $2, "image" = $3 
            WHERE id = $4 
            RETURNING *`;

        const result = await db.query(updateQuery, [title, content, image, id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating news:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        const findResult = await db.query('SELECT * FROM "NewsItem" WHERE id = $1', [id]);

        if (findResult.rows.length === 0) return res.status(404).json({ message: 'News not found' });

        await db.query('DELETE FROM "NewsItem" WHERE id = $1', [id]);
        res.json({ message: 'News deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
