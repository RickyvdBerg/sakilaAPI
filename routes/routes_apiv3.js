/**
 * Created by dkroeske on 28/04/2017.
 */

// API - versie 3

const express = require('express');
const router = express.Router();
const db = require('../db/mssql-connector');
const assert = require('assert');

router.get('/actors/:id?', (req, res, next) => {

    const actorId = req.params.id || null;

    if (actorId === null)
    {
        var request = new db.Request();
        request.query(`SELECT TOP 20 * FROM dbo.actor`, function (err, result) {
            if (err) 
            {
                res.status(500).json("An error occured!")
                return next(err);
            }
            else {
    
                var data = {};
                data["user"] = result.recordset;
                res.status(200).json(data)
            }
        }); 
    }
    else
    {
        var request = new db.Request();
        request.query(`SELECT * FROM dbo.actor WHERE actor_id = ${actorId}`, function (err, result) {
            if (err) 
            {
                res.status(500).json("An error occured!")
                return next(err);
            }
            else {
    
                var data = {};
                data["user"] = result.recordset;
                res.status(200).json(data)
            }
        }); 
    }  
});


//werkt nog niet! --------------------
router.post('/actors', (req, res, next) => {

    let actor = req.body;

    assert.equal(typeof (req.body.first_name), 'string', "Argument 'first_name' must be a string.");
    assert.equal(typeof (req.body.last_name), 'string', "Argument 'last_name' must be a string.");

    const query = {
        sql: 'INSERT INTO `actor`(first_name, last_name) VALUES (?, ?)',
        values: [actor.first_name, actor.last_name ],
        timeout: 2000
    };

    console.log('QUERY: ' + query.sql);

    db.query( query, (error, rows, fields) => {
            if (error) {
                res.status(500).json(error.toString())
            } else {
                res.status(200).json(rows)
            }
        })
    //res.status(200).json('ok')

});


module.exports = router;