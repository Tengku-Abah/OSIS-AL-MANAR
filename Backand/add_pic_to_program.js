const db = require('./src/config/db');

async function addPicColumn() {
    try {
        console.log('Adding pic column to WorkProgram...');
        await db.query(`
            ALTER TABLE "WorkProgram" 
            ADD COLUMN IF NOT EXISTS "pic" VARCHAR(255) DEFAULT 'BPH (Inti)';
        `);
        console.log('Column pic added successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error adding column:', error);
        process.exit(1);
    }
}

addPicColumn();
