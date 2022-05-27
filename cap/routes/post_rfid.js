const express = require('express');
const re = require('../schemas/dijk');
const connect = require('../schemas/mongod');

var numofNode;
async function findingStart(){
    re.distinct("nodeid").count().then(function(ok, err){
    numofNode = ok;
    console.log("post" + numofNode);
    });
    return await numofNode;
}

module.exports = {
    findingStart
}