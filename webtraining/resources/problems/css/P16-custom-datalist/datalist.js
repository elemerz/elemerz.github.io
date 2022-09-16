window.onload = setupDataList;
function setupDataList() {
    /*** all controls ***/
    let input = document.getElementById('input');
    let datalist = document.getElementById('datalist');
    /*** Utility Functions ***/
    const varType = (o) => { return Object.prototype.toString.call(o); };
    const hasOptions = () => {
        return datalist.options && datalist.options.length > 0;
    };
    const focusOption = (option) => {
        option.focus();
    };
    const focusOptionAtIndex = (i) => {
        focusOption(datalist.options[i]);
    };
    const exec = (fnc, params) => {
        if (varType(fnc) !== '[object Function]' ) {
            throw 'Exec must have a function as its first parameter!'
        }
        const args = varType(params) === '[object Array]' ? params : [];
        const that = this;
        window.requestAnimationFrame(()=>{
            fnc.apply(that, args);
        });
    };

    /*** Event Handlers ***/
    const showList = () => {
        datalist.style.display = 'block';
        input.style.borderRadius = "5px 5px 0 0";
    };
    const hideList = () => {
        datalist.style.display = 'none';
        input.style.borderRadius = "5px";
    };
    const isListVisible = () => {
        return datalist && (datalist.style.display !== 'none' && datalist.style.visibility !== 'hidden');
    };
    const filterList = () => {
        const text = input.value.toUpperCase();
        for (let option of datalist.options) {
            option.style.display = (option.value.toUpperCase().indexOf(text) > -1 ? 'block' : 'none');
        }
    };
    const inputKeyHandler = (e) => {
        console.log(`keyEvent.code(${varType(e.code)})=${e.code}`);
        console.log(`isListVisible=${isListVisible()}`);
        if(e.code === 'ArrowDown'){
            if(! isListVisible()){
                showList();
            }
            if (hasOptions()){
                exec(focusOptionAtIndex, [0]);
            }
        } else if(e.code === 'ArrowUp'){
        } else if(e.code === 'Enter'){
        } else if(e.code === 'Escape'){
            hideList();
        }
    };
    const selectOption = (option) => {
        input.value = option.value;
        hideList();
    };
    const dataListKeyHandler = (e)=>{
        e.preventDefault();
        const option = e.target;
        if(['Enter', 'ArrowUp', 'ArrowDown'].indexOf(e.code) === -1) { return;}
        if(e.code === 'Enter') {
            focusOption(option);
            selectOption(option);
        } else {
            const optionToFocus = ('ArrowDown' === e.code ? option.nextElementSibling : option.previousElementSibling);
            optionToFocus && focusOption(optionToFocus);
        }
    }
    const optionMouseEnter = (e)=>{
        console.log('MouseEnter: ', e.target.value);
        e.target.focus();
    }
    /*** Bind Listeners***/
    input.onfocus = showList;
    input.oninput = filterList;
    input.onkeydown = inputKeyHandler;
    datalist.onkeydown = dataListKeyHandler;
    Array.from(datalist.options).forEach((option)=>{
        option.onmouseenter = optionMouseEnter;
    });
}
