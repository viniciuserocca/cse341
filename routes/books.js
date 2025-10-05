const express = require('express');
const router = express.Router();

const booksController = require('../controllers/booksController');
const validation = require('../middleware/validate')
const { isAuthenticated } = require('../middleware/authenticate');

// Books Routes
router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);
router.post('/', isAuthenticated, validation.saveBook, booksController.createBook);
router.put('/:id', isAuthenticated, validation.saveBook, booksController.updateBook);
router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;