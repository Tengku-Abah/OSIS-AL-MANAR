// Script untuk mengubah semua URL gambar lama ke format baru
// Jalankan dengan: node migrate_image_urls.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fungsi untuk extract file ID dari berbagai format URL Google Drive
function extractFileId(url) {
    if (!url) return null;

    // Format: /api/image/FILE_ID (sudah proxy format)
    const proxyMatch = url.match(/\/api\/image\/([a-zA-Z0-9_-]+)/);
    if (proxyMatch) return proxyMatch[1];

    // Format: https://lh3.googleusercontent.com/d/FILE_ID
    const lh3Match = url.match(/lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
    if (lh3Match) return lh3Match[1];

    // Format: https://drive.google.com/uc?export=view&id=FILE_ID
    const ucMatch = url.match(/drive\.google\.com\/uc\?export=view&id=([a-zA-Z0-9_-]+)/);
    if (ucMatch) return ucMatch[1];

    // Format: https://drive.google.com/file/d/FILE_ID/view
    const fileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch) return fileMatch[1];

    // Format: https://drive.google.com/thumbnail?id=FILE_ID
    const thumbMatch = url.match(/drive\.google\.com\/thumbnail\?id=([a-zA-Z0-9_-]+)/);
    if (thumbMatch) return thumbMatch[1];

    return null;
}

// Cek apakah URL sudah format proxy
function isProxyFormat(url) {
    return url && url.startsWith('/api/image/');
}

// Fungsi untuk generate URL proxy baru
function generateNewUrl(fileId) {
    return `/api/image/${fileId}`;
}

async function migrateUrls() {
    console.log('🔄 Starting URL migration...\n');

    // Migrate HeroSection
    const heroSections = await prisma.heroSection.findMany();
    for (const hero of heroSections) {
        if (hero.eventImage) {
            const fileId = extractFileId(hero.eventImage);
            if (fileId && !isProxyFormat(hero.eventImage)) {
                const newUrl = generateNewUrl(fileId);
                await prisma.heroSection.update({
                    where: { id: hero.id },
                    data: { eventImage: newUrl }
                });
                console.log(`✅ HeroSection #${hero.id}: Updated`);
            }
        }
    }

    // Migrate WorkProgram (programs)
    const programs = await prisma.workProgram.findMany();
    for (const prog of programs) {
        if (prog.image) {
            const fileId = extractFileId(prog.image);
            if (fileId && !isProxyFormat(prog.image)) {
                const newUrl = generateNewUrl(fileId);
                await prisma.workProgram.update({
                    where: { id: prog.id },
                    data: { image: newUrl }
                });
                console.log(`✅ WorkProgram #${prog.id} "${prog.title}": Updated`);
            }
        }
    }

    // Migrate OrganizationMember
    const members = await prisma.organizationMember.findMany();
    for (const member of members) {
        if (member.photo) {
            const fileId = extractFileId(member.photo);
            if (fileId && !isProxyFormat(member.photo)) {
                const newUrl = generateNewUrl(fileId);
                await prisma.organizationMember.update({
                    where: { id: member.id },
                    data: { photo: newUrl }
                });
                console.log(`✅ Member #${member.id} "${member.name}": Updated`);
            }
        }
    }

    // Migrate Gallery
    const galleries = await prisma.gallery.findMany();
    for (const gallery of galleries) {
        if (gallery.image) {
            const fileId = extractFileId(gallery.image);
            if (fileId && !isProxyFormat(gallery.image)) {
                const newUrl = generateNewUrl(fileId);
                await prisma.gallery.update({
                    where: { id: gallery.id },
                    data: { image: newUrl }
                });
                console.log(`✅ Gallery #${gallery.id}: Updated`);
            }
        }
    }

    // Migrate News
    const newsItems = await prisma.news.findMany();
    for (const news of newsItems) {
        if (news.image) {
            const fileId = extractFileId(news.image);
            if (fileId && !isProxyFormat(news.image)) {
                const newUrl = generateNewUrl(fileId);
                await prisma.news.update({
                    where: { id: news.id },
                    data: { image: newUrl }
                });
                console.log(`✅ News #${news.id} "${news.title}": Updated`);
            }
        }
    }

    console.log('\n✨ Migration complete!');
}

migrateUrls()
    .catch(e => {
        console.error('❌ Migration failed:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
