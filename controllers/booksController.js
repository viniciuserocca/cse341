const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


// Get all books
const getAll = async (req, res) => {
  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('books')
      .find()
      .toArray();

const booksWithRatings = await Promise.all(
  response.map(async (response) => {
    const reviews = await mongodb
      .getDatabase()
      .db()
      .collection('reviews')
      .find({ bookId: response._id })
      .toArray();
      
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + parseInt(r.rating) || 0, 0) / reviews.length
      : null;

    return {
      ...response,
      rating: avgRating,
    };
  })
);

    res.status(200).json(booksWithRatings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single book
const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid book id to find a book.');
    }

    const bookId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('books')
      .findOne({ _id: bookId });

    if (!response) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const reviews = await mongodb
      .getDatabase()
      .db()
      .collection('reviews')
      .find({ bookId })
      .toArray();

    const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + parseInt(r.rating) || 0, 0) / reviews.length
    : null;

    res.status(200).json({
      ...response,
      rating: avgRating,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a single book
const createBook = async (req, res) => {
  try {
    const book = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publicationDate: req.body.publicationDate,
      isbn: req.body.isbn,
      summary: req.body.summary,
      createdBy: req.session.user.displayName || req.session.user.username,
      createdAt: new Date(),
      updatedBy: null,
      updatedAt: null
    };

    const response = await mongodb.getDatabase().db().collection('books').insertOne(book);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the book.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a single book
const updateBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid book id to update a book.');
    }

    const bookId = new ObjectId(req.params.id);
    const book = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publicationDate: req.body.publicationDate,
      isbn: req.body.isbn,
      summary: req.body.summary,
      updatedBy: req.session.user.displayName || req.session.user.username,
      updatedAt: new Date()
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('books')
      .replaceOne({ _id: bookId }, book);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the book.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a single book
const deleteBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid book id to delete a book.');
    }
    
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('books').deleteOne({ _id: bookId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the book.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook
};