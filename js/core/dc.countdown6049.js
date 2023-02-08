class DcCountdown {
    constructor() {
        this.eleSelector = null;
        this.endDateTime = "";
        this.currentDateTime = "";
        this.countdownInterval = "";
        this.stopMessage = "";
    }

    setSelector(eleSelector) {
        this.eleSelector = document.querySelector(eleSelector);
        return this;
    }

    setCurrentDateTime(currentDateTime) {
        this.currentDateTime = currentDateTime;
        return this;
    }

    setEndDateTime(endDateTime) {
        this.endDateTime = endDateTime;
        return this;
    }

    setStopMessage(stopMessage) {
        this.stopMessage = stopMessage;
        return this;
    }

    getTemplate(days, hours, minutes, seconds) {
        let template = "";
        if (days > 0) {
            days = (days < 10) ? `0${days}` : days;
            template = `<span class='dc-days'>${days}</span><span class='dc-separator'>:</span>`;
        }

        template += `<span class='dc-hours'>${hours}</span>
            <span class='dc-separator'>:</span>
            <span class='dc-minutes'>${minutes}</span>
            <span class='dc-separator'>:</span>
            <span class='dc-seconds'>${seconds}</span>`;
        return template;
    }

    start() {
        this.stop();
        var countDownTime = new Date(this.endDateTime).getTime();
        var nowTime = new Date().getTime();
        if (this.currentDateTime != null && this.currentDateTime != "") {
            nowTime = new Date(this.currentDateTime).getTime();
        }
        var self = this;
        this.countdownInterval = setInterval(function () {
            let distance = countDownTime - nowTime;
            nowTime += 1000;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            hours = (hours < 10) ? `0${hours}` : hours;
            minutes = (minutes < 10) ? `0${minutes}` : minutes;
            seconds = (seconds < 10) ? `0${seconds}` : seconds;

            self.eleSelector.innerHTML = self.getTemplate(days, hours, minutes, seconds);
            if (distance < 0) {
                clearInterval(self.countdownInterval);
                self.eleSelector.innerHTML = (self.stopMessage == "") ? self.getTemplate(0, 0, 0, 0) : self.stopMessage;
            }
        }, 1000);
    }

    stop() {
        if (this.countdownInterval != null && this.countdownInterval != "") {
            clearInterval(this.countdownInterval);
        }
    }
}
