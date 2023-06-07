const APP = {
    confirmDialog: function (title, message, specialCSS, okCaption, cancelCaption, okCallback, cancelCallback) {
        const dlg = document.createElement("div");
        const onOK = () => {
            okCallback && okCallback();
            dlg.remove();
        };
        const onCancel = () => {
            cancelCallback && cancelCallback();
            dlg.remove();
        };
        dlg.className = `dlg-custom ${specialCSS}`;
        dlg.innerHTML = `
            <div class="dlg-custom-content">
                <div class="dlg-custom-title">${title}</div>
                <div class="dlg-custom-body">${message}</div>
                <div class="dlg-custom-footer">
                    <button class="dlg-ok">${okCaption}</button>
                    <button class="dlg-cancel">${cancelCaption}</button>
                </div>
            </div>`;
        document.body.appendChild(dlg);
        dlg.querySelector("button.dlg-ok").addEventListener("click", onOK);
        dlg.querySelector("button.dlg-cancel").addEventListener("click", onCancel);
    },
    deleteCustomer: function () {
        console.log('delete clicked');
    },
    cancelDelete: function () {
        console.log('cancel clicked');
    }
};

function doDelete() {
    APP.confirmDialog('Delete customer', "Are you sure you want to delete this?",'dlg-a','Ok', 'Cancel', APP.deleteCustomer, APP.cancelDelete);
}
