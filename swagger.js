const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Books Review API',
        description: 'Books API for Week 03 Assignment - CSE341 Web Services Course'
    },
    host: 'localhost:3000',
    schemes:['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);