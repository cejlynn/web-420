/*
===============================
; Title: johnson-node-shopper-routes.js
; Author: Caitlynne Johnson
; Date: 25 April 2023
; Description: Node Shopper Routes
;==============================
*/

const express = require('express');
const router = express.Router();
const Customer = require('../models/johnson-customers.js');

/**
  * createCustomer
