const express = require('express');
const router = express.Router();
const connect = require('../schemas/mongod');
// const mongoose = require('mongoose');
// const dbtest = require('../schemas/rfid');

router.get('/:idnum', (req, res) => {
    res.send(req.params.idnum);
    console.log(req.params.idnum);
});



module.exports = router;