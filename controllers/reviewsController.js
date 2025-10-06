const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get single review
const getReviewById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid review id to find a review.');
    }

    const reviewId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('reviews')
      .findOne({ _id: reviewId });

    if (!result) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single review
const getReviewByBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.bookId)) {
      return res.status(400).json('Must use a valid review id to find a review.');
    }

    const bookId = new ObjectId(req.params.bookId);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('reviews')
      .find({ bookId: bookId })
      .toArray();

    if (!result) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create review
const createReview = async (req, res) => {
  try {
    const review = {
      bookId: new ObjectId(req.body.bookId),
      rating: req.body.rating,
      reviewText: req.body.reviewText,
      createdAt: new Date(),
      createdBy: req.session.user.displayName || req.session.user.username
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('reviews')
      .insertOne(review);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the book review.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update review
const updateReview = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid review id to update a review.');
    }

    const reviewId = new ObjectId(req.params.id);
    const review = {
      bookId: new ObjectId(req.body.bookId),
      rating: req.body.rating,
      reviewText: req.body.reviewText,
      updatedAt: new Date(),
      updatedBy: req.session.user.displayName || req.session.user.username
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('reviews')
      .replaceOne({ _id: reviewId }, review);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Review not found or no changes applied' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete review
const deleteReview = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid review id to delete a review.');
    }

    const reviewId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('reviews')
      .deleteOne({ _id: reviewId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getReviewById,
  getReviewByBook,
  createReview,
  updateReview,
  deleteReview
};
