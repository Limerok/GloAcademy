//Остановился на 28 =05
//Остановился на 28 =05
//Остановился на 28 =05
//Остановился на 28 =05

'use strict';

const isNamber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n); 
};

// Получение элементов
let buttonStart = document.getElementById('start'), // кнопка расчитать
buttonCancel = document.getElementById('cancel'), //кнопка сбросить
buttonIncomeAdd = document.getElementsByTagName('button')[0],//добавить доп.доход
buttonExpensesAdd = document.getElementsByTagName('button')[1],//добавить обязат.расход
inputMission = document.querySelector('.target-amount'),//Цель
inputSalaryAmount = document.querySelector('.salary-amount'),//Месячный дох
inputPeriod = document.querySelector('.period-select'),//Период для цели
alertResultPeriod = document.querySelector('.period-amount'),
//Элементы по вкладу
depositCheckbox = document.querySelector('#deposit-check'),//Чек депозита в банке
depositSelectBank = document.querySelector('.deposit-bank'),//Выбор банка
depositCalcAmount = document.querySelector('.deposit-amount'),//Сумма на счету
depositCalcPercent = document.querySelector('.deposit-percent'),//Процент вклада
//Возможные доходы
inputAdditionalIncome = document.querySelectorAll('.additional_income-item'),//возможный доход 
//Дополнительные доходы
incomeItems = document.querySelectorAll('.income-items'),
incomeTitle = document.querySelectorAll('.income-title'),
incomeAmount = document.querySelectorAll('.income-amount'),
//Обязательные расходы
expensesItems = document.querySelectorAll('.expenses-items'),
expensesTitle = document.querySelectorAll('.expenses-title'),
expensesAmount = document.querySelectorAll('.expenses-amount'),
//Возможные расходы
inputAdditionalExpenses = document.querySelector('.additional_expenses-item'),
//Правые элементы
resultBudgetMonth = document.getElementsByClassName('budget_month-value')[0],//Доход за месяц
resultBudgetDay = document.getElementsByClassName('budget_day-value')[0],//Дневной бюджет
resultExpensesMonth = document.getElementsByClassName('expenses_month-value')[0],//Расход за месяц
resultAdditionalIncome = document.getElementsByClassName('additional_income-value')[0],//Возможные доходы
resultAdditionalExpenses = document.getElementsByClassName('additional_expenses-value')[0],//Возможные расходы
resultIncomePeriod = document.getElementsByClassName('income_period-value')[0],//Накопления за период
resultTargetMonth = document.getElementsByClassName('target_month-value')[0];//Срок до цели

const AppData = function () {
    this.income = {};//объект с доп доходами
    this.incomeMohth = 0; //Дополнительный заработок
    this.addIncome = [];//Возможные доходы
    this.expenses = {}; // Объект с обязательными расходами
    this.addExpenses = [];//Возможные расходы
    this.deposit = false; // есть ли депозит в банке
    this.percentDeposit = 0; // процент по вкладу
    this.moneyDeposit = 0; // сколько денег на вкладе
    this.mission = 0; //Желаем накопить
    this.budget = 0;//Доход за месяц
    this.budgetDay = 0; //Бюджет на день
    this.budgetMonth = 0; //Бюджет на месяц (Доход - обязательные расходы)
    this.expensesMonth = 0;//Сумма обязательных расходов в месяц
};
AppData.prototype.isNamber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n); 
};
AppData.prototype.check = function() {
    buttonStart.disabled = true;
    inputSalaryAmount.addEventListener('input', function() {
    if (inputSalaryAmount.value === '') {
        buttonStart.disabled = true;
    }
    if (inputSalaryAmount.value !== '') {
        buttonStart.disabled = false;
    }
    });
};
AppData.prototype.start = function () {
    this.budget = +inputSalaryAmount.value; //Доход за месяц из инпута
    inputSalaryAmount.disabled = true;
    depositCheckbox.disabled = true;

    buttonStart.style.display = 'none';
    buttonCancel.style.display = 'block';

    buttonIncomeAdd.style.display = 'none';
    buttonExpensesAdd.style.display = 'none';

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getAddIncome();
    this.getTargetMonth();
    this.getStatusIncome(); 
    this.getBudget();
    this.getInfoDeposit();
    this.getAddExpenses();
    this.showResult();

};
    
