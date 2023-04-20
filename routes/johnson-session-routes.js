/*
===============================
; Title: johnson-session-routes.js
; Author: Caitlynne Johnson
; Date: 20 April 2023
; Description: NodeSecurity API
;==============================
*/

const express = require('express');
const router = express.Router();
const Password = require('../models/johnson-user.js');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const saltRounds = 10;

/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - User
 *     description: API for creating a new user. 
 *     summary: creates a new username. 
 *     requestBody:
 *       description: creation of username
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - Password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               Password:
 *                  type: string
 *               emailAddress:
 *                  type: string
 *     responses:
 *       '200':
 *         description: Registered user
 *        '401': 
            description: Username is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */ 
  router.post('/signup', async(req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password
        const newRegisteredUser = {
          userName: req.body.userName,
          password: hashedPassword,
          emailAddress: req.body.emailAddress,
        };
      
     await User.create(newUser, function(err, user) {
       if (eer) {
         console.log(err);
         res.status(501).send({
              'message': `MongoDB Exception ${err}`
         })
       } else {
         console.log(password);
         res.json(password);
       }
     })
    } catch (e) {
      console.log(e)
      res.status(500).send({
          'message': `Server Exception ${e.message}`
      })
    }
  })

/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - User
 *     description: API for logging in
 *     summary: Allows the user to login with created username
 *     requestBody:
 *       description: Log in 
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - Password
 *             properties:
 *               userName:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/login', async(req, res) => {
  try {
    User.findOne({'userName': req.body.userName}, function(err, password) {
      if (err) {
          console.log(err);
          res.status(501).send({
              'message': `MongoDB Exception: ${err}`
          })
      } else {
          console.log(user);
            if (user) {
              let passwordIsValid = bcrypt.compareSync(req.body.password, user.pass);
              
              if (passwordIsValid) {
                console.log('User logged in');
                res.status(200).send({
                  'message': 'User logged in',
                })
              } else {
                console.log('Invalid username and/or password');
                res.status(401).send({
                  'message': `Invalid username and/or password`,
                })
              }
            }
           if (!user) {
             console.log('Invalid username and/or password');
             res.status(401).send({
               'message': `Invalid username and/or password`,
               
      });
           }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
        'message': `Server Exception: ${e}`
    })
  }
})

module.exports = router;
      

      
