var oldDocOnSelect = null, lngTimer, titleHeight, borderWidth, callInterval = 30, sizeQuantum = 40, restoredHeight;

function showCustomPopup() {
    document.getElementById("customPopup").style.display = "block";
    dragElement(document.getElementById("customPopup"));
};

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function swapClass(li) {
    var crtClass = li.className;
    if (/_pressed$/.test(crtClass)) {
        li.className = li.className.replace(/_pressed$/, "");
    } else {
        li.className = li.className.replace(/$/, "_pressed");
    }
};
function mouseDown(li) {
    li.pressed = true; //to avoid mouseout trigger mouseup if button was not pressed
    oldDocOnSelect = document.onselectstart;
    document.onselectstart = function () {
        return false;
    };
    swapClass(li);
};
function mouseUp(li) {
    if (lngTimer != 0) clearInterval(lngTimer);
    swapClass(li);
    document.onselectstart = oldDocOnSelect;
    switch (li.className) {
        case "minimize": {
            doMinimize(li);
            break;
        }
        case "restore": {
            doRestore(li);
            break;
        }
        case "close": {
            doClose(li);
            break;
        }
    }
    li.pressed = false;
};

function mouseOut(li) {
    if (li.pressed) swapClass(li);
};

function doMinimize(button) {
    var titleBar = button.parentNode.parentNode;
    titleHeight = titleBar.offsetHeight;
    window.mainContainer = titleBar.parentNode;
    borderWidth = window.getComputedStyle(mainContainer, null).getPropertyValue("borderWidth");
    mainContainer.style.overflow = "hidden";
    restoredHeight = mainContainer.offsetHeight;
    lngTimer = window.setInterval("rollUp(mainContainer)", callInterval);
};
function doRestore(button) {
    var titleBar = button.parentNode.parentNode;
    titleHeight = titleBar.offsetHeight;
    window.mainContainer = titleBar.parentNode;
    borderWidth = window.getComputedStyle(mainContainer, null).getPropertyValue("borderWidth");
    mainContainer.style.overflow = "hidden";
    lngTimer = window.setInterval("rollDown(mainContainer)", callInterval);
};

function rollUp(wnd) {
    var minHeight = titleHeight + 2 * borderWidth;
    var crtHeight = wnd.offsetHeight;
    if (crtHeight > minHeight) {
        crtHeight -= sizeQuantum;
        if (crtHeight < minHeight) {
            crtHeight = titleHeight;
            clearInterval(lngTimer);
            lngTimer = 0;
        }
        wnd.style.height = crtHeight + "px";
    }
};

function rollDown(wnd) {
    var crtHeight = wnd.offsetHeight;
    if (crtHeight < restoredHeight) {
        crtHeight += sizeQuantum;
        if (crtHeight > restoredHeight) {
            crtHeight = restoredHeight;
            clearInterval(lngTimer);
            lngTimer = 0;
        }
        wnd.style.height = crtHeight + "px";
    }
};

function doClose(button) {
    if (confirm("Close it?")) {
        button.parentNode.parentNode.parentNode.style.display = "none";
    }
    swapClass(button);
};