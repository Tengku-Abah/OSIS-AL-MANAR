const db = require('../config/db');
const { uploadFile } = require('../services/gdriveService');

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
        let photo = '';

        if (req.file) {
            console.log('Uploading member photo to Google Drive (category: panitia)...');
            const driveResult = await uploadFile(req.file, 'panitia');
            photo = driveResult.webViewLink;
        }

        const query = `
            INSERT INTO "OrganizationMember" ("name", "position", "division", "photo") 
            VALUES ($1, $2, $3, $4) 
            RETURNING *`;

        const result = await db.query(query, [name, position, division, photo]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating member:', error);
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
            console.log('Uploading new member photo to Google Drive (category: panitia)...');
            const driveResult = await uploadFile(req.file, 'panitia');
            photo = driveResult.webViewLink;

            // Note: Kita tidak menghapus file lama di Drive karena kita hanya menyimpan URL di DB.
            // Jika ingin menghapus, kita harus parse ID dari URL member.photo lama.
        }

        const updateQuery = `
            UPDATE "OrganizationMember" 
            SET "name" = $1, "position" = $2, "division" = $3, "photo" = $4
            WHERE id = $5 
            RETURNING *`;

        const result = await db.query(updateQuery, [name, position, division, photo, id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating member:', error);
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

        // Hapus record dari DB
        await db.query('DELETE FROM "OrganizationMember" WHERE id = $1', [id]);

        // Note: File di Google Drive tidak dihapus otomatis karena kita tidak menyimpan fileId secara eksplisit

        res.json({ message: 'Member deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
