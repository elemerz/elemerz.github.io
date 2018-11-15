function setUpTable() {
    var chessTable = document.getElementById('chess'),
        chessCells = chessTable.getElementsByTagName("div"),
        chessColors = ["white", "black"],
        currentColorIndex = 0; //start with white

    for (var i = 0; i < chessCells.length; i++) {
        //decide the cell's color:
        if (i % 8 != 0) {//except each line start ==> switch the color
            currentColorIndex = 1 - currentColorIndex;
        }
        chessCells[i].className = chessColors[currentColorIndex];
        chessCells[i].title = chessColors[currentColorIndex];
        chessCells[i].onclick = cellClicked;
    }

    /*Event handler. the this keyword will automatically refer to the clicked cell*/
    function cellClicked() {
        if (chessTable.prevSelection) removeClass(chessTable.prevSelection, "selected");
        addClass(this, "selected");
        chessTable.prevSelection = this;
    };

    /*Helper functions*/
    function hasClass(elem, clsName) {
        return eval("/\\b" + clsName + "\\b/").test(elem.className);
    };

    function addClass(elem, clsName) {
        if (hasClass(elem, clsName)) {
            return elem.className;
        } else {
            elem.className += " " + clsName
            return elem.className
        }
    };

    function removeClass(elem, clsName) {
        if (hasClass(elem, clsName)) {
            elem.className = elem.className.replace(eval("/\\b" + clsName + "\\b/"), "");
            return elem.className
        } else {
            return elem.className;
        }
    };
};

window.onload = setUpTable;