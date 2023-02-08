class DcClock {
    constructor() {
        this.eleSelector = null;
        this.currentDateTime = "";
        this.countdownInterval = "";
    }

    setSelector(eleSelector) {
        this.eleSelector = document.querySelector(eleSelector);
        return this;
    }

    setCurrentDateTime(currentDateTime) {
        this.currentDateTime = currentDateTime;
        return this;
    }

    start() {
        let self = this;
        setTimeout(() => {
            let date = new Date(this.currentDateTime);
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            let meridiem = " AM";

            if (hours == 0) {
                hours = 12;
            } else if (hours > 12) {
                hours = hours - 12;
                meridiem = " PM";
            }

            hours = (hours < 10) ? `0${hours}` : hours;
            minutes = (minutes < 10) ? `0${minutes}` : minutes;
            seconds = (seconds < 10) ? `0${seconds}` : seconds;
            self.eleSelector.innerHTML = `<span class='dc-hours'>${hours}</span>
                    <span class='dc-separator'>:</span>
                    <span class='dc-minutes'>${minutes}</span>
                    <span class='dc-separator'>:</span>
                    <span class='dc-seconds'>${seconds}</span>
                    <span class='dc-meridiem'>${meridiem}</span>`;
        }, 1000);

    }
}
