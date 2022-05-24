const express = require("express");
const db = require('../schemas/rfid');
const re = require('../schemas/dijk');
const fs = require('fs');
const router = express.Router();

var ar;
var objarr;

// GET / 요청 들어올 때 

// mongodb.js 가보면 내가 db를 nodejs로 연결시켜놨음.
// rfid.js엔 내가 어떤 collection을 연결할건지 적어놨음
router.get("/:idnum", (req, res) => {
    let tag = req.params.idnum;
        re.find({}, {nodeid : 1, linkedNode : 1, _id : 0}).then(function (okk, err){
            ar = okk;
            console.log(okk);
            res.json(okk);
            console.log(ar[0].nodeid, ar[0].linkedNode);
            objarr = Object.keys(ar[1].linkedNode);
            console.log(objarr.length);
        });
});

module.exports = router;