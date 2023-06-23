const CLRZ= {
    red: 0, green: 0, blue: 0,
    init: () => {
        CLRZ.red = parseInt(document.getElementById('red').value, 10);
        CLRZ.green = parseInt(document.getElementById('green').value, 10);
        CLRZ.blue = parseInt(document.getElementById('blue').value, 10);
        CLRZ.bgDiv = document.getElementById('bg');
        document.querySelectorAll('input[type="range"]').forEach((slider)=>{
            slider.addEventListener('input', CLRZ.colorChanged);
        });
        CLRZ.setDivColor(CLRZ.red, CLRZ.green, CLRZ.blue);
    },
    setDivColor: (r, g, b)=> {
        CLRZ.bgDiv.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    },
    colorChanged: (evt) => {
        const slider = evt.currentTarget;
        CLRZ[slider.id] = parseInt(slider.value, 10);
        slider.setAttribute('value', slider.value);
        CLRZ.setDivColor(CLRZ.red, CLRZ.green, CLRZ.blue);
    }
};
window.onload = CLRZ.init;