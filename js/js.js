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
inputIncomeTitle = document.querySelector('.income-title'),//Наименование
incomeItem = document.querySelectorAll('.income-items'),
//Возможные расходы
inputAdditionalExpenses = document.querySelector('.additional_expenses-item'),
//Обязательные расходы
expensesItems = document.querySelectorAll('.expenses-items'),
inputExpensesTitle = document.querySelector('.expenses-title'),//Наименование
inputExpensesAmount = document.querySelector('.expenses-amount'),//Сумма
//Правые элементы
resultBudgetMonth = document.getElementsByClassName('budget_month-value')[0],//Доход за месяц
resultBudgetDay = document.getElementsByClassName('budget_day-value')[0],//Дневной бюджет
resultExpensesMonth = document.getElementsByClassName('expenses_month-value')[0],//Расход за месяц
resultAdditionalIncome = document.getElementsByClassName('additional_income-value')[0],//Возможные доходы
resultAdditionalExpenses = document.getElementsByClassName('additional_expenses-value')[0],//Возможные расходы
resultIncomePeriod = document.getElementsByClassName('income_period-value')[0],//Накопления за период
resultTargetMonth = document.getElementsByClassName('target_month-value')[0];//Срок до цели
console.log(resultBudgetMonth, resultBudgetDay, resultExpensesMonth);



let appData = {
    income: {},
    incomeMohth: 0, //Жополнительный заработок
    addIncome: [],
    expenses: {}, // Объект с обязательными расходами
    addExpenses: [],
    deposit: false, // есть ли депозит в банке
    percentDeposit: 0, // процент по вкладу
    moneyDeposit: 0, // сколько денег на вкладе
    mission: 0, //Желаем накопить
    budget: 0,//Доход за месяц
    budgetDay: 0, //Бюджет на день
    budgetMonth: 0, //Бюджет на месяц (Доход - обязательные расходы)
    expensesMonth: 0,//Сумма обязательных расходов в месяц
    start: function () {
        if (inputSalaryAmount.value === '') {
            alert('Ошибка! Поле "Месячный доход" должно быть заполнено!');
            return;
        }
        appData.budget = +inputSalaryAmount.value;
        

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getTargetMonth();
        appData.getStatusIncome(); 
        
        appData.getBudget();
        

        
        appData.getAddExpenses();
        appData.showResult();

    },
    showResult: function() {
        resultBudgetMonth.value = appData.budgetMonth;
        resultBudgetDay.value = appData.budgetDay;
        resultExpensesMonth.value = appData.expensesMonth;
        resultAdditionalExpenses.value = appData.addExpenses.join(', ');
        resultAdditionalIncome.value = appData.addIncome.join(', ');
        resultTargetMonth.value = Math.ceil(appData.getTargetMonth());
        resultIncomePeriod.value = appData.calcSavedMoney();


        console.log(appData.budget);
        console.log(appData.budgetDay);
        console.log(appData.expensesMonth);
        console.log(appData.addExpenses);
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpensesAdd);

        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            buttonExpensesAdd.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: function() {
        if (confirm('Есть ли у Вас дополнительный заработок?')){
            let itemIncome,
            cashIncome;
            do {
                itemIncome = prompt('Название дополнительного заработка');
            } while(isNamber(itemIncome));
            do {
                cashIncome = prompt('Сколько в месяц Вы на этом зарабатываете?');
            } while (!isNamber(cashIncome));
            
            appData.income[itemIncome] = +cashIncome;
        }

        for (let key in appData.income) {
            appData.incomeMohth += +appData.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = inputAdditionalExpenses.value.toLowerCase().split(',');

        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        inputAdditionalIncome.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },



    getExpensesMonth: function() { //Сумма обязательных раходов
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
        console.log('Расходы за месяц: ' + appData.expensesMonth + 'руб.');
    },
    getBudget: function () { 
        appData.budgetMonth = appData.budget + appData.incomeMohth - appData.expensesMonth; // Накопления за месяц (Доходы минус расходы)
        appData.budgetDay = Math.floor(appData.budgetMonth / 30); // Бюджет на день
    },
    getStatusIncome: function () { //Функция проверки уровня дохода
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
        if (appData.deposit) {
            do{
                appData.percentDeposit = prompt('Какой годовой процент?', 5);
            } while (!isNamber(appData.percentDeposit));
            do{
                appData.moneyDeposit = prompt('Какая сумма у Вас на вкладе?', 140000);
            } while (!isNamber(appData.moneyDeposit));
        }
    },

    calcSavedMoney: function() {
        return appData.budgetMonth * inputPeriod.value;
    }

};

buttonStart.addEventListener('click', appData.start);

buttonExpensesAdd.addEventListener('click', appData.addExpensesBlock);



appData.getInfoDeposit();


let arr = [];
let i = 0;
for (let item of appData.addExpenses) {
    arr[i] = item[0].toUpperCase() + item.slice(1);
    i++;
}



