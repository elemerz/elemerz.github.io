window.addEventListener('load', ()=> {
    document.querySelectorAll('.tipped').forEach((btn)=>{
        const tip = document.getElementById('tip');
        const observer = new MutationObserver((mutationsList, observer)=>{
            for(const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    console.log('A child node has been added or removed.');
                }
            }
        });
        observer.observe(tip, {attributes: false, childList: true, subtree: true});
        const tipRect = tip.getBoundingClientRect();
        const arrowStyles = window.getComputedStyle(tip, "::after");
        const arrowHeight = parseInt(arrowStyles.borderTopWidth, 10);
        btn.addEventListener('focus', (evt)=>{
            const btn = evt.currentTarget;
            const btnRect = btn.getBoundingClientRect();
            const tipExplanation = btn.nextElementSibling.innerHTML;
            tip.innerHTML = tipExplanation;
            const tipPos = {top: btnRect.top - tipRect.height - arrowHeight, left:btnRect.left - tipRect.width/2 + btnRect.width/2};
            tip.style.top = `${tipPos.top}px`;
            tip.style.left = `${tipPos.left}px`;
        });
    });
});