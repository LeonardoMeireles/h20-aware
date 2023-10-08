const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/*.js'];

const doc = {
    info: {
        title: 'H20 Aware API',
        description: 'API documentation',
        version: '1.0.0',
    },
    host: 'localhost:3001',
    basePath: '/api',
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger documentation generated');
});