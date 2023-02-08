class DcWindowTabService {
    constructor() {
        this.instance = null;
        this.id = "DcWindowTabService";
        this.message = "";
        this.channel = null;
    }

    close() {
        // const windowTab= window.open("https://www.google.com/","_self");
        // windowTab.close();
        // window.open('https://www.google.com','_self').close();
    }

    useHere(self) {
        window.location.reload();
    }

    open(message) {
        document.body.innerHTML = "";
        let elDialogHtml = `<div id='${this.id}' class="popup-overlay"><div class="messages-popup">`;
        elDialogHtml += `<p>${message}</p>`;
        elDialogHtml += `<div class="mt-3 float-end">`;
        elDialogHtml += `<button class="btn btn-close-white me-2" id="${this.id}CloseButton">Close</button>`;
        elDialogHtml += `<button class="btn btn-success me-2" id="${this.id}SuccessButton">Use Here</button>`;
        elDialogHtml += `</div></div></div>`;
        this.setStyle();
        const self = this;
        document.body.insertAdjacentHTML('afterbegin', elDialogHtml);
        const DcWindowDuplicateEl = document.body.querySelector(`#${this.id}`);
        const DcWindowDuplicateCloseButtonEl = DcWindowDuplicateEl.querySelector(`#${this.id}CloseButton`);
        const DcWindowDuplicateSuccessButtonEl = DcWindowDuplicateEl.querySelector(`#${this.id}SuccessButton`);
        if (DcWindowDuplicateCloseButtonEl) {
            DcWindowDuplicateCloseButtonEl.addEventListener('click', function () {
                (typeof self.CloseButton.action !== "undefined") ? self.CloseButton.action() : self.unload();
            });
        }
        if (DcWindowDuplicateSuccessButtonEl) {
            DcWindowDuplicateSuccessButtonEl.addEventListener('click', function () {
                self.useHere(self);
            });
        }

    }

    unload() {
        let dcExistingWindowDuplicateEl = document.body.querySelector(`#${this.id}`);
        if (dcExistingWindowDuplicateEl) {
            dcExistingWindowDuplicateEl.parentNode.removeChild(dcExistingWindowDuplicateEl);
        }
        let dcExistingWindowDuplicateStyleEl = document.head.querySelector(`#${this.id}Style`);
        if (dcExistingWindowDuplicateStyleEl) {
            dcExistingWindowDuplicateStyleEl.parentNode.removeChild(dcExistingWindowDuplicateEl);
        }
    }

    setStyle() {
        let eleStyle = document.createElement('style');
        eleStyle.id = `#${this.id}Style`;
        eleStyle.innerHTML =
            `.popup-overlay {
                position: fixed;
                width: 100vw;
                height: 100vh;
                z-index: 99999;
                background-color: rgb(0 0 0 / 90%);
                transition: all .3s ease-in-out;
                padding: 0px;
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
            .messages-popup {
                text-align: center;
                min-width: 300px;
                overflow-y: auto;
                padding: 35px 15px 15px;
                max-width: 350px;
                max-height: 90vh;
                background-color: #f7faff;
                border-radius: 6px;
                position: relative;
                display: inline-block;
            }
            
            button[title="Close"] {
                position: absolute;
                padding: 1px;
                background-color: white;
                color: var(--primary-color);
                border: solid 1px #dee2e6;
                font-size: 20px;
                line-height: 1;
                width: 26px;
                height: 26px;
                border-radius: 24px;
                right: 10px;
                top: 10px;
                box-shadow: 0 2px 6px 0 rgba(136, 148, 171, 0.2), 0 24px 20px -24px rgba(71, 82, 107, 0.1);
                display: inline-flex;
                align-items: center;
                justify-content: center;
                transition: all .3s ease;
            }
            
            .messages-popup .center_logo img {
                margin: 0 auto 10px;
                mix-blend-mode: multiply;
                max-height: 80px;
            }
            
            .messages-popup .center_btn {
                border-top: solid 1px #ddd;
                padding-top: 15px;
                margin-top: 20px;
                width: 100%;
            }
            
            .messages-popup .center_btn .btn {
                padding: 4px 25px;
                border-radius: 24px;
                color: white;
                text-transform: uppercase;
                font-size: 14px;
            }`;
        document.head.insertAdjacentElement('beforeend', eleStyle);
    }
}