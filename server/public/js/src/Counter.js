module.exports = class Counter {
    constructor(targetDate) {
        this.targetDate = targetDate;
        this.daysRemaining = 0;
        this.hoursRemaining = 0;
        this.minutesRemaining = 0;
        this.secondsRemaining = 0;
    }

    getTimeRemaining() {

        let t = Date.parse(this.targetDate) - Date.parse(new Date());

        this.secondsRemaining = Math.floor((t/1000) % 60);
        this.minutesRemaining = Math.floor((t/1000/60) % 60);
        this.hoursRemaining = Math.floor((t/(1000*60*60)) % 24);
        this.daysRemaining = Math.floor( t/(1000*60*60*24) );

        return {
            days: this.daysRemaining,
            hours: this.hoursRemaining,
            minutes: this.minutesRemaining,
            seconds: this.secondsRemaining
        }
    }
}