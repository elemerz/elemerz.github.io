window.addEventListener('load', ()=> {
    const tip = document.getElementById('tip');
    const arrowStyles = window.getComputedStyle(tip, "::after");
    const arrowHeight = parseInt(arrowStyles.borderTopWidth, 10);
    document.querySelectorAll('.btn-tipped').forEach((btn)=>{
        btn.addEventListener('focus', (evt)=>{
            const btn = evt.currentTarget;
            const btnRect = btn.getBoundingClientRect();
            const tipRect = tip.getBoundingClientRect();
            const tipPos = {top: btnRect.top - tipRect.height - arrowHeight, left:btnRect.left - tipRect.width/2 + btnRect.width/2};
            tip.style.top = `${tipPos.top}px`;
            tip.style.left = `${tipPos.left}px`;
        });
    });
});