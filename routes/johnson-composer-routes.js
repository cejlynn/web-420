/*
===============================
; Title: johnson-composer-routes
; Author: Caitlynne Johnson
; Date: 7 April 2023
; Description: Composer API
;==============================
*/

const express = require('express');
const router = express.Router();
const Composer = require('../models/johnson-composer.js');

/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - Composers
 *     description: API for returning an array of composers objects.
 *     summary: returns an array of composers in JSON format.
 *     responses:
 *       '200':
 *         description: array of composers.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get('/composers', async(req, res) => {
    try {
        Composer.find({}, function(err, composers) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`,
                });
            } else {
                console.log(composers);
                res.json(composers);
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`,
        });
    }
});

/**
 * findComposerById
 * @openapi
 * /api/composers/{id}:
 * get:
 *  tags:
 *      - Composers
 *      description: API for returning composer document
 *      summary: returns a composer document
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Composer document id
 *         schema:
 *         type: string
 *  responses:
 *     '200':
 *       description: Composer document
 *      '500': 
 *        description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/composers/:id', async(req, res) => {
    try {
        Composer.findOne({'_id': req.params.id}, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`,
                });
            } else {
                console.log(composer);
                res.json(composer);
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`,
        });
    }
});

/**
 * createComposer
 * @openapi
 * /api/composers:
 * post:
 *  tags:
 *      - Composers
 *      name: createComposer
 *      description: API for adding a new composer document to MongoDB Atlas
 *      summary: Creates a new fruit document
 *      requestBody:
 *         description: Composer information
 *         content:
 *           application/json:
 *              schema:
 *                required:
 *                  - type
 *                properties:
 *                  type:
 *                      type: string
 *  responses:
 *     '200':
 *       description: Composer added
 *      '500': 
 *        description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */    
router.post('/composers', async(req, res) => {
    try {
        const newComposer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        };
        
        await Composer.create(newComposer, function (err, composer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`,
                });
            } else {
                console.log(composer);
                res.json(composer);
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        });
    }
});


/**  
 * updateComposerById
 * @openapi 
 * /api/composers/{id}:
 *   put:
 *     tags:
 *        - Composers
 *     name: updateComposerById
 *     descrption: API for updating an existing document in MongoDB
 *     summary: Updates a document in MongoDB
 *     parameters: 
 *       - name: id 
 *          in: path 
 *          required: true
 *          description: Id to filter the collection by 
 *           schema: 
 *              type: string
 *     requestBody:
 *       description: Composer information
 *       content: 
 *          application/json:
 *            schema: 
 *                required: 
 *                    - type 
 *                properties:
 *                  type: 
 *                    type: string 
 *     responses:
 *       '200': 
 *          description: Array of composer documents 
 *       '401': 
 *          description: Invalid composerId
 *       '500': 
 *          description: Server Exception
 *        '501': 
 *           description: MongoDB Exception
 
 */
router.put('/composers/:id', async (req, res) => {
    try {
        const composerDocId = req.params.id; 
        
        Composer.findOne({'_id': composerDocId}, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composer);
                
                composer.set({
                    firstName: req.body.type
                    lastName: req.body.type
                });
                
                composer.save(function(err, updatedComposer) {
                    if (err) {
                        console.log(err); 
                        res.json(updatedComposer);
                    } else {
                        console.log(updatedComposer);
                        res.json(updatedComposer);
                        
                    }
                })
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
 * deleteComposer
 * @openapi
 * /api/composer/{id}: 
 *   delete: 
 *      tags: 
 *        - Composer
 *      name: deleteComposer
 *      description: API for deleting a document from MongoDB
 *      summary: Removes a document from MongoDB
 *      parameters: 
 *        - name: id
 *          in: path
 *          required: true
 *          description: Id of the document to remove
 *          schema:
 *            type: string
 *       responses:
 *          '200': 
 *             description: Composer document
 *           '500': 
 *              description: Server Exception
 *           '501': 
 *              description: MongoDB Exception
 */
router.delete('/composers/:id', async (req, res) => {
    try {
        const composerDocId = req.params.id;
        
        Composer.findByIdandDelete({'_id': composerDocId}, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer);
            }
            
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
    
})



module.exports = router;
