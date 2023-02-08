String.prototype.isEmpty = function () {
    return (this.length === 0 || !this.trim());
};
String.prototype.hasNotEmptyValue = function () {
    return !(this.length === 0 || !this.trim());
};
String.prototype.isValidHttpURL = function () {
    try {
        const url = new URL(this);
        console.log("URL",url);
        return ["http:","https:"].includes(url.protocol);
    } catch (_) {
        return false;
    }
}
String.prototype.fetchEmbedURL = function () {
    let eleIframeBlock = document.createElement('div');
    eleIframeBlock.innerHTML = this;
    let eleIframe = eleIframeBlock.querySelector("iframe");
    if (eleIframe) {
        return eleIframe.src
    }
    return this.toString();
};
String.prototype.fetchEmbedVideoId = function (type) {
    if (["youtube", "vimeo"].includes(type)){
        let regExp = "";
        if (type === "youtube")
            regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        else if (type === "vimeo")
            regExp = /^(?:https?:\/\/)?(?:(player|www)\.)?(?:vimeo\.com\/)(?:video\/|)([\d\/]+)([\?].*)?$/;

        const match = this.match(regExp);
        return match ? match[1] : false;
    }
    return false;
};
String.prototype.fetchEmbedVideoPoster = async function (type) {
    if (["youtube", "vimeo"].includes(type)){
        if (type === "youtube"){
            const videoId = this.fetchEmbedVideoId(type);
            if(videoId!==false)
               return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        } else if (type === "vimeo"){
            try {
                return await fetch(`https://vimeo.com/api/oembed.json?url=${this}`)
                    .then(response => response.json())
                    .then(data => data?.thumbnail_url!==undefined ? data.thumbnail_url :"");
            } catch (error) {
                return "";
            }
        }
    }
    return false;
};

const isObject = (obj) => obj === Object(obj);
const isArray = (arr) => Array.isArray(arr);

function getUrlSegment(segment = null) {
    let url = document.URL.replace(BASE_URL, "");
    url = url.split('#')[0];
    const urlArray = url.split('/');
    const urlArrayLength = urlArray.length;
    segment = (segment == null || segment < 0) ? 2 : segment;
    return (segment > -1 && urlArrayLength >= segment) ? urlArray[segment - 1] : urlArray[urlArrayLength - 1];
}

function ucFirst(str) {
    if (typeof str !== 'string')
        return ''
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function strReplace(matchObject, str) {
    let RE = new RegExp(Object.keys(matchObject).join("|"), "gi");
    return str.replace(RE, function (matched) {
        return matchObject[matched];
    });
}

function datetimeDifference(nextDateTime, previousDateTime) {
    nextDateTime = (new Date(nextDateTime)).getTime();
    previousDateTime = (new Date(previousDateTime)).getTime();
    return nextDateTime - previousDateTime;
}