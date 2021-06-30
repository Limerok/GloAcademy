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
        const bodyContent = document.querySelector('body'),
            menu = document.querySelector('menu');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        bodyContent.addEventListener('click', event => {
            const target = event.target;

            if (target.closest('.menu') || target.closest('.close-btn') || target.closest('menu > ul > li')) {
                handlerMenu();
            } else if (!target.closest('menu')) {
                menu.classList.remove('active-menu');
            }
        });
    };
    toggleMenu();

    //Анимация перехода меню
    const menu = document.querySelector('menu');
    menu.querySelectorAll('a[href^="#"').forEach(link => { //ищем все ссылки с #
        link.addEventListener('click', function(e) { //вешаем на них событие
            e.preventDefault();//отменяем стандартные действия

            const href = this.getAttribute('href').substring(1);//получаем атрибуты ссылки
            if (href === 'close' || href === '') {
                return;
            } else {
                const scrollTarget = document.getElementById(href),
                    topOffset = 0,
                    elementPosition = scrollTarget.getBoundingClientRect().top,
                    offsetPosition = elementPosition - topOffset;

                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    //Popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupContent = document.querySelector('.popup-content'),
            popupBtn = document.querySelectorAll('.popup-btn');
        let count = 0,
            leftInterval;

        const leftAnimate = function() {
            leftInterval = requestAnimationFrame(leftAnimate);
            count++;

            if (count < 39) {
                popupContent.style.left = count + '%';
            } else {
                cancelAnimationFrame(leftInterval);
                count = 0;
            }
        };

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popupContent.style.left = 0;
                popup.style.display = `block`;
                if (screen.width >= 768) {
                    leftInterval = requestAnimationFrame(leftAnimate);
                }
            });
        });
        popup.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popup.style.display = `none`;
            } else {
                target = target.closest('.popup-content');

                if (!target) {
                    popup.style.display = `none`;
                }
            }
        });
    };
    togglePopup();

    //Табы
    const tabs = () => {
        const serviceHeader = document.querySelector('.service-header'),
            tab = serviceHeader.querySelectorAll('.service-header-tab'),
            serviceTab = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < serviceTab.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    serviceTab[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    serviceTab[i].classList.add('d-none');
                }

            }
        };
        serviceHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();

    //Slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            portfolioDot = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

        for (let i = 0; i < slide.length; i++) { // Создаем li с классом dot
            const newDot = document.createElement('li');
            newDot.classList.add('dot');
            portfolioDot.insertAdjacentElement('beforeend', newDot);
        }

        const dot = document.querySelectorAll('.dot');
        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlay = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlay, time);
        };
        startSlide(1500);

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')){
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-left')){
                currentSlide--;
            } else if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if(elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            } else if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
            
        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                stopSlide(1500);
            }
        });
        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                startSlide(1500);
            }
        });
        
    };
    slider();

    //НАша команда
    const photoTeam = () => {
        const commandPhoto = document.querySelectorAll('.command__photo');
        commandPhoto.forEach((event) => {
            event.addEventListener('mouseenter', event => {
                const srcImg = event.target.src;
                event.target.src = event.target.dataset.img;
                event.target.dataset.img = srcImg;
            });
        });
        commandPhoto.forEach((event) => {
            event.addEventListener('mouseleave', event => {
                const srcImg = event.target.src;
                event.target.src = event.target.dataset.img;
                event.target.dataset.img = srcImg;
            });
        });
    };
    photoTeam();

    //Разрешение ввода
    const checks = () => {
        const calcItem = document.querySelectorAll('.calc-item'),
            mainFormInput = document.querySelector('.main-form-input'),
            mainForm = document.getElementById('form3'),
            foterFormInput = document.querySelector('.footer-form-input');

        calcItem.forEach((item, i) => { 
            if (i>0) {
                item.addEventListener('input', () => {
                    item.value = item.value.replace(/[^0-9]/, '');
                });
            }   
        }) ;

        const checkValue = (event) => {
            let target = event.target;
            if (target.name === 'user_name') {
                target.value = target.value.replace(/[^а-яё ]/gi, '');
            } else if (target.closest('#form2-message')) {
                target.value = target.value.replace(/[^а-яё 0-9,]/gi, '');
            } else if(target.name === 'user_email') {
                target.value = target.value.replace(/[^a-z@_\-.!~*']/gi, '');
            } else if(target.name === 'user_phone') {
                target.value = target.value.replace(/[^0-9\+]/gi, '');
            }

            target.addEventListener('blur', () => {
                if (target.name === 'user_name') {
                    target.value = target.value.replace(/\s+/gi, ' ');
                    target.value = target.value.replace(/-+/gi, '-');
                    target.value = target.value.replace(/(^\s+|\s+$)/g,'');
                    target.value = target.value.replace(/(^|\s|-)\S/g, function(a) {return a.toUpperCase();});
                    
                } else if(target.closest('#form2-message')) {
                    target.value = target.value.replace(/\s+/gi, ' ');
                    target.value = target.value.replace(/-+/gi, '-');
                    target.value = target.value.replace(/(^\s+|\s+$)/g,'');
                }
            });
        };
        foterFormInput.addEventListener('input', event => {
            checkValue(event);
        });
        mainFormInput.addEventListener('input', event => {
            checkValue(event);
        }); 
        mainForm.addEventListener('input', event => {
            checkValue(event);
        }); 
    };
    checks();

    //Калькулятор
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
            countValue = 1,
            dayValue = 1,
            count = 0;

            const typeValue = calcType.options[calcType.selectedIndex].value;
            let squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value -1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            } 
            function n (t) {
                let id = setInterval(() => {
                    if (count <= total - 1000) {
                        totalValue.textContent = count;
                        count += 500;
                    }if (count <= total - 100) {
                        totalValue.textContent = count;
                        count += 50;
                    }else if (count <= total -10) {
                        totalValue.textContent = count;
                        count += 5;
                    }else if (count <= total) {
                        totalValue.textContent = count;
                        count += 1;
                    } else {
                        clearInterval(id);
                    }
                }, t);
            }
            
            n(0.1);
            /* totalValue.textContent = total; */

            
        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            if (target.matches('select') || target.matches('input')){
                countSum();
            }
        });
    };
    calc(100);

    //Send-ajax-form
    const sendForm = () => {
        const errorNessage = 'Что то пошло не так',
            loadMessage = '<img src="../images/loading.gif" style="width:50px;height:auto;">',
            successMesage = 'Спасибо! Мы скоро с Вами свяжемся.';
        
        const form = document.querySelectorAll('form');
        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 3rem;';
        statusMessage.style.cssText = 'color: white;';

        const resetInput = (form) => {
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                input.value = '';
            });
        };

        const postData = (body) => {
            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Conternt-Type': 'application/json'
                },
                body: body
            });


            /* return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.addEventListener('readystatechange', () => {
                    if (request.readyState !==4) {
                        return;
                    }
                    if (request.status === 200) {
                        resolve();
                    } else {
                        console.warn(request.status);
                        reject();

                    }
                });
                request.open('POST', './server.php');
                request.setRequestHeader('Conternt-Type', 'application/json');
                
                request.send(JSON.stringify(body));
            }); */
        };

        form.forEach(item => {
            item.addEventListener('submit', event => {
                event.preventDefault();
                item.appendChild(statusMessage);
                statusMessage.innerHTML = loadMessage;
                const formData = new FormData(item);
                /* let body = {};
                formData.forEach((value, i) => {
                    body[i] = value;                
                }); */
                postData(formData)
                    .then((response) => {
                        if (response.status !== 200) {
                            throw new Error('status not 200');
                        }
                        statusMessage.textContent = successMesage;
                    })
                    .catch(() => {
                            statusMessage.textContent = errorNessage;
                    });

                    /* .then(statusMessage.textContent = successMesage)
                    .catch(statusMessage.textContent = errorNessage); */
            
                resetInput(item);
            });
        });
        
    };
    sendForm();

    
});
