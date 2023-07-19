const iter = halt(1);
let index = 0;
let arr = ['A', 'B', 'C', 'D', 'E'];
function* halt(i) {
    let j = i;
    let k = '';
    while(j < 5/*fnc.halted*/) {
        console.log('Before yield', j);
        k = yield j++;
        console.log('After yield: j, k', j, k);
    }
    console.log('After while main return... j = ', j);
}

function onIncrementClick() {
    iter.next(arr[index]).value;
    index = index < 4 ? index + 1 : 0;
}
