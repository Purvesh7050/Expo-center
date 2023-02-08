class DcAlert {
    constructor() {
        this.id = "DcAlert";
        this.types = {
            SUCCESS: "bg-success text-white",
            DANGER: "bg-danger text-white",
            WARNING: "bg-warning text-dark",
            INFO: "bg-info text-dark",
        };
        this.headings = {
            SUCCESS: "Success!!",
            DANGER: "Error!!",
            WARNING: "Warning!!",
            INFO: "Info!!",
        };
        this.icons = {
            SUCCESS: "success",
            DANGER: "error",
            WARNING: "warning",
            INFO: "info",
        };
        this.type = this.types.LIGHT;
        this.icon = this.icons.SUCCESS;
        this.heading = null;
        this.buttonAttributes = {
            style: '',
            text: 'OK',
            action: '',
        };
    }

    setTypeDanger() {
        this.type = this.types.DANGER;
        this.heading = this.headings.DANGER;
        this.icon = "danger";
        return this;
    }

    setTypeSuccess() {
        this.type = this.types.SUCCESS;
        this.heading = this.headings.SUCCESS;
        this.icon = "success";
        return this;
    }

    setTypeWarning() {
        this.type = this.types.WARNING;
        this.heading = this.headings.WARNING;
        this.icon = "warning";
        return this;
    }

    setTypeInfo() {
        this.type = this.types.INFO;
        this.heading = this.headings.INFO;
        this.icon = "info";
        return this;
    }

    setHeading(heading) {
        this.heading = heading;
        return this;
    }

    setButtonAttributes({style, text, action} = {style: '', text: 'OK', action: Function}) {
        this.buttonAttributes = {
            style: style,
            text: text,
            action: action,
        };
        return this;
    }

    show(message) {
        this.hide();
        let eleAlert = `<div id='${this.id}' class="dc-alert-popup-overlay"><div class="dc-alert-messages-popup"><div class="center_logo"><img src="${BASE_URL}public/assets/img/alert/${this.icon}.jpg" alt=""></div>`;
        if (this.heading != "" && this.heading != null) {
            eleAlert += `<h4>${this.heading}</h4>`;
        }
        eleAlert += `<p>${message}</p>
                    <div class="dc-alert-btn-center">
                        <a href="javascript:;" class="btn btn-${this.icon}" dc-alert-dismiss="true">ok</a>
                    </div>
                    <button type="button" title="Close" dc-alert-dismiss="true">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1" width="24px" height="24px" viewBox="0 0 24 24">
                            <path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path>
                        </svg>
                    </button>
                </div></div>`;
        this.setStyle();
        const self = this;
        document.body.insertAdjacentHTML('afterbegin', eleAlert);
        const dcAlertEl = document.body.querySelector(`#${this.id}`);

        const dcAlertCloseButtonElList = dcAlertEl.querySelectorAll('[dc-alert-dismiss="true"]');
        if (dcAlertCloseButtonElList) {
            for (let dcAlertCloseButtonEl of dcAlertCloseButtonElList) {
                if (dcAlertCloseButtonEl.tagName === "A") {
                    dcAlertCloseButtonEl.setAttribute("style", self.buttonAttributes.style);
                    dcAlertCloseButtonEl.textContent = self.buttonAttributes.text;
                    if (typeof self.buttonAttributes.action === 'function')
                        dcAlertCloseButtonEl.addEventListener("click", function () {
                            self.buttonAttributes["action"]();
                        });
                }
                dcAlertCloseButtonEl.addEventListener('click', function () {
                    self.hide();
                });
            }

        }
    }

    hide() {
        let dcExistingAlertEl = document.body.querySelector(`#${this.id}`);
        if (dcExistingAlertEl) {
            dcExistingAlertEl.parentNode.removeChild(dcExistingAlertEl);
        }
        let dcExistingAlertStyleEl = document.head.querySelector(`#${this.id}Style`);
        if (dcExistingAlertStyleEl) {
            dcExistingAlertStyleEl.parentNode.removeChild(dcExistingAlertStyleEl);
        }
    }

    setStyle() {
        let eleStyle = document.createElement('style');
        eleStyle.id = `#${this.id}Style`;
        eleStyle.innerHTML =
            `.dc-alert-popup-overlay {
                position: fixed;
                width: 100vw;
                height: 100vh;
                z-index: 999999;
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
            .dc-alert-messages-popup {
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
                color: black;
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
            
            .dc-alert-messages-popup .center_logo img {
                margin: 0 auto 10px;
                mix-blend-mode: multiply;
                max-height: 80px;
            }
            
            .dc-alert-messages-popup .dc-alert-btn-center {
                border-top: solid 1px #ddd;
                padding-top: 15px;
                margin-top: 20px;
                width: 100%;
            }
            
            .dc-alert-messages-popup .dc-alert-btn-center .btn {
                padding: .5rem 1.5rem;
                border-radius: 24px;
                color: white;
                text-transform: uppercase;
                font-size: 14px;
            }
            .dc-alert-messages-popup h4 {
                font-size: 20px;
            }
            .dc-alert-messages-popup p {
                font-size:13px;
            }`;

        document.head.insertAdjacentElement('beforeend', eleStyle);
    }
}