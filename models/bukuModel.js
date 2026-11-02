const pool = require('../config/database');

// READ: mengambil semua buku, dapat difilter berdasarkan judul atau penulis.
async function getAll(keyword = '') {
  const search = `%${keyword}%`;
  const [rows] = await pool.execute(
    'SELECT id, judul, penulis, tahun_terbit FROM buku WHERE judul LIKE ? OR penulis LIKE ? ORDER BY id DESC',
    [search, search]
  );
  return rows;
}

// READ: mengambil satu buku berdasarkan ID.
async function getById(id) {
  const [rows] = await pool.execute(
    'SELECT id, judul, penulis, tahun_terbit FROM buku WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

// CREATE: menambahkan buku.
async function create({ judul, penulis, tahun_terbit }) {
  const [result] = await pool.execute(
    'INSERT INTO buku (judul, penulis, tahun_terbit) VALUES (?, ?, ?)',
    [judul, penulis, tahun_terbit]
  );
  return result.insertId;
}

// UPDATE: memperbarui buku berdasarkan ID.
async function update(id, { judul, penulis, tahun_terbit }) {
  const [result] = await pool.execute(
    'UPDATE buku SET judul = ?, penulis = ?, tahun_terbit = ? WHERE id = ?',
    [judul, penulis, tahun_terbit, id]
  );
  return result.affectedRows;
}

// DELETE: menghapus buku berdasarkan ID.
async function remove(id) {
  const [result] = await pool.execute(
    'DELETE FROM buku WHERE id = ?',
    [id]
  );
  return result.affectedRows;
}

module.exports = { getAll, getById, create, update, remove };
