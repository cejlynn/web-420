/*
===================================
; Title: johnson-person.js
; Author: Caitlynne Johnson
; Date: 14 April 2023
; Description: Person model 
;==================================
*/



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** roleSchema */

let roleSchema = new Schema({
  text: { type: String }
});

/** dependentSchema */

let dependentSchema = new Schema({ 
  firstName: { type: String },
  lastName: { type: String }
});

/** personSchema */
let personSchema = new Schema({ 
  firstName: { type: String },
  lastName: { type: String }, 
  roles: [roleSchema], // array
  dependents: [dependentSchema], // array
  birthDate: { type: String }
  
})

module.exports = mongoose.model('Person', personSchema); 
