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
const composerAPI = require("./routes/johnson-composer-routes.js");
const personAPI = require("./routes/johnson-person-routes.js"); 
const userAPI = require("./routes/johnson-session-routes.js");
const nodeAPI = require("./routes/johnson-node-shopper-routes.js")
const teamsAPI = require("./routes/johnson-capstone.js")

let app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({'extended': true}));

/** MongoDB Atlas connection string **/

const conn = "mongodb+srv://web420_user:s3cret@bellevueuniversity.x3pcqyt.mongodb.net/web420DB?retryWrites=true&w=majority";
mongoose.connect(conn, {
    useNewUrlParser: true
}).then(() => {
    console.log(`Connection to web420DB on MongoDB Atlas successful`);
}).catch(err => {
    console.log(`MongoDB Error: ${err.message}`);
})
    

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
app.use('/api', composerAPI);
app.use('/api', personAPI);
app.use('/api', userAPI);
app.use('/api', nodeAPI);
app.use('/api', teamsAPI);


http.createServer(app).listen(app.get('port'), function() {
    console.log(`Application started and listening on port ${app.get('port')}`);
})
