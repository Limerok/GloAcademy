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
    };
    const reset = () => {
        calcSquare.value = '';
        calcCount.value = '';
        calcDay.value = '';
    };

    calcBlock.addEventListener('change', (event) => {
        const target = event.target;
        if (target.matches('input')){
            countSum();
        }
        if (target.matches('select')){
            reset();
            countSum();
        }
    });
};

export default calc;