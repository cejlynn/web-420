/*
===================================
; Title: johnson-capstone.js
; Author: Caitlynne Johnson
; Date: 12 May 2023
; Description: Capstone
;==================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Team Schema **/

let playerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  salary: { type: Number }
});

let teamSchema = new Schema({
  name: { type: String },
  mascot: { type: String },
  players: [playerSchema], // array 
});

module.exports = mongoose.model('Teams', teamSchema);

