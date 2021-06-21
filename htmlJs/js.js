
/* Добрый день (утро, вечер, ночь в зависимости от времени суток)
Сегодня: Понедельник
Текущее время:12:05:15 PM
До нового года осталось 175 дней */
const message1 = document.querySelector('.message1'),
    message2 = document.querySelector('.message2'),
    message3 = document.querySelector('.message3'),
    message4 = document.querySelector('.message4');

const date = new Date(),
    nextDate = new Date(2022, 0, 1);

const setdate = new Date(nextDate);
let timer = (setdate - date) / 1000 / 60 / 60 / 24;
timer = Math.round(timer);

const daysText = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
];

const hours = date.getHours();
let sayHours;
if (hours >= 5 && hours < 12) {
    sayHours = 'Доброе утро';
} else if (hours >= 12 && hours < 18) {
    sayHours = 'Добрый день';
} else if (hours >= 18 && hours < 24) {
    sayHours = 'Добрый вечер';
} else {
    sayHours = 'Доброй ночи';
}

const period = date.getHours() >= 12 ? 'PM' : 'AM';
let hours12 = date.getHours() - (date.getHours() >= 12 ? 12 : 0),
    minutes12 = date.getMinutes(),
    seconds12 = date.getSeconds();
if (minutes12 < 10) {
    minutes12 = '0' + minutes12;
}
if (seconds12 < 10) {
    seconds12 = '0' + seconds12;
}
if (hours12 < 10) {
    hours12 = '0' + hours12;
}

const day = date.getDay();
message1.insertAdjacentText('beforeend', sayHours);
message2.insertAdjacentText('beforeend', 'Сегодня ' + daysText[day]);
message3.insertAdjacentText('beforeend', 'Текущее время: ' + hours12 + ':' + minutes12 + ':' + seconds12 + ' ' + period);
message4.insertAdjacentText('beforeend', 'До Нового года: ' + timer + 'дней.');
