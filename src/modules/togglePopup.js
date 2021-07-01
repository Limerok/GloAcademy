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

export default  togglePopup;