function toggleSlide() {
    const box = document.querySelector('.slidable');
    if(box.style.height === "0px") {
        box.style.height = `${box.origHeight}px`;
    } else {
        box.origHeight = box.getBoundingClientRect().height;
        box.style.height = "0px";
    }
}