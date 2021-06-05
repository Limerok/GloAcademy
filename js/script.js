'use strict';

const isNamber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n); 
};


const start = function () {
    let number;
    do{
        number = prompt('Ваш месячный доход?');
    }
    while ( !isNamber(number) ); 
    return number;
};
let money = start(); //“Доход за месяц”

let appData = {
    income: {},
    addIncome: [],
    expenses: {}, // Объект с обязательными расходами
    addExpenses: [],
    deposit: false, // есть ли депозит в банке
    mission: 900000, //Желаем накопить
    period: 6,//За какой период желаем накопить
    budget: +money,//Доход за месяц
    budgetDay: 0, //Бюджет на день
    budgetMonth: 0, //Бюджет на месяц (Доход - обязательные расходы)
    expensesMonth: 0,//Сумма обязательных расходов в месяц
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');//любое булево значение

        let questionSum,
            questionItem,
            expensesAmonth = +prompt('Сколько у Вас статей расходов в месяц?') ;
        for (let i = 0; i < expensesAmonth; i++) {
            questionItem = prompt('Введите обязательную статью расходов №' + (i+1) );
            do{
                questionSum = prompt('Во сколько это обойдется?');
            }
            while ( !isNamber(questionSum) ); 
            appData.expenses[questionItem] = +questionSum; 
        }
    },
    getExpensesMonth: function() { //Сумма обязательных раходов
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
        console.log('Расходы за месяц: ' + appData.expensesMonth + 'руб.');
    },
    getBudget: function () { 
        appData.budgetMonth = appData.budget - appData.expensesMonth; // Накопления за месяц (Доходы минус расходы)
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
        let status = Math.ceil(appData.mission / appData.budgetMonth); //посчитать за сколько месяцев будет достигнута 
        //цель mission
        if (status >= 0) {
            console.log('Цель будет достигнута за: ' + status + ' месяцев.');
        } else {
            console.log('Цель не будет достигнута');
        }
    },
    
    
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log(appData);

console.log('Наша программа включает в себя данные:');
for (let key in appData) {
    console.log(key + ': ' + appData[key]);
}