require('dotenv').config();

const express = require('express');
const bukuRoutes = require('./routes/bukuRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', bukuRoutes);

// Penanganan route yang tidak ditemukan.
app.use((req, res) => {
  res.status(404).send('Halaman tidak ditemukan.');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
