require('dotenv').config();
const mongoose = require('mongoose'); 

let database; 

const initDb = (callback) => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
    })
    .then(() => {
        database = mongoose.connection.client;
        console.log('Mongoose connected to MongoDB!');
        callback(null, database);
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        callback(err);
    });
};

const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};