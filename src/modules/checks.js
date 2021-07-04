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
            target.value = target.value.replace(/[^а-яё 0-9,.]/gi, '');
        } else if(target.name === 'user_email') {
            target.value = target.value.replace(/[^a-z\-1-9@_.!~*']/gi, '');
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
                target.value = target.value.replace(/(^\s+|\s+$)/g,'');
                target.value = target.value.replace(/,+/gi, ',');
                target.value = target.value.replace(/\.+/gi, '.');
            } else if(target.name ==='user_email') {
                target.value = target.value.replace(/-+/gi, '-');
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