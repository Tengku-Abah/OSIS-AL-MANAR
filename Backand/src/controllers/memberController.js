const db = require('../config/db');
const fs = require('fs');
const path = require('path');

// Get All Members
exports.getAllMembers = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM "OrganizationMember" ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Member
exports.createMember = async (req, res) => {
    try {
        const { name, position, division } = req.body;
        const photo = req.file ? `/uploads/${req.file.filename}` : '';

        const query = `
            INSERT INTO "OrganizationMember" ("name", "position", "division", "photo") 
            VALUES ($1, $2, $3, $4) 
            RETURNING *`;

        const result = await db.query(query, [name, position, division, photo]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Member
exports.updateMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, position, division } = req.body;

        // Find member
        const findQuery = 'SELECT * FROM "OrganizationMember" WHERE id = $1';
        const findResult = await db.query(findQuery, [id]);

        if (findResult.rows.length === 0) return res.status(404).json({ message: 'Member not found' });
        const member = findResult.rows[0];

        let photo = member.photo;
        if (req.file) {
            photo = `/uploads/${req.file.filename}`;
            if (member.photo) {
                const oldPath = path.join(__dirname, '../../', member.photo);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
        }

        const updateQuery = `
            UPDATE "OrganizationMember" 
            SET "name" = $1, "position" = $2, "division" = $3, "photo" = $4
            WHERE id = $5 
            RETURNING *`;

        const result = await db.query(updateQuery, [name, position, division, photo, id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Member
exports.deleteMember = async (req, res) => {
    try {
        const { id } = req.params;

        const findQuery = 'SELECT * FROM "OrganizationMember" WHERE id = $1';
        const findResult = await db.query(findQuery, [id]);

        if (findResult.rows.length === 0) return res.status(404).json({ message: 'Member not found' });
        const member = findResult.rows[0];

        if (member.photo) {
            const oldPath = path.join(__dirname, '../../', member.photo);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        await db.query('DELETE FROM "OrganizationMember" WHERE id = $1', [id]);
        res.json({ message: 'Member deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
