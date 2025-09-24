const express = require('express');
const router = express.Router();

const booksController = require('../controllers/booksController');
const validation = require('../middleware/validate')

// Books Routes
router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);
router.post('/', validation.saveBook, booksController.createBook);
router.put('/:id', validation.saveBook, booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;