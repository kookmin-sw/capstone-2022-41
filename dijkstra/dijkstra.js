const arr = require('./array.js');
const pq = require('priorityqueuejs');

var path = [];
var start = 1;
var finish = 4;


// Javascript Priority Queue
var pqq = new pq((a, b)=> {
    return b.cost - a.cost;
	// b-a면 제일 작은 게 위로 올라온다.
});

// Dijkstra Algorithm
function dijkstra(te, start){
    arr.dist[start] = 0;
    pqq.enq({cost : 0, city : start});

    while(!pqq.isEmpty()){
        let current_temp = pqq.peek();
        let current_cost = current_temp.cost;
        let current_city = current_temp.city;
        pqq.deq();

        if(arr.dist[current_city] < current_cost){
            continue;
        }

        for(let i = 1; i < te[current_city].length; i++){
            let next_city = te[current_city][i].city;
            let next_cost = te[current_city][i].cost + current_cost;

            if(Number(next_cost) < Number(arr.dist[next_city])){
                arr.dist[next_city] = next_cost;
                pqq.enq({cost : next_cost, city : next_city});
                arr.route[next_city] = current_city;
            }
        }
    }
}

// 다익스트라 실행 -> Start 다른데서 참조 받아야함
dijkstra(arr.te, start);

// 경로 저장 코드
while(finish) {
    path.push(finish);
    finish = arr.route[finish];
}

for(let i = path.length-2; i>=0; i--){
    process.stdout.write(path[i] + " ");
}