const sendForm = () => {
    const errorNessage = 'Что то пошло не так',
        loadMessage = '<img src="../images/loading.gif" style="width:50px;height:auto;">',
        successMesage = 'Спасибо! Мы скоро с Вами свяжемся.',
        popup = document.querySelector('.popup');
    
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
    };
    const nonePopap = () => {
        popup.style.display = `none`;
    };
    form.forEach(item => {
        item.addEventListener('submit', event => {
            event.preventDefault();
            item.appendChild(statusMessage);
            statusMessage.innerHTML = loadMessage;
            const formData = new FormData(item);
            postData(formData)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('status not 200');
                    }
                    statusMessage.textContent = successMesage;
                    setTimeout(nonePopap, 2000);
                })
                .catch(() => {
                        statusMessage.textContent = errorNessage;
                });        
            resetInput(item);
        });
    });
    
};

export default sendForm;