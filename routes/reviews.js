const express = require('express');
const router = express.Router();

const reviewsController = require('../controllers/reviewsController');
const validation = require('../middleware/validate')
const { isAuthenticated } = require('../middleware/authenticate');

// Reviews Routes

router.get('/book/:bookId', reviewsController.getReviewByBook);
router.get('/:id', reviewsController.getReviewById);
router.post('/', isAuthenticated, validation.saveReview, reviewsController.createReview);
router.put('/:id', isAuthenticated, validation.saveReview, reviewsController.updateReview);
router.delete('/:id', isAuthenticated, reviewsController.deleteReview);

module.exports = router;