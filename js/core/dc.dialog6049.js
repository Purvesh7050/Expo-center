class DcDialog {
    constructor() {
        this.id = "DcDialog";
        this.cancelButton = {};
        this.successButton = {};
        this.message = "";
    }

    setCancelButton(arg = {class: "", text: "", show: true, action: (...args) => { }}) {
        if (!arg.hasOwnProperty("class")) {
            arg.class = "btn btn-outline-dark";
        }
        if (!arg.hasOwnProperty("text")) {
            arg.text = "Cancel";
        }
        if (!arg.hasOwnProperty("show")) {
            arg.show = true;
        }
        this.cancelButton = arg;
        return this;
    }

    setSuccessButton(arg = {class: "", text: "", show: true, action: (...args) => {}}) {
        if (!arg.hasOwnProperty("class")) {
            arg.class = "btn btn-success";
        }
        if (!arg.hasOwnProperty("text")) {
            arg.text = "Save";
        }
        if (!arg.hasOwnProperty("show")) {
            arg.show = true;
        }
        this.successButton = arg;
        return this;
    }

    show(message) {
        let elDialogHtml = `<div id='${this.id}' class="dc-dialog-popup-overlay"><div class="dc-dialog-message-popup text-dark">`;
        elDialogHtml += `<p>${message}</p>`;
        elDialogHtml += `<div class="mt-3">`;
        elDialogHtml += `<button class="${this.cancelButton.class} mx-1" id="${this.id}CancelButton">${this.cancelButton.text}</button>`;
        elDialogHtml += `<button class="${this.successButton.class} mx-1" id="${this.id}SuccessButton">${this.successButton.text}</button>`;
        elDialogHtml += `</div></div></div>`;
        this.setStyle();
        const self = this;
        document.body.insertAdjacentHTML('afterbegin', elDialogHtml);
        const dcDialogEl = document.body.querySelector(`#${this.id}`);
        const dcDialogCancelButtonEl = dcDialogEl.querySelector(`#${this.id}CancelButton`);
        const dcDialogSuccessButtonEl = dcDialogEl.querySelector(`#${this.id}SuccessButton`);
        if (dcDialogCancelButtonEl) {
            dcDialogCancelButtonEl.addEventListener('click', function () {
                (typeof self.cancelButton.action !== "undefined") ? self.cancelButton.action() : self.deleteExistingEl();
            });
        }
        if (dcDialogSuccessButtonEl) {
            dcDialogSuccessButtonEl.addEventListener('click', function (event) {
                if (typeof self.successButton.action !== "undefined") {
                    event.target.setAttribute('dc-inline-loader', '');
                    event.target.style.pointerEvents = "none";
                    self.successButton.action(self);
                } else
                    self.deleteExistingEl();
            });
        }
    }

    hide() {
        this.deleteExistingEl();
    }

    deleteExistingEl() {
        if (this.id) {
            let el = document.body.querySelector(`#${this.id}`);
            if (el) {
                el.parentNode.removeChild(el);
            }
            let styleEl = document.head.querySelector(`#${this.id}Style`);
            if (styleEl) {
                styleEl.parentNode.removeChild(styleEl);
            }
        }

    }

    setStyle() {
        let eleStyle = document.createElement('style');
        eleStyle.id = `#${this.id}Style`;
        eleStyle.innerHTML =
            `.dc-dialog-popup-overlay {
                position: fixed;
                width: 100vw;
                height: 100vh;
                z-index: 99999;
                background-color: rgb(0 0 0 / 60%);
                transition: all .3s ease-in-out;
                padding: 10px;
                display: -webkit-inline-flex;
                display: -ms-inline-flexbox;
                display: inline-flex;
                -webkit-box-align: center;
                -webkit-align-items: center;
                -ms-flex-align: center;
                align-items: center;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
            }
            .dc-dialog-message-popup {
                text-align: center;
                min-width: 290px;
                overflow-y: auto;
                padding: 2rem 1rem 1rem;
                max-width: 350px;
                max-height: 70vh;
                background-color: white;
                border-radius: 6px;
                position: relative;
                display: inline-block;
            }      
            .dc-dialog-message-popup .btn {
               text-transform: capitalize;
                display: inline-block;
                font-weight: 400;
                line-height: 1.5;
                border: 1px solid transparent;
                padding: 0.375rem 0.75rem;
                font-size: 1rem;
                border-radius: 0.25rem;
            }
            .dc-dialog-message-popup .btn-outline-info {
                color: #0dcaf0;
                border-color: #0dcaf0;
            }
            .dc-dialog-message-popup .btn-outline-dark {
                color: #212529;
                border-color: #212529;
            }
            .dc-dialog-message-popup .btn-outline-warning {
                color: #ffc107;
                border-color: #ffc107;
            }
            .dc-dialog-message-popup .btn-outline-info:hover {
                color: #000;
                background-color: #0dcaf0;
                border-color: #0dcaf0;
            }
            .dc-dialog-message-popup .btn-outline-dark:hover {
                color: #fff;
                background-color: #212529;
                border-color: #212529;
            }
            .dc-dialog-message-popup .btn-outline-warning:hover {
                color: #000;
                background-color: #ffc107;
                border-color: #ffc107;
            }
            .dc-dialog-message-popup .btn-sm {
                padding: 0.25rem 0.5rem;
                font-size: .875rem;
                border-radius: 0.2rem;
            }
            `;
        document.head.insertAdjacentElement('beforeend', eleStyle);
    }
}