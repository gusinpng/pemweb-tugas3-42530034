const Buku = require('../models/bukuModel');

function validasiBuku({ judul, penulis, tahun_terbit }) {
  const judulBersih = typeof judul === 'string' ? judul.trim() : '';
  const penulisBersih = typeof penulis === 'string' ? penulis.trim() : '';
  const tahun = Number(tahun_terbit);

  if (!judulBersih || !penulisBersih) {
    return { error: 'Judul dan penulis wajib diisi.' };
  }

  if (!Number.isInteger(tahun) || tahun < 1000 || tahun > 2100) {
    return { error: 'Tahun terbit harus berupa angka antara 1000 sampai 2100.' };
  }

  return {
    data: {
      judul: judulBersih,
      penulis: penulisBersih,
      tahun_terbit: tahun
    }
  };
}

// READ: halaman daftar buku dan pencarian.
async function index(req, res) {
  try {
    const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    const buku = await Buku.getAll(q);
    res.render('index', { buku, q, error: null });
  } catch (err) {
    console.error('Gagal mengambil daftar buku:', err);
    res.status(500).send('Terjadi kesalahan pada server.');
  }
}

// CREATE: simpan buku lalu redirect (Post-Redirect-Get).
async function store(req, res) {
  const hasil = validasiBuku(req.body);
  if (hasil.error) {
    try {
      const q = '';
      const buku = await Buku.getAll(q);
      return res.status(400).render('index', { buku, q, error: hasil.error });
    } catch (err) {
      console.error('Gagal menampilkan halaman:', err);
      return res.status(500).send('Terjadi kesalahan pada server.');
    }
  }

  try {
    await Buku.create(hasil.data);
    res.redirect('/');
  } catch (err)  {
    console.error('Gagal menambah buku:', err);
    res.status(500).send('Gagal menambah data buku.');
  }
}

// READ: tampilkan form edit.
async function editForm(req, res) {
  try {
    const buku = await Buku.getById(req.params.id);
    if (!buku) return res.redirect('/');
    res.render('edit', { b: buku, error: null });
  } catch (err) {
    console.error('Gagal mengambil data buku:', err);
    res.status(500).send('Terjadi kesalahan pada server.');
  }
}

// UPDATE: simpan perubahan lalu redirect (Post-Redirect-Get).
async function update(req, res) {
  const hasil = validasiBuku(req.body);
  if (hasil.error) {
    try {
      const buku = await Buku.getById(req.params.id);
      if (!buku) return res.redirect('/');
      return res.status(400).render('edit', {
        b: { ...buku, ...req.body },
        error: hasil.error
      });
    } catch (err) {
      console.error('Gagal menampilkan form edit:', err);
      return res.status(500).send('Terjadi kesalahan pada server.');
    }
  }

  try {
    const affectedRows = await Buku.update(req.params.id, hasil.data);
    if (affectedRows === 0) return res.redirect('/');
    res.redirect('/');
  } catch (err) {
    console.error('Gagal mengubah buku:', err);
    res.status(500).send('Gagal mengubah data buku.');
  }
}

// DELETE: hapus buku lalu redirect (Post-Redirect-Get).
async function destroy(req, res) {
  try {
    await Buku.remove(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error('Gagal menghapus buku:', err);
    res.status(500).send('Gagal menghapus data buku.');
  }
}

module.exports = { index, store, editForm, update, destroy };
