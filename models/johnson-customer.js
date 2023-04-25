/*
===================================
; Title: johnson-customer.js
; Author: Caitlynne Johnson
; Date: 24 April 2023
; Description: NodeShopper
;==================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** lineItemSchema */

let lineItemSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  quantity: { type: Number }
});

let invoiceSchema = new Schema({
  subtotal: { type: Number },
  tax: { type: Number },
  dateCreated: { type: String },
  dateShipped: { type: String },
  lineItems: [lineItemSchema] // array
});

let customerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String },
  invoices: [invoiceSchema] // array
})

module.exports = mongoose.model('Customer', customerSchema);


    
