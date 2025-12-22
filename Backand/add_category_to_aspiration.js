const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function addCategoryColumn() {
    try {
        console.log('Adding category column to Aspiration table...');

        // Add category column if it doesn't exist
        await pool.query(`
            ALTER TABLE "Aspiration" 
            ADD COLUMN IF NOT EXISTS "category" VARCHAR(50) DEFAULT 'Umum'
        `);

        console.log('✅ Category column added successfully!');

        // Show table structure
        const result = await pool.query(`
            SELECT column_name, data_type, column_default 
            FROM information_schema.columns 
            WHERE table_name = 'Aspiration'
        `);
        console.log('\nTable structure:');
        console.table(result.rows);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await pool.end();
    }
}

addCategoryColumn();
