const Validator = require('validatorjs');

const bookRules = {
  title: 'required|string|min:2',
  author: 'required|string|min:2',
  genre: 'string',
  publicationDate: 'date',
  isbn: 'string|min:10|max:13',
  rating: 'numeric|min:0|max:5',
  summary: 'string|min:5'
};

const reviewRules = {
  bookId: 'required|string', 
  reviewText: 'required|string|min:5', 
  rating: 'required|numeric|min:0|max:5', 
  createdAt: 'date'                     
};

function validate(rules) {
  return (req, res, next) => {
    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return res.status(400).json({
        errors: validation.errors.all()
      });
    }
    next();
  };
}

module.exports = {
  saveBook: validate(bookRules),
  saveReview: validate(reviewRules)
};