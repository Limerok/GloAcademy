let money = 60000; //“Доход за месяц”
let income = 40000;//строка с дополнительными доходом (например: фриланс)
let addExpenses = 'Интернет, Такси, Коммуналка, Бензин, Отдых';//строка с перечислением дополнительных расходов
//через запятую (например: интернет, такси, коммуналка)
let deposit = true;//любое булево значение
let mission = 9000000;//любое число (Какую сумму хотите накопить)
let period = 6;//число от 1 до 12 (месяцев)

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('"Период равен ' + period + ' месяцев"' + '\n"Цель заработать ' + mission + 'рублей"');
console.log(addExpenses.toLowerCase().split(', '));

let butgetDay = money / 30;//дневной бюджет

console.log(butgetDay);