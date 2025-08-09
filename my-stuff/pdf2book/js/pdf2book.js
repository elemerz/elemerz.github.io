window.pdf2book = {
    maxPageIndex: 180,
    init() {
        this.bindListeners();
        this.loadDocByIndex(this.getPageIndex());
    },
    bindListeners() {
        $('#prev').on('click', () => {if (this.getPageIndex() > 1) this.prevPage();});
        $('#next').on('click', () => {if (this.getPageIndex() < this.maxPageIndex) this.nextPage();});
        //pageIndex
        $('#pageIndex').on('change', (e) => {
            this.loadDocByIndex(e.currentTarget.valueAsNumber);
        });
    },
    getPageIndex() {
        return Number($('#pageIndex').val());
    },
    prevPage() {
        $('#pageIndex').val(this.getPageIndex() - 1).change();
    },
    nextPage() {
        $('#pageIndex').val(this.getPageIndex() + 1).change();
    },
    loadDocByIndex(i) {
        this.loadDocByPath(`docx/Page-${String(i).padStart(3, '0')}.docx`);
    },
    loadDocPages() {
        const pages = document.querySelectorAll('.docx_page');
        function showPage(i) {
            pages.forEach((p, idx) =>
                p.style.display = idx === i ? 'block' : 'none'
            );
        }
        showPage(0);
    },
    hookLinksToPopup() {
        $('a[href]').magnificPopup({type:'iframe'});
    },
    loadDocByPath(docPath) {
        fetch(docPath)
            .then(r => r.arrayBuffer())
            .then(buf => window.docx.renderAsync(
                buf,
                document.getElementById('docx-container'),
                /* style container */ null,
                { breakPages: true, inWrapper: true }
            )).then(() => {
                this.loadDocPages();
                this.hookLinksToPopup();
            });
    }
};
window.addEventListener('load', pdf2book.init.bind(pdf2book));