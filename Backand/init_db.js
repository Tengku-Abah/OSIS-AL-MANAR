const db = require('./src/config/db');
const bcrypt = require('bcryptjs');

async function initDB() {
    try {
        console.log('Initializing Database...');

        await db.query(`
            CREATE TABLE IF NOT EXISTS "HeroSection" (
                "id" SERIAL PRIMARY KEY,
                "eventName" VARCHAR(255) NOT NULL,
                "eventImage" TEXT NOT NULL
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS "OrganizationMember" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL,
                "position" VARCHAR(255) NOT NULL,
                "photo" TEXT NOT NULL,
                "division" VARCHAR(255) NOT NULL
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS "WorkProgram" (
                "id" SERIAL PRIMARY KEY,
                "title" VARCHAR(255) NOT NULL,
                "description" TEXT NOT NULL,
                "image" TEXT NOT NULL,
                "status" VARCHAR(50) NOT NULL DEFAULT 'PLANNED',
                "division" VARCHAR(255) DEFAULT 'Sekbid Umum',
                "pic" VARCHAR(255) DEFAULT 'BPH (Inti)'
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS "GalleryItem" (
                "id" SERIAL PRIMARY KEY,
                "title" VARCHAR(255) NOT NULL,
                "description" TEXT,
                "image" TEXT NOT NULL,
                "isActive" BOOLEAN DEFAULT true
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS "NewsItem" (
                "id" SERIAL PRIMARY KEY,
                "title" VARCHAR(255) NOT NULL,
                "content" TEXT NOT NULL,
                "image" TEXT,
                "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS "CalendarEvent" (
                "id" SERIAL PRIMARY KEY,
                "title" VARCHAR(255) NOT NULL,
                "date" TIMESTAMP NOT NULL,
                "description" TEXT NOT NULL
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS "Aspiration" (
                "id" SERIAL PRIMARY KEY,
                "sender" VARCHAR(255),
                "message" TEXT NOT NULL,
                "isPrivate" BOOLEAN DEFAULT false,
                "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Admin User Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS "AdminUser" (
                "id" SERIAL PRIMARY KEY,
                "username" VARCHAR(255) UNIQUE NOT NULL,
                "password" TEXT NOT NULL,
                "role" VARCHAR(50) DEFAULT 'admin'
            );
        `);

        // Seed Default Admin
        const adminCheck = await db.query('SELECT * FROM "AdminUser" WHERE username = $1', ['admin']);
        if (adminCheck.rows.length === 0) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);

            await db.query(`
                INSERT INTO "AdminUser" ("username", "password") 
                VALUES ($1, $2)
            `, ['admin', hashedPassword]);
            console.log('Default Admin user created: admin / admin123');
        }

        console.log('Database Tables Created Successfully');
        process.exit(0);
    } catch (err) {
        console.error('Error initializing database:', err);
        process.exit(1);
    }
}

initDB();
