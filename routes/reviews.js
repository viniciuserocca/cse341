const express = require('express');
const router = express.Router();

const reviewsController = require('../controllers/reviewsController');
const validation = require('../middleware/validate')

// Reviews Routes

router.get('/book/:bookId', reviewsController.getReviewByBook);
router.get('/:id', reviewsController.getReviewById);
router.post('/', validation.saveReview, reviewsController.createReview);
router.put('/:id', validation.saveReview, reviewsController.updateReview);
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;