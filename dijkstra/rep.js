const fs = require('fs');

let txtarr = [];
var line;

// 노드 정보 저장된 파일을 가져와서 배열로 만들어 줄 것임
// 목적은 중복된 데이터를 제거하고 간선의 개수를 구하기 위해
fs.readFile('../test.txt', 'utf-8', (err, data) => {
    if(err)
        throw err;
    var arr = data.toString().split("\n");
    for(i in arr){
        txtarr.push(arr[i].split(','));
    };
    // 맨 마지막 null값은 없애줄거임
    txtarr.pop();
    console.log(txtarr);

    // 중복값 제거 코드
    for (let i = 0; i < txtarr.length; i++){
        for(let j = i+1; j < txtarr.length; j++){
            if((txtarr[i] != undefined) && (String(txtarr[i][0]) == String(txtarr[j][1]))){
                txtarr.splice(j,1);
            }
        }
    }
    console.log(txtarr);
    line = txtarr.length;
    console.log(line);

}).then(function(result){
    console.log(line);
});