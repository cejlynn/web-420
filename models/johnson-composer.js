/*
===================================
; Title: johnson-composer.js
; Author: Caitlynne Johnson
; Date: 7 April 2023
; Description: Composer model 
;==================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** composerSchema */

let composerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String }
});

module.exports = mongoose.model('Composer', composerSchema)
