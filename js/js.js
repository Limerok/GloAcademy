//Остановился на 28:05
//Остановился на 28:05
//Остановился на 28:05
//Остановился на 28:05

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
//Обязательные расходы
expensesItems = document.querySelectorAll('.expenses-items'),
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



let appData = {
    income: {},//объект с доп доходами
    incomeMohth: 0, //Дополнительный заработок
    addIncome: [],//Возможные доходы
    expenses: {}, // Объект с обязательными расходами
    addExpenses: [],//Возможные расходы
    deposit: false, // есть ли депозит в банке
    percentDeposit: 0, // процент по вкладу
    moneyDeposit: 0, // сколько денег на вкладе
    mission: 0, //Желаем накопить
    budget: 0,//Доход за месяц
    budgetDay: 0, //Бюджет на день
    budgetMonth: 0, //Бюджет на месяц (Доход - обязательные расходы)
    expensesMonth: 0,//Сумма обязательных расходов в месяц
    start: function () {
        this.budget = +inputSalaryAmount.value; //Доход за месяц из инпута
        

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

        
    },
    showResult: function() { //Выводим результаты
        resultBudgetMonth.value = this.budgetMonth;
        resultBudgetDay.value = this.budgetDay;
        resultExpensesMonth.value = this.expensesMonth;
        resultAdditionalExpenses.value = this.addExpenses.join(', ');
        resultAdditionalIncome.value = this.addIncome.join(', ');
        resultTargetMonth.value = Math.ceil(this.getTargetMonth());
        resultIncomePeriod.value = this.calcSavedMoney();

        inputPeriod.addEventListener('input', function() {
            resultIncomePeriod.value = appData.calcSavedMoney();
        });
    },
    addIncomeBlock: function() { //Кнопка доп дохода
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonIncomeAdd);

        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            buttonIncomeAdd.style.display = 'none';
        }
    },
    addExpensesBlock: function() { // Кнопка обязательных расходов
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpensesAdd);

        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            buttonExpensesAdd.style.display = 'none';
        }
    },
    getExpenses: function() { // Обязательные расходы
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;//Обяз.расх наимен
            let cashExpenses = item.querySelector('.expenses-amount').value;//Обяз.расх сумма

            /* itemExpenses.disabled = true; */
            /* cashExpenses.disabled = true; */

            if (itemExpenses !== '' && cashExpenses !== ''){//если не пустые то
                appData.expenses[itemExpenses] = +cashExpenses;//записываем в объект
            }
        });
    },
    getIncome: function() { //Доп доход
        incomeItems.forEach(function(item) {//Проходим коллекцию ДопДохода
            let itemIncome = item.querySelector('.income-title').value;//Доп.доход наимен
            let cashIncome = item.querySelector('.income-amount').value;//до.доход сумма

            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;// записываем в объект
            }
        });
    },
    getAddExpenses: function() {// Получаем возможные расходы
        let addExpenses = inputAdditionalExpenses.value.toLowerCase().split(',');
        // В нижний регистр и делаем массив
        addExpenses.forEach(function(item) { // Проходим массив
            item = item.trim();//Убираем пробелы
            if (item !== ''){// Если не пустой
                appData.addExpenses.push(item);//Записываем в массив
            }
        });
    },

    getAddIncome: function() {// Записываем возможные доходы
        inputAdditionalIncome.forEach(function(item) {
            let itemValue = item.value.trim();//Убираем пробелы
            if (itemValue !== '') {// Если не пустой
                appData.addIncome.push(itemValue);//Записываем в массив
            }
        });
    },



    getExpensesMonth: function() { //Сумма обязательных раходов
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getIncomeMonth: function() {
        for (let key in appData.income) {
            appData.incomeMohth += appData.income[key];
        }
    },

    getBudget: function () { 
        this.budgetMonth = this.budget + this.incomeMohth - this.expensesMonth; // Накопления за месяц (Доходы минус расходы)
        this.budgetDay = Math.floor(this.budgetMonth / 30); // Бюджет на день
    },
    getStatusIncome: function () { //Функция проверки уровня дохода
        if (this.budgetDay >= 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (600 <= this.budgetDay) {
            console.log('У вас средний уровень дохода');
        } else if (0 <= this.budgetDay) {
            console.log('К сожалению у вас уровень дохода ниже среднего');
        } else if (this.budgetDay < 0) {
            console.log('Что то пошло не так');
        }
    },
    
    getTargetMonth: function () {
        return inputMission.value / this.budgetMonth;

        /* let status = Math.ceil(appData.mission / appData.budgetMonth); //посчитать за сколько месяцев будет достигнута 
        //цель mission
        if (status >= 0) {
            console.log('Цель будет достигнута за: ' + status + ' месяцев.');
        } else {
            console.log('Цель не будет достигнута');
        } */
    },
    
    getInfoDeposit: function() {
        if (this.deposit) {
            do{
                this.percentDeposit = prompt('Какой годовой процент?', 5);
            } while (!isNamber(this.percentDeposit));
            do{
                this.moneyDeposit = prompt('Какая сумма у Вас на вкладе?', 140000);
            } while (!isNamber(this.moneyDeposit));
        }
    },

    getPeriodAmount: function() {
        let periodAmount = document.querySelector('.period-amount');
        periodAmount.textContent = inputPeriod.value;
    },
    calcSavedMoney: function() { //Накопления за период(месяцев)
        return this.budgetMonth * inputPeriod.value;
    },
    reset: function () {
        resultBudgetMonth.value = '';
        resultBudgetDay.value = '';
        resultExpensesMonth.value = '';
        resultAdditionalExpenses.value = '';
        resultAdditionalIncome.value = '';
        resultTargetMonth.value = '';
        resultIncomePeriod.value = '';

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
    },

    eventStart: function() {
        //localStorage.setItem('clean', JSON.stringify(this));

        buttonStart.style.display = 'none';
        buttonCancel.style.display = 'block';

        inputSalaryAmount.disabled = true;
        inputAdditionalExpenses.disabled = true;
        inputMission.disabled = true;
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title');//Обяз.расх наимен
            let cashExpenses = item.querySelector('.expenses-amount');//Обяз.расх сумма

            itemExpenses.disabled = true;
            cashExpenses.disabled = true;
        });
        incomeItems.forEach(function(item) {//Проходим коллекцию ДопДохода
            let itemIncome = item.querySelector('.income-title');//Доп.доход наимен
            let cashIncome = item.querySelector('.income-amount');//до.доход сумма

            itemIncome.disabled = true;
            cashIncome.disabled = true;
        });
        inputAdditionalIncome.forEach(function(item) {
            item.disabled = true;
        });
        depositCheckbox.disabled = true;
        buttonIncomeAdd.style.display = 'none';
        buttonExpensesAdd.style.display = 'none';


        appData.start();
    },
    EventClear: function(){
        appData.reset();
    },
    check: function() {
        buttonStart.disabled = true;
        inputSalaryAmount.addEventListener('input', function() {
        if (inputSalaryAmount.value === '') {
            buttonStart.disabled = true;
        }
        if (inputSalaryAmount.value !== '') {
            buttonStart.disabled = false;
        }
        });
    }
};

appData.check();



buttonStart.addEventListener('click', appData.eventStart);
buttonCancel.addEventListener('click', appData.EventClear);
buttonIncomeAdd.addEventListener('click', appData.addIncomeBlock);
buttonExpensesAdd.addEventListener('click', appData.addExpensesBlock);
inputPeriod.addEventListener('input', appData.getPeriodAmount);





/* let arr = [];
let i = 0;
for (let item of appData.addExpenses) {
    arr[i] = item[0].toUpperCase() + item.slice(1);
    i++;
} */



