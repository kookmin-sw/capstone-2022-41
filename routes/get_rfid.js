const express = require("express");
const con = require('./post_rfid');
const db = require('../schemas/rfid');
const re = require('../schemas/dijk');
const fs = require('fs');
const router = express.Router();


var cnt;
var info;

router.get("/?", (req, res) => {
    let tempurl = req.url;
    let tag1 = req.query.store1;
    let tag2 = req.query.store2;
    console.log(tempurl);
    console.log(tag1, tag2);
    re.count().then(function(c, err){
       cnt = c;
    });

    re.find({}, {nodeid : 1, linkedNode : 1, _id : 0}).then(function (okk, err){
        info = okk;
        res.json(okk);
        // console.log(cnt);
        for(let j = 0; j<cnt; j++){
            arr = String(info[j].nodeid);
            for(let i = 0; i < (Object.keys(info[j].linkedNode)).length; i++){
                fs.appendFile('./test.txt', arr + ',' + (Object.keys(info[j].linkedNode))[i] + ',' + (Object.values(info[j].linkedNode))[i] + '\n', function(err){
                    if(err)
                        throw err;
                });
            };
        };
        console.log(info[4].nodeid, (Object.keys(info[0].linkedNode)).length);
    });
});

module.exports = router;