AppData.prototype.showResult = function() { //Выводим результаты
    resultBudgetMonth.value = this.budgetMonth;
    resultBudgetDay.value = this.budgetDay;
    resultExpensesMonth.value = this.expensesMonth;
    resultAdditionalExpenses.value = this.addExpenses.join(', ');
    resultAdditionalIncome.value = this.addIncome.join(', ');
    resultTargetMonth.value = Math.ceil(this.getTargetMonth());
    resultIncomePeriod.value = this.calcSavedMoney();

    inputPeriod.addEventListener('input', () => {
        resultIncomePeriod.value = this.calcSavedMoney();
    });
};
AppData.prototype.addIncomeBlock = function() { //Кнопка доп дохода
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonIncomeAdd);
    
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        buttonIncomeAdd.style.display = 'none';
    }

    this.checkingInputs();
};
AppData.prototype.addExpensesBlock = function() { // Кнопка обязательных расходов
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpensesAdd);

    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        buttonExpensesAdd.style.display = 'none';
    }
    
    this.checkingInputs();
};
AppData.prototype.getExpenses = function() { // Обязательные расходы
    expensesItems.forEach((item) =>  {
        let itemExpenses = item.querySelector('.expenses-title');//Обяз.расх наимен
        let cashExpenses = item.querySelector('.expenses-amount');//Обяз.расх сумма

        itemExpenses.disabled = true;
        cashExpenses.disabled = true;

        itemExpenses = itemExpenses.value;//Обяз.расх наимен
        cashExpenses = cashExpenses.value;//Обяз.расх сумма
        /* itemExpenses.disabled = true; */
        /* cashExpenses.disabled = true; */

        if (itemExpenses !== '' && cashExpenses !== ''){//если не пустые то
            this.expenses[itemExpenses] = +cashExpenses;//записываем в объект
        }
    });
};
AppData.prototype.getIncome = function() { //Доп доход
    incomeItems.forEach((item) => {//Проходим коллекцию ДопДохода
        let itemIncome = item.querySelector('.income-title');//Доп.доход наимен
        let cashIncome = item.querySelector('.income-amount');//до.доход сумма

        itemIncome.disabled = true;
        cashIncome.disabled = true;

        itemIncome = itemIncome.value;//Доп.доход наимен
        cashIncome = cashIncome.value;//до.доход сумма

        if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = +cashIncome;// записываем в объект
        }
    });
};
AppData.prototype.getAddExpenses = function() {// Получаем возможные расходы
    inputAdditionalExpenses.disabled = true;
    let addExpenses = inputAdditionalExpenses.value.toLowerCase().split(',');
    // В нижний регистр и делаем массив
    addExpenses.forEach((item) => { // Проходим массив
        item = item.trim();//Убираем пробелы
        if (item !== ''){// Если не пустой
            this.addExpenses.push(item);//Записываем в массив
        }
    });
};
AppData.prototype.getAddIncome = function() {// Записываем возможные доходы
    inputAdditionalIncome.forEach((item) => {
        item.disabled = true;
        let itemValue = item.value.trim();//Убираем пробелы
        if (itemValue !== '') {// Если не пустой
            this.addIncome.push(itemValue);//Записываем в массив
        }
    });
};
AppData.prototype.getExpensesMonth = function() { //Сумма обязательных раходов
    for (let key in this.expenses) {
        this.expensesMonth += this.expenses[key];
    }
};
AppData.prototype.getIncomeMonth = function() {
    for (let key in this.income) {
        this.incomeMohth += this.income[key];
    }
};
AppData.prototype.getBudget = function () { 
    this.budgetMonth = this.budget + this.incomeMohth - this.expensesMonth;//Накопления за месяц (Доходы минус расходы)
    this.budgetDay = Math.floor(this.budgetMonth / 30); // Бюджет на день
};
AppData.prototype.getStatusIncome = function () { //Функция проверки уровня дохода
    if (this.budgetDay >= 1200) {
        console.log('У вас высокий уровень дохода');
    } else if (600 <= this.budgetDay) {
        console.log('У вас средний уровень дохода');
    } else if (0 <= this.budgetDay) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
        console.log('Что то пошло не так');
    }
};
AppData.prototype.getTargetMonth = function () {
    inputMission.disabled = true;
    return inputMission.value / this.budgetMonth;

    /* let status = Math.ceil(appData.mission / appData.budgetMonth); //посчитать за сколько месяцев будет достигнута 
    //цель mission
    if (status >= 0) {
        console.log('Цель будет достигнута за: ' + status + ' месяцев.');
    } else {
        console.log('Цель не будет достигнута');
    } */
};
AppData.prototype.getInfoDeposit = function() {
    if (this.deposit) {
        do{
            this.percentDeposit = prompt('Какой годовой процент?', 5);
        } while (!isNamber(this.percentDeposit));
        do{
            this.moneyDeposit = prompt('Какая сумма у Вас на вкладе?', 140000);
        } while (!isNamber(this.moneyDeposit));
    }
};
AppData.prototype.getPeriodAmount = function() {
    let periodAmount = document.querySelector('.period-amount');
    periodAmount.textContent = inputPeriod.value;
};
AppData.prototype.calcSavedMoney = function() { //Накопления за период(месяцев)
    return this.budgetMonth * inputPeriod.value;
};
AppData.prototype.reset = function () {
    resultBudgetMonth.value = '';
    resultBudgetDay.value = '';
    resultExpensesMonth.value = '';
    resultAdditionalExpenses.value = '';
    resultAdditionalIncome.value = '';
    resultTargetMonth.value = '';
    resultIncomePeriod.value = '';
    depositCheckbox.checked = false;

    this.income = {};//объект с доп доходами
    this.incomeMohth = 0; //Дополнительный заработок
    this.addIncome = [];//Возможные доходы
    this.expenses = {}; // Объект с обязательными расходами
    this.addExpenses = [];//Возможные расходы
    this.deposit = false; // есть ли депозит в банке
    this.percentDeposit = 0; // процент по вкладу
    this.moneyDeposit = 0; // сколько денег на вкладе
    this.mission = 0; //Желаем накопить
    this.budget = 0;//Доход за месяц
    this.budgetDay = 0; //Бюджет на день
    this.budgetMonth = 0; //Бюджет на месяц (Доход - обязательные расходы)
    this.expensesMonth = 0;//Сумма обязательных расходов в месяц

    buttonStart.style.display = 'block';
    buttonCancel.style.display = 'none';
    this.check();

    inputSalaryAmount.disabled = false;
    inputSalaryAmount.value = '';
    inputAdditionalExpenses.disabled = false;
    inputAdditionalExpenses.value = '';
    inputMission.disabled = false;
    inputMission.value = '';
    expensesItems.forEach(function(item, i) {
        let itemExpenses = item.querySelector('.expenses-title');//Обяз.расх наимен
        let cashExpenses = item.querySelector('.expenses-amount');//Обяз.расх сумма

        if (i > 0) {
            item.remove();
        }

        itemExpenses.disabled = false;
        itemExpenses.value = '';
        cashExpenses.disabled = false;
        cashExpenses.value = '';
    });
    incomeItems.forEach(function(item, i) {//Проходим коллекцию ДопДохода
        let itemIncome = item.querySelector('.income-title');//Доп.доход наимен
        let cashIncome = item.querySelector('.income-amount');//до.доход сумма
        
        if (i > 0) {
            item.remove();
        }

        itemIncome.disabled = false;
        itemIncome.value = '';
        cashIncome.disabled = false;
        cashIncome.value = '';
    });
    inputAdditionalIncome.forEach(function(item) {
        item.disabled = false;
        item.value = '';
    });
    depositCheckbox.disabled = false;
    inputPeriod.value = 1;
    alertResultPeriod.textContent = '1';
    buttonIncomeAdd.style.display = 'block';
    buttonExpensesAdd.style.display = 'block';
};
AppData.prototype.checkingInputs = function(number) {
    let input = document.querySelectorAll('input');

    input.forEach(function(item) {
        let placeholder = item.getAttribute('placeholder');
        if (placeholder === 'Сумма') {
            item.addEventListener('input', function() {
                item.value = item.value.replace(/[^0-9]/g, '');

            });
            console.log(item);
        }
        if (placeholder === 'Наименование') {
            item.addEventListener('input', function() {
                item.value = item.value.replace(/[^а-я ,]/gi, '');
            });
            console.log(item);
        } if (placeholder === 'название'){
            item.addEventListener('input', function() {
                item.value = item.value.replace(/[^а-я ,]/gi, '');
            });
            console.log(item);
        }
    });
    
    
};
AppData.prototype.eventListener = function() {
    this.check();
    this.checkingInputs();
    buttonStart.addEventListener('click', this.start.bind(this));
    buttonCancel.addEventListener('click', this.reset.bind(this));
    buttonIncomeAdd.addEventListener('click', this.addIncomeBlock.bind(this));
    buttonExpensesAdd.addEventListener('click', this.addExpensesBlock.bind(this));
    inputPeriod.addEventListener('input', this.getPeriodAmount);

};


const appData = new AppData ();
appData.eventListener();



/* buttonStart.addEventListener('click', appData.start.bind(appData));
buttonCancel.addEventListener('click', appData.reset.bind(appData));
buttonIncomeAdd.addEventListener('click', appData.addIncomeBlock);
buttonExpensesAdd.addEventListener('click', appData.addExpensesBlock);
inputPeriod.addEventListener('input', appData.getPeriodAmount); */





/* let arr = [];
let i = 0;
for (let item of appData.addExpenses) {
    arr[i] = item[0].toUpperCase() + item.slice(1);
    i++;
} */



