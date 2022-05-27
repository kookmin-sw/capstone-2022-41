const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: {ObjectId}} = Schema;
const rfidSchema = new Schema({
    tagid:{
        type:String,
        required:true,
    },
    floor:{
        type:String,
        required: true,
    },
     store: {
         type:String,
         required: true,
     },
});

// module.exports = mongoose.model("RFID", rfidSchema);


// 스키마를 인스턴스화 시켜서 타 모듈에서 import해서 사용이 가능하게 만듬
// ("모델 이름", 스키마);
// 여기 들어가는 첫번째 인자가 DB에서 실제 Collection을 나타냄
var db = mongoose.model("rfids", rfidSchema);

module.exports = db;