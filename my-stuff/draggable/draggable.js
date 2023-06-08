//improve by: https://medium.com/@tbarrasso/drag-drop-using-css-transforms-e063d719a877
const APP=window.APP || {
    makeDraggable: function (elementSelector, handleSelector) {
        const [element, handle] = [document.querySelector(elementSelector), document.querySelector(handleSelector)];
        let [x,y, isMouseDown] = [0, 0, false];
        handle.addEventListener('mousedown', function (event) {
            isMouseDown = true;
            x = event.clientX - element.offsetLeft;
            y = event.clientY - element.offsetTop;
        });
        document.addEventListener('mouseup', function () {
            isMouseDown = false;
        });
        document.addEventListener('mousemove', function (event) {
            if (isMouseDown) {
                element.style.left = (event.clientX - x) + 'px';
                element.style.top = (event.clientY - y) + 'px';
            }
        });
    }
};