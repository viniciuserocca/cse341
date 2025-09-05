const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1')

routes.get('/', lesson1Controller.viniciusRoute);
routes.get('/rocca', lesson1Controller.roccaRoute);

module.exports = routes;