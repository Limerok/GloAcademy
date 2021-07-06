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
            if (target.value === ' ') {
                target.value = target.value.replace(/[^а-яё]/gi, '');
            } else {
                target.value = target.value.replace(/[^а-яё ]/gi, '');
            }
        } else if (target.closest('#form2-message')) {
            target.value = target.value.replace(/[^а-яё 0-9,.]/gi, '');
        } else if(target.name === 'user_email') {
            target.value = target.value.replace(/[^a-z\-1-9@_.!~*']/gi, '');
        } else if(target.name === 'user_phone') {
            target.setAttribute('minlength', 7);
            target.setAttribute('maxlength', 13);
            target.value = target.value.replace(/^[^0-9\+]/gi, '');
            //target.value = target.value.replace(/^\+?\d{12}/gi, '');
        }

        target.addEventListener('blur', () => {
            
            if (target.name === 'user_name') {
                target.value = target.value.replace(/\s+/gi, ' ');
                target.value = target.value.replace(/-+/gi, '-');
                target.value = target.value.replace(/(^\s+|\s+$)/g,'');
                target.value = target.value.toLowerCase();
                target.value = target.value.replace(/(^|\s|-)\S/g, function(a) {return a.toUpperCase();});
                
            } else if(target.closest('#form2-message')) {
                target.value = target.value.replace(/\s+/gi, ' ');
                target.value = target.value.replace(/(^\s+|\s+$)/g,'');
                target.value = target.value.replace(/(^\.+)/g,'');
                target.value = target.value.replace(/(^\,+)/g,'');
                target.value = target.value.replace(/,+/gi, ',');
                target.value = target.value.replace(/\.+/gi, '.');
            } else if(target.name ==='user_email') {
                target.value = target.value.replace(/-+/gi, '-');
            } else if(target.name ==='user_phone') {
                target.value = target.value.replace(/^\++/gi, '+');
                target.value = target.value.replace(/\+$/g,'');
                if(target.name ==='user_phone') {
                    let lenght = target.value;
                    if (lenght.length < 7) {
                        target.value = '';
                    }
                }
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

export default checks;