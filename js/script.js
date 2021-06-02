'use strict';

const isNamber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n); 
};

let money; //“Доход за месяц”
do{
    money = prompt('Ваш месячный доход?');
}
while ( !isNamber(money) ); 
money = +money;

let income = 40000;//строка с дополнительными доходом (например: фриланс)
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');//строка с 
//перечислением дополнительных расходов через запятую (например: интернет, такси, коммуналка)
let deposit = confirm('Есть ли у вас депозит в банке?');//любое булево значение
let mission = 9000000;//любое число (Какую сумму хотите накопить)
let period = 6;//число от 1 до 12 (месяцев)
let expenses1, expenses2, amount1, amount2, savings, butgetDay;

//expenses1 = prompt('Введите обязательную статью расходов (например путешествие, еда');
//amount1 = prompt('Во сколько это обойдется?'); // Вписываем обязательный расход 1
//amount1 = +(amount1); // Преобразовываем расход 1 к типу number
//expenses2 = prompt('Введите обязательную статью расходов (например развлечение, квартплата');
//amount2 = prompt('Во сколько это обойдется?'); // Вписываем обязательный расход 2
//amount2 = +(amount2); // Преобразовываем расход 2 к типу number

const showTypeOf = function (data) { //Функция получения типа данных
    return ( typeof(data) );
};

const getStatusIncome = function (variableCompared) { //Функция проверки уровня дохода

    if (variableCompared >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (600 <= variableCompared) {
        return ('У вас средний уровень дохода');
    } else if (0 <= variableCompared) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (variableCompared < 0) {
        return ('Что то пошло не так');
    }

};

const getExpensesMonth = function(numberExpensesMonth) {
    let sum = 0;
    let sumExpenses;
    let expenses = [];

    for (let i = 0; i < numberExpensesMonth; i++) {

        expenses[i] = prompt('Введите обязательную статью расходов (например: развлечения).');
        
        do{
            sumExpenses = prompt('Во сколько это обойдется?');
        }
        while ( !isNamber(sumExpenses) ); 
        sum += +sumExpenses;

    }
    console.log(expenses);
    return sum;
};
let expensesAmonth = getExpensesMonth( +prompt('Сколько у Вас статей расходов в месяц?') );

function getAccumulatedMonth (subtrahend, deducted) { //Функция возвращает Накопления за месяц (Доходы минус расходы)
    return subtrahend - deducted; //Вычислить бюджет на месяц, учитывая обязательные расходы
}
let accumulatedMonth = getAccumulatedMonth(money, expensesAmonth); // Присваиваем переменной 
//значение функции
butgetDay = Math.floor(accumulatedMonth / 30);//дневной бюджет


function getTargetMonth (divisible, divisor) {
    return Math.ceil(divisible / divisor); //посчитать за сколько месяцев будет достигнута цель mission
}

function getTargetMonthStatus (status) {
    if (status >= 0) {
        console.log('Цель будет достигнута за: ' + status + ' месяцев.');
    } else {
        console.log('Цель не будет достигнута');
    }
}

console.log(money, showTypeOf(money)); //вызовы функции showTypeOf
console.log(income, showTypeOf(income)); //вызовы функции showTypeOf
console.log(deposit, showTypeOf(deposit)); //вызовы функции showTypeOf
console.log('Сумма обязательных расходов: ' + expensesAmonth + 'руб. в месяц');//Расходы за месяц 
//вызов getExpensesMonth
console.log(addExpenses.toLowerCase().split(', ')); //Вывод возможных расходов в виде массива (addExpenses)

getTargetMonthStatus(getTargetMonth(mission, accumulatedMonth));// Будет ли достигнута цель

console.log('Дневной бюджет: ' + butgetDay + 'руб.'); //Бюджет на день butgetDay
console.log(getStatusIncome(butgetDay)); // Вывод уровня дохода