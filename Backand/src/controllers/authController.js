const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'osis-al-manar-secret-key-change-this';

// Login User
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check user
        const result = await db.query('SELECT * FROM "AdminUser" WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = result.rows[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create Token
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, {
            expiresIn: '1d'
        });

        // Send Cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.json({
            message: 'Login successful',
            user: { id: user.id, username: user.username, role: user.role }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logout
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};

// Get Current User (Me)
exports.getMe = async (req, res) => {
    try {
        // Token is verified in middleware, so we access user from req.user
        const user = req.user;
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
