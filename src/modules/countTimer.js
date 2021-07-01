function countTimer(deadline) {
    const timerHours = document.getElementById('timer-hours'),
        timerMinutes = document.getElementById('timer-minutes'),
        timerSeconds = document.getElementById('timer-seconds');

    function getTimeRemainning() {
        const dataStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dataStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor((timeRemaining / 60 / 60));

        return { timeRemaining, seconds, minutes, hours };
    }

    const idSetInt = setInterval(() => {
        const timer = getTimeRemainning();
        if (timer.hours < 10) {
            timerHours.textContent = '0' + timer.hours;
        } else {
            timerHours.textContent = timer.hours;
        }
        if (timer.minutes < 10) {
            timerMinutes.textContent = '0' + timer.minutes;
        } else {
            timerMinutes.textContent = timer.minutes;
        }
        if (timer.seconds < 10) {
            timerSeconds.textContent = '0' + timer.seconds;
        } else {
            timerSeconds.textContent = timer.seconds;
        }

        if (timer.timeRemaining < 0) {
            clearInterval(idSetInt);

            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }

    }, 1000);
}

export default countTimer;