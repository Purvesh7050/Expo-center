class DcLoader {
    constructor() {
        this.id = "dcLoader-" + Math.floor(Math.random() * 10000000);
        this.visible = true;
    }

    setVisibility(visible) {
        this.visible = visible;
        return this;
    }

    show(text = "") {
        this.hide();
        this.addBodyStyle();
        if (this.visible === true) {
            text = text ?? 'Loading...';
            text = `<div class="spinner-grow" role="status"></div><div class="display:">${text}</div>`;
        }
        document.body.style.cursor = "wait";
        const eleLoader = `<div id="${this.id}" class="loader-overlay">${text}</div>`;
        document.body.insertAdjacentHTML('afterbegin', eleLoader);
    }

    hide() {
        let el = document.body.querySelector(`#${this.id}`);
        if (el) {
            el.parentNode.removeChild(el);
        }
        let styleEl = document.head.querySelector(`#${this.id}Style`);
        if (styleEl) {
            styleEl.parentNode.removeChild(styleEl);
        }
        document.body.style.cursor = "auto";
    }

    addBodyStyle() {
        let eleStyle = document.createElement('style');
        eleStyle.id = `#${this.id}Style`;
        eleStyle.innerHTML = `
                    .loader-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgb(0 0 0 / 80%);
                z-index: 999999;
                color:white;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all .3s ease;
                flex-direction: column;
            }`;
        document.head.insertAdjacentElement('beforeend', eleStyle);
    }

}