const pq = require("priorityqueuejs");
var pqq = new pq((a, b)=> {
    return b.cost - a.cost;
    // b-a면 제일 작은게 위로 올라옴
});

let cityobj = {
    cost : 0,
    city : 0
};

// 노드, 간선 입력받을 거니까, 해당 RFID 컬렉션의 개수를 받아와서 row에 넣어주고 columns은 0으로 설정.
// A에서 B로 가는 비용은 C
// A는 n번째 배열, B와 C는 object {}로 들어감. B는 COST, C는 다음 노드
function createArray(rows, columns) {
    var arr = new Array(rows);
    for (var i = 0; i < rows; i++) {
        arr[i] = new Array(columns);
    }
    return arr;
} // 2차원 배열 생성 함수 
var vec = createArray(6, 0); // 행, 열

for(let b = 7, c = 1, i = 0; i < 6; i++, b--, c++){
    cityobj.cost = b;
    cityobj.city = c;
    vec[i].push(cityobj.cost, cityobj.city);
};
console.table(vec);
console.log(typeof(vec));