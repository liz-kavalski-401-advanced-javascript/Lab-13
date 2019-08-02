'use strict'

const express = require('express');
const auth= require('../auth/middleware.js');

const router = express.Router();

router.get('/hidden-stuff' ,auth(),(req,res) => {
    res.status(200).send('Welcome to your profile');
});

router.get('/something-to-read',auth('read'),(req,res) =>{
    res.status(200).send('If you give a mouse a cookie');
});
router.get('/bye-bye',auth('delete'),(req,res) =>{
    res.status(200).send('DANGER WILL ROBINSON');
});
router.post('/create-a-thing',auth('create'),(req,res) =>{
    res.status(200).send('Bibbidi Bobbidi Boo');
});
router.put('/jp',auth('update'),(req,res) =>{
    res.status(200).send('Hakuna Matata');
});

router.get('/everything' ,auth('superuser'),(req,res) => {
    res.status(200).send('With great power comes great responsibility');
});

router.get('/public-stuff',(req,res) =>{
    res.status(200).send('Welcome to the fun zone');
});
module.exports = router;
