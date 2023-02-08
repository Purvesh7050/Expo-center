class DcFancybox {
    constructor() {
        this.options = {
            src: null,
            type: 'iframe',
            'showCloseButton': false,
            iframe: {
                preload: false
            },
        };
    }

    setUrl(url) {
        this.options.src = url;
        return this;
    }

    setSrc(src) {
        this.options.src = src;
        return this;
    }

    setType(type) {
        this.options.type = type;
        if (type == "pdf" || type == 'video' ) {
            this.options.type = "iframe";
        }
        return this;
    }

    setOptions(optionList) {
        for (let index in optionList) {
            this.options[index] = optionList[index];
        }
        return this;
    }

    setAfterClose(method) {
        this.options.afterClose = method;
        return this;
        console.log("afterClosex  ");
    }

    setBeforeClose(method) {
        this.options.beforeClose = method;
        return this;
        console.log("afterClosex  ");
    }

    setBeforeLoad(method) {
        this.options.beforeLoad = method;
        return this;
        console.log("beforeLoad  ");
    }

    setAfterLoad(method) {
        this.options.afterLoad = method;
        return this;
    }

    setBeforeShow(method) {
        this.options.beforeShow = method;
        return this;
    }

    setAfterShow(method) {
        this.options.afterShow = method;
        return this;
    }

    setOnInit(method) {
        this.options.onInit = method;
        return this;
    }

    setOnActivate(method) {
        this.options.onActivate = method;
        return this;
    }

    setOnDeactivate(method) {
        this.options.onDeactivate = method;
        return this;
    }

    show() {
        $.fancybox.open(this.options);
    }
}

$(".dc-fancybox").on('click', function () {
    const dcfancybox = new DcFancybox;
    dcfancybox.setUrl($(this).attr('dc-action')).setAfterClose((e) => {
        console.log("setOnDeactivate ");
    }).show();
});