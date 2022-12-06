const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Metadata info about our API
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API - calendar',
      version: '1.0.0',
      description:
        'Registra cumpleaños, recordatorios o eventos de fechas importantes y de tu interés.',
    },
  },
  apis: ['routes/*.js', 'models/*.js'],
};

// Docs en JSON format
const swaggerSpec = swaggerJSDoc(options);

/// Function to setup our docs
const swaggerDocs = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = { swaggerDocs };
