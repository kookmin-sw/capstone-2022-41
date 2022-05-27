const mongoose = require('mongoose');


// 몽고 DB 연결
const connect = mongoose.connect('mongodb://pyo:woojin@localhost:27017/admin', {
    dbName : 'nodejs',
}, (error) => {
    if(error) {
        console.log('몽고디비 연결 에러', error);
    } else {
        console.log('몽고디비 연결 성공!!!!');
    }
});

module.exports = connect;