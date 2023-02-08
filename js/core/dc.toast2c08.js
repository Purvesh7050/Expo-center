class DcToast {
    constructor() {
        this.id = "DcToast";
        this.positions = {
            TOP_LEFT: "top-0 start-0",
            TOP_CENTER: "top-0 start-50 translate-middle-x",
            TOP_RIGHT: "top-0 end-0",
            MIDDLE_LEFT: "top-50 start-0 translate-middle-y",
            MIDDLE_CENTER: "top-50 start-50 translate-middle",
            MIDDLE_RIGHT: "top-50 end-0 translate-middle-y",
            BOTTOM_LEFT: "bottom-0 start-0",
            BOTTOM_CENTER: "bottom-0 start-50 translate-middle-x",
            BOTTOM_RIGHT: "bottom-0 end-0",
        };
        this.types = {
            PRIMARY: "bg-primary text-white",
            SECONDARY: "bg-secondary text-white",
            SUCCESS: "bg-success text-white",
            DANGER: "bg-danger text-white",
            WARNING: "bg-warning text-dark",
            INFO: "bg-info text-dark",
            LIGHT: "bg-light text-dark",
            DARK: "bg-dark text-white",
        };
        this.delays = {
            SHORT: 5000,
            MEDIUM: 8000,
            LONG: 150000,
        };
        this.position = this.positions.TOP_RIGHT;
        this.type = this.types.LIGHT;
        this.delay = this.delays.MEDIUM;
        this.heading = null;
    }

    setHeading(heading) {
        this.heading = heading;
        return this;
    }

    setPosition(position) {
        this.position = position;
        return this;
    }

    setType(type) {
        this.type = type;
        return this;
    }

    setDelay(delay) {
        this.delay = delay;
        return this;
    }

    show(message) {
        this.removeExisting();
        let btnCloseColor = "btn-close-white";
        if (["bg-info text-dark", "bg-light text-dark"].includes(this.type)) {
            btnCloseColor = "btn-close-black";
        }
        var header = '';
        if (this.heading != "" && this.heading != null) {
            header = `<h5>${this.heading}</h5>`;
        }

        const eleToast = `<div id="${this.id}" class="${this.position} toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-body text-center">
                <button type="button" class="" data-bs-dismiss="toast" aria-label="Close">×</button>
                ${header}
                ${message}
            </div>
        </div>`;

        this.setStyle();
        const option = {
            delay: this.delay,
        };
        const self = this;

        var main = document.body.querySelector('.main');
        main.insertAdjacentHTML('afterbegin', eleToast);
        let dcToastEl = main.querySelector(`#${this.id}`);
        dcToastEl.addEventListener('hidden.bs.toast', function () {
            self.removeExisting();
        });
        let dcToastCloseButtonEl = dcToastEl.querySelector('button');
        if (dcToastCloseButtonEl) {
            dcToastCloseButtonEl.addEventListener('click', function () {
                self.removeExisting();
            });
        }
        let toast = new bootstrap.Toast(dcToastEl, option);
        toast.show();
    }

    removeExisting() {
        let dcExistingToastEl = document.body.querySelector(`#${this.id}`);
        if (dcExistingToastEl) {
            dcExistingToastEl.parentNode.removeChild(dcExistingToastEl);
        }
        let dcExistingAlertStyleEl = document.head.querySelector(`#${this.id}Style`);
        if (dcExistingAlertStyleEl) {
            dcExistingAlertStyleEl.parentNode.removeChild(dcExistingAlertStyleEl);
        }
    }

    setStyle() {
        let eleStyle = document.createElement('style');
        eleStyle.id = `#${this.id}Style`;
        eleStyle.innerHTML = `
            .toast {
                position: absolute;
                background-color: rgb(3 172 222);
                margin:10px;
                /* top:105px;
                right:0px;
                width: 100%;
                max-width: 350px;
                border-radius: var(--radius);
                background-color: var(--light);
                box-shadow: var(--shadow);
                overflow: hidden;
                border: none;
                z-index: 9999; */
            }
            .toast {
                /* width: 100%;
                box-shadow: none;
                overflow: hidden;
                border: none;
                position: relative;
                margin-top: -6px;
                background-color: rgb(121 29 126 / 50%);
                border-radius: 0;
                color: white; */
            }
            .toast-header {
                width: 100%;
                padding: 12px 35px;
                min-height: 50px;
                background-color: var(--primary-color);
                color: var(--white);
                border: none;
                text-transform: capitalize;
                text-align: center;
                box-shadow: var(--shadow);
            }
            .toast-header h4 {
                margin: 0;
                width: 100%;
            }
            .toast-body  {
                width: 100%;
                position: relative;
                padding: 30px 35px 20px;
                overflow-y: auto;
                max-height: 70vh;
            }
            button[aria-label="Close"] {
                border: none;
                position: absolute;
                right: 15px;
                top: 13px;
                padding: 0px;
                width: 24px;
                height: 24px;
                font-size: var(--heading);
                background-color: var(--white);
                color: var(--primary-color);
                border-radius: var(--radius24);
                box-shadow: var(--shadow);
                opacity: .95;
                transition: var(--transition);
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
        `;
        document.head.insertAdjacentElement('beforeend', eleStyle);
    }
}