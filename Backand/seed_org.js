const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:tengkuafif1234@localhost:5432/postgres?schema=public',
});

const members = [
    // BPH - Leaders
    { name: 'Mustafa Raja Ungguli', position: 'Ketua OSIS', division: 'BPH', photo: '' },
    { name: 'Mabel Belincia', position: 'Wakil Ketua OSIS', division: 'BPH', photo: '' },

    // BPH - Secretaries
    { name: 'Raditya Putra M.', position: 'Sekretaris 1', division: 'BPH', photo: '' },
    { name: 'Anindita Hadinasa', position: 'Sekretaris 2', division: 'BPH', photo: '' },

    // BPH - Treasurers
    { name: 'M. Pandu Hidayatullah', position: 'Bendahara 1', division: 'BPH', photo: '' },
    { name: 'Ivian', position: 'Bendahara 2', division: 'BPH', photo: '' },

    // Division 1: Olahraga & Kesehatan
    { name: 'Rizky Pratama', position: 'Koordinator', division: 'Olahraga & Kesehatan', photo: '' },
    { name: 'Dimas Anggara', position: 'Anggota', division: 'Olahraga & Kesehatan', photo: '' },
    { name: 'Bayu Saputra', position: 'Anggota', division: 'Olahraga & Kesehatan', photo: '' },

    // Division 2: Kewirausahaan
    { name: 'Siti Aminah', position: 'Koordinator', division: 'Kewirausahaan', photo: '' },
    { name: 'Rina Wati', position: 'Anggota', division: 'Kewirausahaan', photo: '' },
    { name: 'Budi Santoso', position: 'Anggota', division: 'Kewirausahaan', photo: '' },

    // Division 3: TIK & Literasi Digital
    { name: 'Andi Wijaya', position: 'Koordinator', division: 'TIK & Literasi Digital', photo: '' },
    { name: 'Maya Sari', position: 'Anggota', division: 'TIK & Literasi Digital', photo: '' },
    { name: 'Doni Tata', position: 'Anggota', division: 'TIK & Literasi Digital', photo: '' },

    // Division 4: Ketaqwaan
    { name: 'Abdullah', position: 'Koordinator', division: 'Ketaqwaan', photo: '' },
    { name: 'Fatimah', position: 'Anggota', division: 'Ketaqwaan', photo: '' },
];

async function seedOrg() {
    try {
        console.log('Seeding Organization Members...');

        // Clear existing members to avoid duplicates during dev
        await pool.query('DELETE FROM "OrganizationMember"');

        for (const member of members) {
            await pool.query(
                'INSERT INTO "OrganizationMember" (name, position, division, photo) VALUES ($1, $2, $3, $4)',
                [member.name, member.position, member.division, member.photo]
            );
        }

        console.log('Organization members seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding organization:', err);
        process.exit(1);
    }
}

seedOrg();
