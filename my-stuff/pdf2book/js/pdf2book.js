window.pdf2book = {
    init: function() {
        debugger;
        $("#BookContainer").flipBook({
            pdf: "path/to/your/manual.pdf",
            lightBox: false,
            pdfScale: 1.3,
            showThumbnailTools: false,
            controlsProps: { zoom: false }
        });
    }
};
window.addEventListener('onload', pdf2book.init);