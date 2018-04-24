/**
 * Created by dkroeske on 28/04/2017.
 */

// API - versie 3

const express = require('express');
const router = express.Router();
const assert = require('assert');
const { Pool, Client } = require('pg')

const pool = new Pool({
    user: 'vhgocyppdqcjwj',
    host: 'ec2-54-75-239-237.eu-west-1.compute.amazonaws.com',
    database: 'ddat6p88mjeodj',
    password: 'a5ff7bd24eec6542c2bd372f12d53c8edc45209ab25740be9d52ced35cf696e0',
    port: 5432,
})

router.get('/actors/:id?', (req, res, next) => {

    const actorId = req.params.id || null;

    if (actorId === null) {
        pool.connect((err, client, done) => {
            if (err) throw err
            pool.query(`SELECT * FROM actor`, (err, result) => {
                done()

                if (err) {
                    res.status(500).json("An error occured!")
                    return next(err);
                }
                else {
                    res.status(200).json(result.rows)
                }
            });
        });
    }
    else {
        pool.connect((err, client, done) => {
            if (err) throw err
            pool.query(`SELECT * FROM actor WHERE actor_id = ${actorId}`, (err, result) => {
                done()

                if (err) {
                    res.status(500).json("An error occured!")
                    return next(err);
                }
                else {
                    res.status(200).json(result.rows)
                }
            });
        });
    }
});


//werkt nog niet! --------------------
router.post('/actors', (req, res, next) => {

    let actor = req.body;
    console.log(req.body)


    console.log('QUERY: ' + query.sql);
    pool.connect((err, client, done) => {
        if (err) throw err
        pool.query('INSERT INTO `actor`(first_name, last_name) VALUES (?, ?)', [actor.first_name, actor.last_name ], (error, result) => {
            done()

            if (error) {
                res.status(500).json(error.toString())
            } else {
                res.status(200).json(result.rows)
            }
        })
    })
    //res.status(200).json('ok')
});


module.exports = router;