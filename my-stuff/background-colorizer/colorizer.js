const CLRZ= {
    red: 240, green: 64, blue: 32,
    init: () => {
        CLRZ.bgDiv = document.getElementById('bg');
        document.querySelectorAll('input[data-color]').forEach((color)=>{color.value = CLRZ[color.getAttribute('data-color')];});
        document.querySelectorAll('input[data-color]').forEach((color)=>{
            color.addEventListener('input', CLRZ.colorChanged);
        });
        CLRZ.setDivColor(CLRZ.red, CLRZ.green, CLRZ.blue);
    },
    setDivColor: (r, g, b)=> {
        CLRZ.bgDiv.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    },
    colorChanged: (evt) => {
        const colorEl = evt.currentTarget;
        const type = colorEl.getAttribute('type');
        const color = colorEl.getAttribute('data-color');
        CLRZ[color] = Number(colorEl.value);
        const selector = `input[type=${type === "range" ? "'number'" : "'range'"}][data-color="${color}"]`;
        document.querySelector(selector).value = colorEl.value;
        CLRZ.setDivColor(CLRZ.red, CLRZ.green, CLRZ.blue);
    }
};
window.onload = CLRZ.init;