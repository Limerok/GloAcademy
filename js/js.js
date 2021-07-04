
'use strict';

/* const isNamber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n); 
}; */

// Получение элементов
const buttonStart = document.getElementById('start'), // кнопка расчитать
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
inputAdditionalIncome = document.querySelectorAll('.additional_income-item');//возможный доход 
//Дополнительные доходы
let incomeItems = document.querySelectorAll('.income-items');
const incomeTitle = document.querySelectorAll('.income-title'),
incomeAmount = document.querySelectorAll('.income-amount');
//Обязательные расходы
let expensesItems = document.querySelectorAll('.expenses-items');
const expensesTitle = document.querySelectorAll('.expenses-title'),
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

class AppData {
    constructor() {
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
    }
    check() {
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
    start() {
        this.budget = +inputSalaryAmount.value; //Доход за месяц из инпута
        inputSalaryAmount.disabled = true;
        depositCheckbox.disabled = true;
    
        buttonStart.style.display = 'none';
        buttonCancel.style.display = 'block';
    
        buttonIncomeAdd.style.display = 'none';
        buttonExpensesAdd.style.display = 'none';
    
        this.getExpInc();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getTargetMonth();
        this.getInfoDeposit();
        this.getBudget();
        this.getAddIncExp();
        this.showResult();

       
    
    }
    showResult() { //Выводим результаты
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
    }
    addExpIncBlock (expInc, event) {
        const buttonNone = event.target;
        const cloneItem = expInc[0].cloneNode(true);
        let startStr = cloneItem.className.split('-')[0];
        cloneItem.querySelector(`.${startStr}-title`).value = '';
        cloneItem.querySelector(`.${startStr}-amount`).value = '';
        expInc[0].parentNode.insertBefore(cloneItem, buttonNone);

        expInc = document.querySelectorAll(`.${startStr}-items`);
        if (expInc.length === 3) {
            buttonNone.style.display = 'none';
        }

        this.checkingInputs();
    }
    getExpInc () {
        let incomeItems = document.querySelectorAll('.income-items');
        let expensesItems = document.querySelectorAll('.expenses-items');
        const count = (item) => {
            const startStr = item.className.split('-')[0];
            let itemTitle = item.querySelector(`.${startStr}-title`);//Доп.доход наимен
            let itemAmount = item.querySelector(`.${startStr}-amount`);//до.доход сумма

            itemTitle.disabled = true;
            itemAmount.disabled = true;
    
            itemTitle = itemTitle.value;//Доп.доход наимен
            itemAmount = itemAmount.value;//до.доход сумма
    
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = +itemAmount;// записываем в объект
            }
            
        };
        incomeItems.forEach(count);
        expensesItems.forEach(count);
    }
    getAddIncExp () {
        inputAdditionalExpenses.disabled = true;
        const addExpenses = inputAdditionalExpenses.value.toLowerCase().split(',');
    
        const count = (item) => {
            if (item.className === 'additional_income-item') {
                const itemValue = item.value.trim();//Убираем пробелы
                if (itemValue !== '') {// Если не пустой
                    this.addIncome.push(itemValue);//Записываем в массив
                }
            } else {
                item = item.trim();//Убираем пробелы
                if (item !== ''){// Если не пустой
                    this.addExpenses.push(item);//Записываем в массив
                }
            }
        };

        addExpenses.forEach(count);
        inputAdditionalIncome.forEach(count);
    }
    getExpensesMonth() { //Сумма обязательных раходов
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    }
    getIncomeMonth () {
        for (let key in this.income) {
            this.incomeMohth += this.income[key];
        }
    }
    getBudget() { 
        const monthDeposit = Math.floor(this.moneyDeposit * (this.percentDeposit / 100));
        this.budgetMonth = this.budget + this.incomeMohth - this.expensesMonth + monthDeposit;//Накопления за месяц (Доходы минус расходы)
        this.budgetDay = Math.floor(this.budgetMonth / 30); // Бюджет на день
    }
    getTargetMonth() {
        inputMission.disabled = true;
        return inputMission.value / this.budgetMonth;
    }
    getPeriodAmount() {
        const periodAmount = document.querySelector('.period-amount');
        periodAmount.textContent = inputPeriod.value;
    }
    calcSavedMoney() { //Накопления за период(месяцев)
        return this.budgetMonth * inputPeriod.value;
    }
    reset() {
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
        let expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach(function(item, i) {
            const itemExpenses = item.querySelector('.expenses-title');//Обяз.расх наимен
            const cashExpenses = item.querySelector('.expenses-amount');//Обяз.расх сумма
    
            if (i > 0) {
                item.remove();
            }
    
            itemExpenses.disabled = false;
            itemExpenses.value = '';
            cashExpenses.disabled = false;
            cashExpenses.value = '';
        });
        let incomeItems = document.querySelectorAll('.income-items');
        incomeItems.forEach(function(item, i) {//Проходим коллекцию ДопДохода
            const itemIncome = item.querySelector('.income-title');//Доп.доход наимен
            const cashIncome = item.querySelector('.income-amount');//до.доход сумма
            
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
        depositSelectBank.value = '';
        depositCalcPercent.style.display = 'none';
        depositCalcPercent.value = '';
        depositCalcAmount.value = '';
        depositSelectBank.style.display = 'none';
        depositCalcAmount.style.display = 'none';

        inputPeriod.value = 1;
        alertResultPeriod.textContent = '1';
        buttonIncomeAdd.style.display = 'block';
        buttonExpensesAdd.style.display = 'block';
    }
    checkingInputs() {
        const input = document.querySelectorAll('input');
    
        input.forEach(function(item) {
            const placeholder = item.getAttribute('placeholder');
            if (placeholder === 'Сумма') {
                item.addEventListener('input', function() {
                    item.value = item.value.replace(/[^0-9]/g, '');
    
                });
            }
            if (placeholder === 'Наименование') {
                item.addEventListener('input', function() {
                    item.value = item.value.replace(/[^а-я ,]/gi, '');
                });
            } if (placeholder === 'название'){
                item.addEventListener('input', function() {
                    item.value = item.value.replace(/[^а-я ,]/gi, '');
                });
            }
            if (placeholder === 'Процент') {
                item.addEventListener('input', function() {
                    item.value = item.value.replace();
                    if (item.value > 100) {
                        alert('Введите корректное значение %');
                        item.value = '';
                    }
                });
            }
        });
    }
    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositCalcPercent.value;
            this.moneyDeposit = depositCalcAmount.value;
            
        }
    }
    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositCalcPercent.style.display = 'inline-block';
        } else {
            depositCalcPercent.value = valueSelect;
            depositCalcPercent.style.display = 'none';
            depositCalcPercent.value = '';
        }
    }
    depositHandler() {
        this.checkingInputs();
        if (depositCheckbox.checked) {
            depositSelectBank.style.display = 'inline-block';
            depositCalcAmount.style.display = 'inline-block';
            this.deposit = true;
            depositSelectBank.addEventListener('change', this.changePercent);
        } else {
            depositSelectBank.style.display = 'none';
            depositCalcAmount.style.display = 'none';
            depositSelectBank.value = '';
            depositCalcAmount.value = '';
            this.deposit = false;
            depositSelectBank.removeEventListener('change', this.changePercent);
        }
    }
    eventListener() {
        this.check();
        this.checkingInputs();
        buttonStart.addEventListener('click', this.start.bind(this));
        buttonCancel.addEventListener('click', this.reset.bind(this));
        buttonIncomeAdd.addEventListener('click', () => {this.addExpIncBlock(incomeItems, event);});
        buttonExpensesAdd.addEventListener('click', () => {this.addExpIncBlock(expensesItems, event);});
        inputPeriod.addEventListener('input', this.getPeriodAmount);
        depositCheckbox.addEventListener('change', this.depositHandler.bind(this));
    
    }
}



const appData = new AppData ();
appData.eventListener();

/* let arr = [];
let i = 0;
for (let item of appData.addExpenses) {
    arr[i] = item[0].toUpperCase() + item.slice(1);
    i++;
} */



