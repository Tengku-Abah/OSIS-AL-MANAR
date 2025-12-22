const db = require('../config/db');
const fs = require('fs');
const path = require('path');

// Get Hero Settings
exports.getHeroSettings = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM "HeroSection" LIMIT 1');
        if (result.rows.length === 0) {
            return res.status(200).json({
                eventName: 'Default Event',
                eventImage: ''
            });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Hero Settings
exports.updateHeroSettings = async (req, res) => {
    try {
        const { eventName } = req.body;
        let eventImage = req.body.eventImage;

        if (req.file) {
            eventImage = `/uploads/${req.file.filename}`;

            // Delete old image
            const oldHero = await db.query('SELECT * FROM "HeroSection" LIMIT 1');
            if (oldHero.rows.length > 0 && oldHero.rows[0].eventImage) {
                const oldPath = path.join(__dirname, '../../', oldHero.rows[0].eventImage);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
        }

        // Check if exists
        const check = await db.query('SELECT * FROM "HeroSection" LIMIT 1');

        let updatedHero;
        if (check.rows.length > 0) {
            const id = check.rows[0].id;
            const updateQuery = `
                UPDATE "HeroSection" 
                SET "eventName" = COALESCE($1, "eventName"), 
                    "eventImage" = COALESCE($2, "eventImage") 
                WHERE id = $3 
                RETURNING *`;
            const result = await db.query(updateQuery, [eventName, eventImage, id]);
            updatedHero = result.rows[0];
        } else {
            const insertQuery = `
                INSERT INTO "HeroSection" ("eventName", "eventImage") 
                VALUES ($1, $2) 
                RETURNING *`;
            const result = await db.query(insertQuery, [eventName || 'New Event', eventImage || '']);
            updatedHero = result.rows[0];
        }

        res.json(updatedHero);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
