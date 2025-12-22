const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - CORS untuk multiple origins
const allowedOrigins = [
    'http://localhost:3000',
    'https://osis-al-manar.vercel.app',
    /\.vercel\.app$/  // Allow all Vercel preview deployments
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman, curl)
        if (!origin) return callback(null, true);

        // Check if origin matches allowed list
        const isAllowed = allowedOrigins.some(allowed => {
            if (allowed instanceof RegExp) return allowed.test(origin);
            return allowed === origin;
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(null, true); // For now, allow all origins for debugging
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static folder for uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
const authRoutes = require('./routes/authRoutes');
const heroRoutes = require('./routes/heroRoutes');
const memberRoutes = require('./routes/memberRoutes');
const programRoutes = require('./routes/programRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const newsRoutes = require('./routes/newsRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const aspirationRoutes = require('./routes/aspirationRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/aspirations', aspirationRoutes);

// Direct login shortcut
const authController = require('./controllers/authController');
app.post('/api/login', authController.login);
app.post('/api/logout', authController.logout);

// Root Endpoint
app.get('/', (req, res) => {
    res.send('OSIS Al-Manar API is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
