class DcInlineLoader {
    constructor(el = null) {
        this.el = el;
    }

    setElement(el) {
        this.el = el;
        return this;
    }

    button(text = "") {
        this.el = this.el ?? (event.currentTarget ?? event.target);
        this.el.loaderType = "button";
        this.el.setAttribute('dc-inline-loader', '');
        this.el.oldCursor = this.el.style.cursor;
        this.el.style.pointerEvents = "none";
    }

    show() {
        if (this.el) {
            this.el.setAttribute('dc-inline-loader', '');
            this.el.oldCursor = this.el.style.cursor;
            this.el.style.cursor = "wait";
        }
    }

    hide() {
        if (this.el) {
            this.el.removeAttribute('dc-inline-loader');
            this.el.style.cursor = this.el.oldCursor;
            delete this.el.oldCursor;
            if (this.el.hasOwnProperty('loaderType')) {
                this.el.style.pointerEvents = "auto";
                delete this.el.loaderType;
            }
        }
    }
}