window.onload = setupDataList;
function setupDataList() {
    /*** The data model of the drop-down list ***/
    let mdl = [];

    const LONG_DASH = "\u2014"; /*** Special Separator character instead of normal Minus sign ***/
    const PAGE_SIZE = 10; /*** How many rows to move on PageUp/PageDwn in datalist ***/

    /*** all HTML controls ***/
    const input = document.getElementById('input');
    const datalist = document.getElementById('datalist');
    const matchCount = document.getElementById('matchCount');
    const matchesLabel = document.getElementById('matchesLabel');
    const selectionLabel = document.getElementById('selectionLabel');

    const escapeRegex = (s) => { return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); };

    /*** Creates the InnerHtml as string from a sublist of the data model ***/
    const htmlFromArray = (arr) => {
        const a = new Array(arr.length);
        for (let i = 0, l = arr.length; i < l; i++) {
            a[i] = `<option tabindex="${i+1}" value="${[arr[i].uzovi, arr[i].labelCode, arr[i].packageCode].join(LONG_DASH)}">${[arr[i].uzovi, arr[i].packageCode, arr[i].packageType, arr[i].packageName].join(LONG_DASH)}</option>`;
        }
        return a.join('');
    };
    /*** Generates the special option: "No Matches found" ***/
    const noMatchesHtmlOptions = () => {
        return `<option tabindex="-1" value="${LONG_DASH}">No Matches Found</option>`;
    }
    /*** Returns true if the dropdown list has REAL options ("No Matches found" is not a real option) ***/
    const hasOptions = () => {
        return datalist.options && datalist.options.length > 0 && datalist.options[0].value !== LONG_DASH;
    };

    const focusOption = (option) => {
        option.focus();
    };
    const insertAtCaretPos = (newText, el = document.activeElement) => {
        const [start, end] = [el.selectionStart, el.selectionEnd];
        el.setRangeText(newText, start, end, 'end');
    }
    /*** Event Handlers ***/
    const showList = () => {
        datalist.style.display = 'block';
        input.style.borderRadius = "5px 5px 0 0";
        matchesLabel.style.display = 'inline-block';
        selectionLabel.style.display = 'none';
    };

    const hideList = () => {
        datalist.style.display = 'none';
        input.style.borderRadius = "5px";
        matchesLabel.style.display = 'none';
        selectionLabel.style.display = 'inline-block';
        input.focus();
    };

    const isListVisible = () => {
        return datalist && (datalist.style.display !== 'none' && datalist.style.visibility !== 'hidden');
    };

    /**Filters the Data model, changes the innerHTML of the Dropdown List and optionally Opens it after filtering.*/
    const filterList = (openList) => {
        return (/*e: InputEvent*/) => {
            const val = input.value.trim();
            const rex = new RegExp(escapeRegex(val), 'i');
            const filtered = mdl.filter((item) => {return rex.test(item.text);});
            datalist.innerHTML = filtered.length > 0 ? htmlFromArray(filtered) : noMatchesHtmlOptions();
            matchCount.innerHTML = String(filtered.length);
            if(openList && ! isListVisible()) {showList();}
        }
    };

    /**Overtakes the option's value, closes the list, and applies a filter to the selected option*/
    const selectOption = (option) => {
        if(option.value === LONG_DASH) {return;}
        input.value = option.text;
        hideList();
        input.focus();
        //filterList(false)();
    };

    /*** Click handler of an option in the datalist***/
    const optionClick = (e)=>{
        selectOption(e.target);
    }

    /**Keydown Event handler of the Input Box*/
    const inputKeyHandler = (e) => {
        if(['ArrowDown', 'Escape', 'Tab'].indexOf(e.code) !== -1) { e.preventDefault(); }
        switch (e.code) {
            case 'Tab':
            case 'ArrowDown': {
                if(! isListVisible()){
                    showList();
                }
                if (hasOptions()){
                    focusOption(datalist.options[0]);
                }
                break;
            }
            case 'Escape': {
                hideList();
                break;
            }
            case 'Minus': {
                if (e.ctrlKey) {
                    e.preventDefault(); /*Prevent default Browser actions like Shrink*/
                    insertAtCaretPos(LONG_DASH);
                }
            }
        }
    };

    const dataListKeyHandler = (e) => {
        if(e.code !== 'Tab') {e.preventDefault()}
        if(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown','Home', 'End', 'Enter', 'Escape', 'Tab'].indexOf(e.code) === -1 || mdl.length === 0) { return;}
        console.log(e.code)
        const option = e.target;
        let optionToFocus = null

        switch (e.code) {
            case 'ArrowDown': {
                optionToFocus = option.nextSibling;
                break;
            }
            case 'ArrowUp': {
                optionToFocus = option.previousSibling;
                break;
            }
            case 'PageDown': {
                optionToFocus = datalist.querySelector(`option[tabindex="${Math.min(mdl.length - 1, option.tabIndex + PAGE_SIZE)}"]`);
                break;
            }
            case 'PageUp': {
                optionToFocus = datalist.querySelector(`option[tabindex="${Math.max(0, option.tabIndex - PAGE_SIZE)}"]`);
                break;
            }
            case 'Home': {
                optionToFocus = datalist.options[0];
                break;
            }
            case 'End': {
                optionToFocus = datalist.options[datalist.options.length - 1];
                break;
            }
            case 'Enter': {
                selectOption(option);
                break;
            }
            case 'Escape': {
                hideList();
            }
        }

        if(optionToFocus) {
            focusOption(optionToFocus);
        }
    }

    /*** Bind Listeners***/
    // input.onfocus = showList;
    input.oninput = filterList(true);
    input.onkeydown = inputKeyHandler;
    datalist.onkeydown = dataListKeyHandler;
    datalist.onclick = optionClick;

    /*** Load some data: 100, 500, 1500, 2800- long JSON data available***/
    fetch('./data/2800.json').then((response) => response.json()).then((json) => {
        mdl = json;
        filterList(false)();
        hideList();
        input.focus();
    });
}
