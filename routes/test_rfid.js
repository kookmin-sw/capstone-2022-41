const express = require("express");
const db = require('../schemas/rfid');
const router = express.Router();
const mongoose = require('mongoose');



router.get('/', (req, res) => {
    db.find({store : "맥도날드"}, (err, item) => {
        res.json(item);
        console.log(item);
    })
});

module.exports = router;