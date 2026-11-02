# Tugas 3 Pemrograman Web - CRUD Daftar Buku

Aplikasi CRUD daftar buku menggunakan Express.js, EJS, dan MySQL. Struktur aplikasi dipisahkan menggunakan pola MVC (Model, View, Controller).

## Identitas
- Nama: [Gede Bagus Indra Tanaya]
- NIM: [42530034]
- Tema: Daftar Buku Digital
- Link Youtube : https://youtu.be/s-GozpioMPQ?si=Cmb7uyEx-O1tx6Xq

## Fitur
- **Create:** tambah data buku.
- **Read:** menampilkan daftar buku dan pencarian judul/penulis.
- **Update:** mengubah data buku berdasarkan ID.
- **Delete:** menghapus data buku berdasarkan ID.

## Penerapan
- Express.js sebagai web framework.
- EJS sebagai View/template.
- MySQL dengan `mysql2/promise` Connection Pool.
- Prepared Statements melalui `pool.execute()` dan parameter `?`.
- Post-Redirect-Get (PRG) setelah proses tambah, edit, dan hapus.
- Konfigurasi database melalui environment variable `.env`.
- Validasi input judul, penulis, dan tahun terbit.

## Struktur Folder
```text
config/
  database.js
models/
  bukuModel.js
controllers/
  bukuController.js
routes/
  bukuRoutes.js
views/
  index.ejs
  edit.ejs
public/
  style.css
docs/
  screenshots/
database.sql
.env.example
.gitignore
package.json
server.js
README.md
```

## Cara Menjalankan
1. Pastikan Node.js dan MySQL sudah terpasang.
2. Buat database dengan mengimpor isi `database.sql` melalui MySQL Workbench, DBeaver, phpMyAdmin, atau terminal.
3. Salin `.env.example` menjadi `.env`.
4. Sesuaikan nilai `DB_HOST`, `DB_USER`, `DB_PASSWORD`, dan `DB_NAME` pada file `.env`.
5. Buka terminal di folder project, lalu jalankan:
   ```bash
   npm install
   ```
6. Jalankan aplikasi:
   ```bash
   npm start
   ```
7. Buka browser di http://localhost:3000.
