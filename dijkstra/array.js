var fs = require('fs');
const pq = require('priorityqueuejs');
const file = '../nodeInfo/testdata2.txt';

// 우선순위 큐
var pqq = new pq((a, b)=> {
    return b.cost - a.cost;
	// b-a면 제일 작은 게 위로 올라온다.
});

// 거리 값 저장을 위한 Array
var dist = []
var start = 1;
var finish = 4;
var route = [];
var path = [];

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
        var temp = array[i].toString().split(",");
        var from = Number(temp[0]);
        var to = Number(temp[1]);
        var costy = Number(temp[2]);
        // A에서 B로 가는 비용 vector에 저장
        realUsers[from].push({cost : costy, city : to});
        realUsers[to].push({cost : costy, city : from});
    };

	return realUsers;
}

// Return값 저장
var te = init();

// Dijkstra 알고리즘 정의
function dijkstra(te, start){
    dist[start] = 0;
    pqq.enq({cost : 0, city : start});

    while(!pqq.isEmpty()){
        let current_temp = pqq.peek();
        let current_cost = current_temp.cost;
        let current_city = current_temp.city;
        pqq.deq();

        if(dist[current_city] < current_cost){
            continue;
        }

        for(let i = 1; i < te[current_city].length; i++){
            // console.log("시티 사이즈 : "+ te[current_city].length);
            let next_city = te[current_city][i].city;
            let next_cost = te[current_city][i].cost + current_cost;

            if(Number(next_cost) < Number(dist[next_city])){
                dist[next_city] = next_cost;
                pqq.enq({cost : next_cost, city : next_city});
                route[next_city] = current_city;
            }
        }
    }
}

dijkstra(te, start);

while(finish) {
    path.push(finish);
    finish = route[finish];
}

/*for(let i = path.length-2; i>=0; i--){
    process.stdout.write(path[i] + " ");
}*/

var abcd = 123;
console.log(abcd);


module.exports = {
    te, abcd, route
}