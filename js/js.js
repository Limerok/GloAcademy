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
        console.log('start', this);
        appData.budget = +inputSalaryAmount.value; //Доход за месяц из инпута
        

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getIncomeMonth();
        
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getTargetMonth();
        appData.getStatusIncome(); 
        
        appData.getBudget();
        appData.getInfoDeposit();
        

        
        appData.getAddExpenses();
        appData.showResult();

        
    },
    showResult: function() { //Выводим результаты
        console.log('showResult', this);
        resultBudgetMonth.value = appData.budgetMonth;
        resultBudgetDay.value = appData.budgetDay;
        resultExpensesMonth.value = appData.expensesMonth;
        resultAdditionalExpenses.value = appData.addExpenses.join(', ');
        resultAdditionalIncome.value = appData.addIncome.join(', ');
        resultTargetMonth.value = Math.ceil(appData.getTargetMonth());
        resultIncomePeriod.value = appData.calcSavedMoney();

        inputPeriod.addEventListener('input', function() {
            resultIncomePeriod.value = appData.calcSavedMoney();
        });
    },
    addIncomeBlock: function() { //Кнопка доп дохода
        console.log('addIncomeBlock', this);
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonIncomeAdd);

        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            buttonIncomeAdd.style.display = 'none';
        }
    },
    addExpensesBlock: function() { // Кнопка обязательных расходов
        console.log('addExpensesBlock', this);
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpensesAdd);

        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            buttonExpensesAdd.style.display = 'none';
        }
    },
    getExpenses: function() { // Обязательные расходы
        console.log('getExpenses', this);
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;//Обяз.расх наимен
            let cashExpenses = item.querySelector('.expenses-amount').value;//Обяз.расх сумма

            if (itemExpenses !== '' && cashExpenses !== ''){//если не пустые то
                appData.expenses[itemExpenses] = +cashExpenses;//записываем в объект
            }
        });
    },
    getIncome: function() { //Доп доход
        console.log('getIncome', this);
        incomeItems.forEach(function(item) {//Проходим коллекцию ДопДохода
            let itemIncome = item.querySelector('.income-title').value;//Доп.доход наимен
            let cashIncome = item.querySelector('.income-amount').value;//до.доход сумма

            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;// записываем в объект
            }
        });
    },
    getAddExpenses: function() {// Получаем возможные расходы
        console.log('getAddExpenses', this);
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
        console.log('getAddIncome', this);
        inputAdditionalIncome.forEach(function(item) {
            let itemValue = item.value.trim();//Убираем пробелы
            if (itemValue !== '') {// Если не пустой
                appData.addIncome.push(itemValue);//Записываем в массив
            }
        });
    },



    getExpensesMonth: function() { //Сумма обязательных раходов
        console.log('getExpensesMonth', this);
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getIncomeMonth: function() {
        console.log('getIncomeMonth', this);
        for (let key in appData.income) {
            appData.incomeMohth += appData.income[key];
        }
    },

    getBudget: function () { 
        console.log('getBudget', this);
        appData.budgetMonth = appData.budget + appData.incomeMohth - appData.expensesMonth; // Накопления за месяц (Доходы минус расходы)
        appData.budgetDay = Math.floor(appData.budgetMonth / 30); // Бюджет на день
    },
    getStatusIncome: function () { //Функция проверки уровня дохода
        console.log('getStatusIncome', this);
        if (appData.budgetDay >= 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (600 <= appData.budgetDay) {
            console.log('У вас средний уровень дохода');
        } else if (0 <= appData.budgetDay) {
            console.log('К сожалению у вас уровень дохода ниже среднего');
        } else if (appData.budgetDay < 0) {
            console.log('Что то пошло не так');
        }
    },
    
    getTargetMonth: function () {
        console.log('getTargetMonth', this);
        return inputMission.value / appData.budgetMonth;

        /* let status = Math.ceil(appData.mission / appData.budgetMonth); //посчитать за сколько месяцев будет достигнута 
        //цель mission
        if (status >= 0) {
            console.log('Цель будет достигнута за: ' + status + ' месяцев.');
        } else {
            console.log('Цель не будет достигнута');
        } */
    },
    
    getInfoDeposit: function() {
        console.log('getInfoDeposit', this);
        if (appData.deposit) {
            do{
                appData.percentDeposit = prompt('Какой годовой процент?', 5);
            } while (!isNamber(appData.percentDeposit));
            do{
                appData.moneyDeposit = prompt('Какая сумма у Вас на вкладе?', 140000);
            } while (!isNamber(appData.moneyDeposit));
        }
    },

    getPeriodAmount: function() {
        console.log('getPeriodAmount', this);
        let periodAmount = document.querySelector('.period-amount');
        periodAmount.textContent = inputPeriod.value;
    },
    calcSavedMoney: function() { //Накопления за период(месяцев)
        console.log('calcSavedMoney', this);
        return appData.budgetMonth * inputPeriod.value;
    },

    event: function() {
        console.log('event', this);
        appData.start();
    }

};

buttonStart.disabled = true;
inputSalaryAmount.addEventListener('input', function() {
    if (inputSalaryAmount.value === '') {
        buttonStart.disabled = true;
    }
    if (inputSalaryAmount.value !== '') {
        buttonStart.disabled = false;
    }
});


buttonStart.addEventListener('click', appData.event);

buttonIncomeAdd.addEventListener('click', appData.addIncomeBlock);
buttonExpensesAdd.addEventListener('click', appData.addExpensesBlock);
inputPeriod.addEventListener('input', appData.getPeriodAmount);





let arr = [];
let i = 0;
for (let item of appData.addExpenses) {
    arr[i] = item[0].toUpperCase() + item.slice(1);
    i++;
}



