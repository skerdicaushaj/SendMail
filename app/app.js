require('dotenv').config({path:'./app/.env'})
const process = require('process');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require('./config/database.js');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const corsOptions = {
  origin: "http://localhost:8081"
};

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'Description of your API',
    },
  },
  apis: ['app/routes/routes.js'], // Replace with the actual path to your route files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

db.authenticate().then(() => console.log('Database connected')).catch(err => console.log(`Error: ${err}`));

require("./routes/routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;