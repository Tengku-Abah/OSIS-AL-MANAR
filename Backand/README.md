# OSIS Al-Manar Backend

Backend API untuk Dashboard Admin OSIS Al-Manar, menggunakan Express.js dan PostgreSQL.

## Prasyarat

1.  **PostgreSQL** harus sudah terinstall dan berjalan.
2.  Buat database bernama `postgres` (default) atau sesuaikan di `.env`.

## Konfigurasi Database

Edit file `.env` (buat file baru jika belum ada, copy dari `.env.example`):

```env
DATABASE_URL="postgresql://username:password@localhost:5432/postgres?schema=public"
PORT=5000
```
*Ganti `username` dan `password` sesuai kredensial PostgreSQL Anda.*

## Cara Menjalankan

1.  **Install Dependencies** (jika belum):
    ```bash
    npm install
    ```

2.  **Inisialisasi Database** (Jalankan sekali saja untuk membuat tabel):
    ```bash
    npm run db:init
    ```

3.  **Jalankan Server** (Mode Development):
    ```bash
    npm run dev
    ```

Server akan berjalan di `http://localhost:5000`.
