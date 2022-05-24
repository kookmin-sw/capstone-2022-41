var fs = require('fs');
const file = '../nodeInfo/testdata2.txt';



// 거리 값 저장을 위한 Array
var dist = [];
var route = [];
var temp = [];

var array = fs.readFileSync(file).toString().split("\n");
// C++의 vector <pair<int, int>> 선언 후 값 저장과 동일
function init(){
	// 미리 노드의 구조를 선언해놓자
	let realUsers = [
		[
			{cost : 0, city : "null"}
		]
	];

    for(i in array){

        // 최초 배열 생성 코드 txt 파일에 첫 dec만큼 N개 배열을 생성함
        // [n][0], [0][n]은 사용 안 함
        if(i==0){
            let s = array[0].slice(0, 1);
            for(let j = 0; j<Number(s); j++){
                realUsers.push([{cost : 0, city : 'null'}]);
            }
            continue;
        }
        // txt 파일 정보들로 dijkstra를 위한 정보 구성
        dist[i] = 99999;
        route[i] = -5;

        temp = array[i].toString().split(",");
        var tempstr = temp[0] + temp[1] + temp[2];
        var str1 = tempstr.charCodeAt(0) - 64;
        var str2 = tempstr.charCodeAt(1) - 64;

        // var from = Number(temp[0]);
        // var to = Number(temp[1]);
        var costy = Number(temp[2]);
        // A에서 B로 가는 비용 vector에 저장
        realUsers[str1].push({cost : costy, city : str2});
        realUsers[str2].push({cost : costy, city : str1});

        
        // realUsers[from].push({cost : costy, city : to});
        // realUsers[to].push({cost : costy, city : from});

        // 1 = 124, 2 = 154
    };

	return realUsers;
}

// Return값 저장
var te = init();


module.exports = {
    te, route, dist
}