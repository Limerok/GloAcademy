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

export default sendForm;