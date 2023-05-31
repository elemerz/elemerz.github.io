window.onload = () => {
    const allTabs = document.querySelectorAll('.tab-strip > dt');
    document.querySelectorAll('.tab-strip > dt').forEach((tab) => {tab.addEventListener('focus', () => {
        allTabs.forEach((tab) => {tab.classList.remove('active');});
        tab.classList.add('active');
    })});
}
