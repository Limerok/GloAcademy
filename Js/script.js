window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    //Таймер
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
    countTimer('21 June 2021');

    //Меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItem = menu.querySelectorAll('ul > li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItem.forEach(element => {
            element.addEventListener('click', handlerMenu);
        });
    };
    toggleMenu();
    //Анимация перехода меню
    document.querySelectorAll('a[href^="#"').forEach(link => { //ищем все ссылки с #
        link.addEventListener('click', function(e) {//вешаем на них событие
            e.preventDefault();//отменяем стандартные действия
    
            let href = this.getAttribute('href').substring(1);//получаем атрибуты ссылки
    
            const scrollTarget = document.getElementById(href),
                topOffset = 0,
                elementPosition = scrollTarget.getBoundingClientRect().top,
                offsetPosition = elementPosition - topOffset;
    
            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    //Popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupContent = document.querySelector('.popup-content'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');
        let count = 0,
        leftInterval;

        let leftAnimate = function() {
            leftInterval = requestAnimationFrame(leftAnimate);
            count ++;

            if (count < 39) {
                popupContent.style.left = count + '%';
            } else {
                cancelAnimationFrame(leftInterval);
                count = 0;
            }
        };

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popupContent.style.left = 0;
                popup.style.display = `block`;
                console.log(screen.width);
                if (screen.width >= 768 ) {
                    leftInterval = requestAnimationFrame(leftAnimate);
                }
            });
        });
        popupClose.addEventListener('click', () => {
            popup.style.display = `none`;
        });
    };
    togglePopup();
    
});
