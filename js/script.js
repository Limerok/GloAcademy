'use strict';

let money = prompt('Ваш месячный доход?'); //“Доход за месяц”
money = +(money);
let income = 40000;//строка с дополнительными доходом (например: фриланс)
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');//строка с 
//перечислением дополнительных расходов через запятую (например: интернет, такси, коммуналка)
let deposit = confirm('Есть ли у вас депозит в банке?');//любое булево значение
let mission = 9000000;//любое число (Какую сумму хотите накопить)
let period = 6;//число от 1 до 12 (месяцев)
let expenses1, expenses2, amount1, amount2, budgetMonth, savings, butgetDay;

expenses1 = prompt('Введите обязательную статью расходов (например путешествие, еда');
amount1 = prompt('Во сколько это обойдется?');
amount1 = +(amount1);
expenses2 = prompt('Введите обязательную статью расходов (например развлечение, квартплата');
amount2 = prompt('Во сколько это обойдется?');
amount2 = +(amount2);
budgetMonth = money - amount1 -amount2; //Вычислить бюджет на месяц, учитывая обязательные расходы
savings = Math.ceil(mission - budgetMonth); //посчитать за сколько месяцев будет достигнута цель mission
butgetDay = Math.floor(budgetMonth / 30);//дневной бюджет

if (butgetDay > 1200) {
    alert('У вас высокий уровень дохода');
} else if (600 < butgetDay <= 1200) {
    alert('У вас средний уровень дохода');
} else if (0 < butgetDay <= 600) {
    alert('К сожалению у вас уровень дохода ниже среднего');
} else {
    alert('Что то пошло не так');
}

console.log('Бюджет на месяц: ' + budgetMonth + 'руб.'); //Вычислить бюджет на месяц, вывести в консоль
console.log('Дневной бюджет: ' + butgetDay + 'руб.'); //Бюджет дневной в консоль.

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('"Период равен ' + period + ' месяцев"' + '\n"Цель заработать ' + mission + 'рублей"');
console.log(addExpenses.toLowerCase().split(', '));