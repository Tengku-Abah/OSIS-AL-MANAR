const db = require('./src/config/db');

async function addDivisionColumn() {
    try {
        console.log('Adding division column to WorkProgram...');
        await db.query(`
            ALTER TABLE "WorkProgram" 
            ADD COLUMN IF NOT EXISTS "division" VARCHAR(255) DEFAULT 'Sekbid Umum';
        `);
        console.log('Column added successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error adding column:', error);
        process.exit(1);
    }
}

addDivisionColumn();
