const toggleMenu = () => {
    const bodyContent = document.querySelector('body'),
        menu = document.querySelector('menu'),
        main = document.querySelector('main');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };

    bodyContent.addEventListener('keydown', event => {
        if (event.code === 'Escape') {
            menu.classList.remove('active-menu');
        }
    });
    bodyContent.addEventListener('click', event => {
        const target = event.target;

        if (target.closest('.menu') || target.closest('.close-btn') || target.closest('menu > ul > li > a')) {
            handlerMenu();
        } else if (!target.closest('menu')) {
            menu.classList.remove('active-menu');
        }
    });

    //Анимация перехода меню
    const count = (link) => {
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
    };
    main.querySelectorAll('a[href^="#"').forEach(count);
    menu.querySelectorAll('a[href^="#"').forEach(count);
};

export default toggleMenu;