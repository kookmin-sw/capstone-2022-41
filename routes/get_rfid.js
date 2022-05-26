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
    // console.log(tempurl); console.log(tag1, tag2);
    re.count().then(function(c, err){
       cnt = c;
    });

    // 모든 노드의 nodeid, linkedNode는 출력 _id값은 출력 X
    re.find({}, {nodeid : 1, linkedNode : 1, _id : 0}).then(function (okk, err){
        if(err)
            throw err;
        // 전체 Collection 정보를 담은 Object
        info = okk;
        // Dijkstra 알고리즘 수행을 위한 txt파일 생성
        for(let j = 0; j<cnt; j++){
            arr = String(info[j].nodeid);
            for(let i = 0; i < (Object.keys(info[j].linkedNode)).length; i++){
                fs.appendFile('./test.txt', arr + ',' + (Object.keys(info[j].linkedNode))[i] + ',' + (Object.values(info[j].linkedNode))[i] + '\n', function(err){
                    if(err)
                        throw err;
                });
            };
        };
        console.log("데이터 정상 출력 완료");
    });
});

module.exports = router;