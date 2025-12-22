const db = require('../config/db');
const fs = require('fs');
const path = require('path');

exports.getAllPrograms = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM "WorkProgram" ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createProgram = async (req, res) => {
    try {
        const { title, description, status, division, pic } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';

        const query = `
            INSERT INTO "WorkProgram" ("title", "description", "status", "division", "pic", "image") 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *`;

        const result = await db.query(query, [title, description, status || 'PLANNED', division || 'Sekbid Umum', pic || 'BPH (Inti)', image]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProgram = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, division, pic } = req.body;

        const findResult = await db.query('SELECT * FROM "WorkProgram" WHERE id = $1', [id]);
        if (findResult.rows.length === 0) return res.status(404).json({ message: 'Program not found' });
        const program = findResult.rows[0];

        let image = program.image;
        if (req.file) {
            image = `/uploads/${req.file.filename}`;
            if (program.image) {
                const oldPath = path.join(__dirname, '../../', program.image);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
        }

        const updateQuery = `
            UPDATE "WorkProgram" 
            SET "title" = $1, "description" = $2, "status" = $3, "division" = $4, "pic" = $5, "image" = $6
            WHERE id = $7 
            RETURNING *`;

        const result = await db.query(updateQuery, [title, description, status, division, pic, image, id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProgram = async (req, res) => {
    try {
        const { id } = req.params;
        const findResult = await db.query('SELECT * FROM "WorkProgram" WHERE id = $1', [id]);

        if (findResult.rows.length === 0) return res.status(404).json({ message: 'Program not found' });
        const program = findResult.rows[0];

        if (program.image) {
            const oldPath = path.join(__dirname, '../../', program.image);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        await db.query('DELETE FROM "WorkProgram" WHERE id = $1', [id]);
        res.json({ message: 'Program deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
