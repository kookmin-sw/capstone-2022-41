const express = require("express");
// const mongoose = require('mongoose');
const db = require('../schemas/rfid');
const connect = require('../schemas/mongod');
const router = express.Router();

// GET / 요청 들어올 때 

// mongodb.js 가보면 내가 db를 nodejs로 연결시켜놨음.
// rfid.js엔 내가 어떤 collection을 연결할건지 적어놨음
router.get("/:idnum", (req, res) => {
    let tag = req.params.idnum;
    db.find({"tagid" : tag}, {_id : false, tagid : false}).then(function(ok, err) {
        if(err){
            res.send("not found");
            console.log("notFound");
        }
        res.json(ok);
        console.log("데이터 출력 성공");
    });
});

module.exports = router;