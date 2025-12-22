const db = require('../config/db');

exports.getAllEvents = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM "CalendarEvent" ORDER BY date ASC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const { title, date, description } = req.body;

        const query = `
            INSERT INTO "CalendarEvent" ("title", "date", "description") 
            VALUES ($1, $2, $3) 
            RETURNING *`;

        const result = await db.query(query, [title, new Date(date), description]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM "CalendarEvent" WHERE id = $1', [id]);
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
