const db = require('../config/db');

exports.getAllAspirations = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM "Aspiration" ORDER BY "createdAt" DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createAspiration = async (req, res) => {
    try {
        const { sender, message, category } = req.body;

        const query = `
            INSERT INTO "Aspiration" ("sender", "message", "category") 
            VALUES ($1, $2, $3) 
            RETURNING *`;

        const result = await db.query(query, [sender || 'Anonymous', message, category || 'Umum']);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.toggleAspirationPrivacy = async (req, res) => {
    try {
        const { id } = req.params;
        const findResult = await db.query('SELECT * FROM "Aspiration" WHERE id = $1', [id]);

        if (findResult.rows.length === 0) return res.status(404).json({ message: 'Aspiration not found' });
        const aspiration = findResult.rows[0];

        const updateQuery = `
            UPDATE "Aspiration" 
            SET "isPrivate" = $1 
            WHERE id = $2 
            RETURNING *`;

        const result = await db.query(updateQuery, [!aspiration.isPrivate, id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
