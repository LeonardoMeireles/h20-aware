require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const routes = require('./src/routes');

const app = express();

app.use(express.json());
app.use('/api', routes);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = 3001;

app.listen(port, () => {
    console.log("🚀 API is running: http://localhost:3001/ 🚀");
});