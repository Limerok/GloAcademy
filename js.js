'use strict';

const books = document.querySelectorAll('.book'),
    collections = document.querySelectorAll('ul'),
    elems = document.querySelectorAll('li'),
    body = document.querySelector('body'),
    ss = document.querySelectorAll('a'),
    adv = document.querySelector('.adv'),
    book6 = books[2].querySelectorAll('li');

books[0].before(books[1]);
books[0].after(books[4]);
books[2].before(books[3]);
books[5].after(books[2]);

body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

ss[4].innerHTML = 'Книга 3. this и Прототипы Объектов';

adv.remove();

elems[9].after(elems[2]);
elems[9].before(elems[7]);
elems[3].after(elems[6]);
elems[6].after(elems[8]);
elems[49].before(elems[55]);
elems[50].after(elems[48]);
elems[54].before(elems[51]);

book6[8].insertAdjacentHTML('afterend', '<li>Глава 8: За пределами ES6</li>');
console.log(book6);
