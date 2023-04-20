/*
===================================
; Title: johnson-user.js
; Author: Caitlynne Johnson
; Date: 19 April 2023
; Description: NodeSecurity
;==================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** userSchema **/

let userSchema = new Schema({
  userName: { type: String },
  Password: { type: String },
  emailAddress: { type: Array }
  });

module.exports = mongoose.model('User', userSchema);
