const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:tengkuafif1234@localhost:5432/postgres?schema=public',
});

async function seedAdmin() {
    try {
        console.log('Seeding Admin...');

        // Ensure AdminUser table exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS "AdminUser" (
                "id" SERIAL PRIMARY KEY,
                "username" VARCHAR(255) UNIQUE NOT NULL,
                "password" TEXT NOT NULL,
                "role" VARCHAR(50) DEFAULT 'admin'
            );
        `);

        // Seed Default Admin
        const adminCheck = await pool.query('SELECT * FROM "AdminUser" WHERE username = $1', ['admin']);
        if (adminCheck.rows.length === 0) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);

            await pool.query(`
                INSERT INTO "AdminUser" ("username", "password") 
                VALUES ($1, $2)
            `, ['admin', hashedPassword]);
            console.log('Default Admin user created: admin / admin123');
        } else {
            console.log('Admin user already exists.');
        }

        process.exit(0);
    } catch (err) {
        console.error('Error seeding admin:', err);
        process.exit(1);
    }
}

seedAdmin();
