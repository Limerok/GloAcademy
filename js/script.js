'use strict';

let money = prompt('Ваш месячный доход?'); //“Доход за месяц”
money = +(money); // Преобразовываем ДоходЗаМесяц к типу number
let income = 40000;//строка с дополнительными доходом (например: фриланс)
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');//строка с 
//перечислением дополнительных расходов через запятую (например: интернет, такси, коммуналка)
let deposit = confirm('Есть ли у вас депозит в банке?');//любое булево значение
let mission = 9000000;//любое число (Какую сумму хотите накопить)
let period = 6;//число от 1 до 12 (месяцев)
let expenses1, expenses2, amount1, amount2, savings, butgetDay;

expenses1 = prompt('Введите обязательную статью расходов (например путешествие, еда');
amount1 = prompt('Во сколько это обойдется?'); // Вписываем обязательный расход 1
amount1 = +(amount1); // Преобразовываем расход 1 к типу number
expenses2 = prompt('Введите обязательную статью расходов (например развлечение, квартплата');
amount2 = prompt('Во сколько это обойдется?'); // Вписываем обязательный расход 2
amount2 = +(amount2); // Преобразовываем расход 2 к типу number

function getAccumulatedMonth () { //Функция возвращает Накопления за месяц (Доходы минус расходы)
    return money - amount1 - amount2; //Вычислить бюджет на месяц, учитывая обязательные расходы
}
let accumulatedMonth = getAccumulatedMonth(); // Присваиваем переменной значение функции
butgetDay = Math.floor(accumulatedMonth / 30);//дневной бюджет

let showTypeOf = function (data) { //Функция получения типа данных
    return ( typeof(data) );
};

let getStatusIncome = function () { //Функция проверки уровня дохода

    if (butgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (600 <= butgetDay) {
        return ('У вас средний уровень дохода');
    } else if (0 <= butgetDay) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (butgetDay < 0) {
        return ('Что то пошло не так');
    }

};

function getExpensesMonth () {
    return (amount1 + amount2);
}

function getTargetMonth () {
    return Math.ceil(mission / accumulatedMonth); //посчитать за сколько месяцев будет достигнута цель mission
}

console.log(money, showTypeOf(money)); //вызовы функции showTypeOf
console.log(income, showTypeOf(income)); //вызовы функции showTypeOf
console.log(deposit, showTypeOf(deposit)); //вызовы функции showTypeOf
console.log('Сумма обязательных расходов: ' + getExpensesMonth() + 'руб. в месяц');//Расходы за месяц 
//вызов getExpensesMonth
console.log(addExpenses.toLowerCase().split(', ')); //Вывод возможных расходов в виде массива (addExpenses)
console.log('Цель будет достигнута за: ' + getTargetMonth() + ' месяцев.'); //Cрок достижения цели в месяцах 
//(результат вызова функции getTargetMonth)
console.log('Дневной бюджет: ' + butgetDay + 'руб.'); //Бюджет на день butgetDay
console.log(getStatusIncome()); // Вывод уровня дохода