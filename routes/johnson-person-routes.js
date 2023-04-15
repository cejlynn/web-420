/*
===============================
; Title: johnson-person-routes
; Author: Caitlynne Johnson
; Date: 14 April 2023
; Description: Person Routes
;==============================
*/

const express = require('express');
const router = express.Router();
const Person = require('../models/johnson-person.js');

/** 
  * findAllPersons
  * @openapi 
  * /api/persons:
  *   get:
  *     tags:
  *       - Students
  *     description: API for returning a list of person documents from MongoDB
  *     summary: return list of person documen t
  *     responses:
  *        '200':
  *          description: Array of person documents
  *        '500':
  *           description: Server Exception
  *        '501':
              description: MongoDB Exception
  */
router.get('/persons', async(req, res) => {
  try {
    Person.find({}, function(err, persons) {
      if (err) {
        console.log(err);
        res.status(501).send({
          'message': `MongoDB Exception: ${err}`
        })
      } else {
        console.log(persons);
        res.json(persons);
      }
    })
  } catch (e) {
      console.log(e);
      res.status(500).send({
        'message': `Server Exception: ${e.message}`
      })
  }
})

/**
