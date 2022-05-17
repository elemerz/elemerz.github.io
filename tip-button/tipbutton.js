window.addEventListener('load', ()=> {
    document.querySelectorAll('.tipped').forEach((btn)=>{
        const tip = document.getElementById('tip');
        const arrowStyles = window.getComputedStyle(tip, "::after");
        const arrowHeight = parseInt(arrowStyles.borderTopWidth, 10);
        btn.addEventListener('focus', (evt)=>{
            const btn = evt.currentTarget;
            const btnRect = btn.getBoundingClientRect();
            const tipExplanationNode = btn.nextElementSibling;
            if (!tipExplanationNode) {return;}
            tip.innerHTML = tipExplanationNode.innerHTML;
            tip.style.display='flex';
            requestAnimationFrame(()=>{
                const tipRect = tip.getBoundingClientRect();
                const tipPos = {top: btnRect.top - tipRect.height - arrowHeight, left:btnRect.left - tipRect.width/2 + btnRect.width/2};
                tip.style.top = `${tipPos.top}px`;
                tip.style.left = `${tipPos.left}px`;
            });
        });
        btn.addEventListener('blur', ()=>{
            tip.style.display = 'none';
        });
    });
});

/**
 * Write a function that takes an integer argument, and returns an array containing that many random human names from a web service.
 * The names should be formatted as "Firstname Lastname".
 */

function getRandomHumanNames(num) {
    const url = `https://randomuser.me/api/?results=${num}`;
    return fetch(url)
        .then(res => res.json())
        .then(res => res.results.map(human => `${human.name.first} ${human.name.last}`));
}
