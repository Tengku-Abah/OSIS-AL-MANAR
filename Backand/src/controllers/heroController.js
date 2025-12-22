const { PrismaClient } = require('@prisma/client');
const { uploadFile } = require('../services/gdriveService');

const prisma = new PrismaClient();

// Get Hero Settings
const getHeroSettings = async (req, res) => {
    try {
        let hero = await prisma.heroSection.findFirst();

        // If no hero settings exist, create default
        if (!hero) {
            hero = await prisma.heroSection.create({
                data: {
                    eventName: 'Default Event',
                    eventImage: 'https://via.placeholder.com/1920x1080'
                }
            });
        }

        res.status(200).json({
            success: true,
            data: hero
        });
    } catch (error) {
        console.error('Error fetching hero settings:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Update Hero Settings
const updateHeroSettings = async (req, res) => {
    try {
        const { eventName } = req.body;
        let imageUrl = null;

        // Jika ada file yang diupload -> Upload ke GDrive (category: main)
        if (req.file) {
            console.log('Uploading hero image to Google Drive (category: main)...');
            const driveResult = await uploadFile(req.file, 'main');
            imageUrl = driveResult.webViewLink; // Gunakan view link untuk ditampilkan
        }

        // Cari record hero yang ada
        const existingHero = await prisma.heroSection.findFirst();

        let updatedHero;
        if (existingHero) {
            // Update
            updatedHero = await prisma.heroSection.update({
                where: { id: existingHero.id },
                data: {
                    eventName: eventName || existingHero.eventName, // Keep old name if not provided
                    // Jika ada image baru update, jika tidak pakai yang lama
                    eventImage: imageUrl || existingHero.eventImage
                }
            });
        } else {
            // Create baru (fallback case)
            updatedHero = await prisma.heroSection.create({
                data: {
                    eventName: eventName || 'New Event',
                    eventImage: imageUrl || 'https://via.placeholder.com/1920x1080'
                }
            });
        }

        res.status(200).json({
            success: true,
            message: 'Hero settings updated successfully',
            data: updatedHero
        });

    } catch (error) {
        console.error('Error updating hero settings:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};

module.exports = {
    getHeroSettings,
    updateHeroSettings
};
