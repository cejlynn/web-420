/* =================================
; Title: app.js
; Author: Caitlynne Johnson
; Date: 19 March 2023
; Description: Main server file for the assignments in WEB 420 RESTFul APIs

;=====================================
*/

const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');

let app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({'extended': true}));

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTFul APIs',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], // files containing annotations for the OpenAPI Specification 
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


http.createServer(app).listen(app.get('port'), function() {
    console.log(`Application started and listening on port ${app.get('port')}`);
})