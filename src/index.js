'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import photoTeam from './modules/photoTeam';
import checks from './modules/checks';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
//Таймер
countTimer('09 July 2021');
//Меню
toggleMenu();
//Popup
togglePopup();
//Табы
tabs();
//Slider
slider();
//НАша команда
photoTeam();
//Разрешение ввода
checks();
//Калькулятор
calc(100);
//Send-ajax-form
sendForm();