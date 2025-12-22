const db = require('./src/config/db');

async function addDescToGallery() {
    try {
        console.log('Adding description column to GalleryItem...');
        await db.query(`
            ALTER TABLE "GalleryItem" 
            ADD COLUMN IF NOT EXISTS "description" TEXT;
        `);
        console.log('Column description added successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error adding column:', error);
        process.exit(1);
    }
}

addDescToGallery();
