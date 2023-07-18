const ctt = halt();
ctt.next().value;
function* halt() {
    const fnc = arguments.callee;
    fnc.halted = true;
    while(fnc.halted) {
        console.log('Execution Halted.... halted =', fnc.halted);
        yield fnc.halted = ! fnc.halted;
        console.log('Execution continued', fnc.halted);
    }
    console.log('halt, main return...')
}

function onIncrementClick() {
    ctt.next().value;
}