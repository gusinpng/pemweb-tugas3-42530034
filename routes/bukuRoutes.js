const express = require('express');
const router = express.Router();
const bukuController = require('../controllers/bukuController');

// READ
router.get('/', bukuController.index);

// CREATE
router.post('/tambah', bukuController.store);

// UPDATE
router.get('/edit/:id', bukuController.editForm);
router.post('/edit/:id', bukuController.update);

// DELETE
router.post('/hapus/:id', bukuController.destroy);

module.exports = router;
