const incomeList = document.getElementById('income_list');
const expenseList = document.getElementById('expense_list');
const incomeForm = document.getElementById('income_form');
const expenseForm = document.getElementById('expense_form');
const totalText = document.getElementById('total_text');
const incomeTotalText = document.getElementById('income_total');
const expenseTotalText = document.getElementById('expense_total');
const resetBtn = document.getElementById('resetBtn');
const listItem = document.getElementsByClassName('listItem');
let incomeArray = [];

let expenseArray = [];

function budgetObject(name, amount, arrayName) {
    this.name = name,
    this.amount = amount
    this.arrayName = arrayName;
}

function incomeTab() {
    document.getElementById('income_form').style.display = 'flex';
    document.getElementById('expense_form').style.display = 'none';
}

function expenseTab() {
    document.getElementById('expense_form').style.display = 'flex';
    document.getElementById('income_form').style.display = 'none';
}

function sortArrayDescend(arr) {
    let newArray;
    newArray = arr.reverse(arr.sort((a, b) => {
        return a.amount - b.amount;
    }));
    return newArray;
}

function sortArrayAscend(arr) {
    let newArray;
    newArray = arr.reverse(arr.sort((a, b) => {
        return a.amount + b.amount;
    }));
    return newArray;
}

class Budget {
    total = 0;
    expenseTotal = 0;
    incomeTotal = 0;
    
    addToIncomeArray() {
            let nameIncome = document.getElementById('name_income').value;
            let incomeAmt = document.getElementById('income').value;
            if(incomeAmt == "") {
                return;
            } else {
                const newIncome = new budgetObject(nameIncome, parseFloat(incomeAmt), 'incomeArray');
                incomeArray.push(newIncome);
                this.total += parseFloat(incomeAmt);
                this.incomeTotal += parseFloat(incomeAmt);
                incomeTotalText.innerHTML = `$${this.incomeTotal}`;
                sortArrayDescend(incomeArray);
            }
        }

    addToExpenseArray() {
            let nameExpense = document.getElementById('name_expense').value;
            let expenseAmt = document.getElementById('expense').value;
            if(expenseAmt == "") {
                return;
            } else {
                const newExpense = new budgetObject(nameExpense, parseFloat(expenseAmt) * -1, 'expenseArray');
                expenseArray.push(newExpense);
                this.total = this.total - parseFloat(expenseAmt);
                this.expenseTotal -= parseFloat(expenseAmt);
                expenseTotalText.innerHTML = `-$${(this.expenseTotal * -1)}`;
                sortArrayAscend(expenseArray)
            }
        }
    
    createItem(budgetObject, list, array) {
        const newItem = document.createElement('li');
        newItem.addEventListener('click', () => {
            if(budgetObject.arrayName === "incomeArray") {
                this.total -= budgetObject.amount;
                this.incomeTotal -= budgetObject.amount;
                incomeTotalText.innerHTML = `$${this.incomeTotal}`;
            } else {
                this.total -= budgetObject.amount;
                this.expenseTotal -= (budgetObject.amount);
                expenseTotalText.innerHTML = `$${this.expenseTotal}`;
                console.log(this.total)
            }
            newItem.remove();
            const index = array.map(e => e.name).indexOf(budgetObject.name);
            array.splice(index, 1);
            this.updateTotal();
        })
        if(budgetObject.amount < 0) {
            newItem.innerHTML = `${budgetObject.name}: -$${budgetObject.amount * (-1)}     `;
        } else {
            newItem.innerHTML = `${budgetObject.name}: $${budgetObject.amount}     `;
        }
        list.appendChild(newItem);
    }

    updateTotal() {
        if(this.total > 0) {
            totalText.innerHTML = `Total Budget: $${this.total}`;
            totalText.style.color = "rgb(102, 229, 102)";
        } else if(this.total == 0) {
            totalText.innerHTML = `Total Budget: $${this.total}`;
            totalText.style.color = "white";
        } else {
            var newTotal = this.total;
            newTotal *= -1;
            totalText.innerHTML = `Total Budget: -$${newTotal}`;
            totalText.style.color = "rgb(228, 139, 139)";
        }
    }

    resetBudget() {
        incomeList.innerHTML = "";
        expenseList.innerHTML = "";
        incomeTotalText.innerHTML = "$0";
        expenseTotalText.innerHTML = "-$0";
        totalText.innerHTML = "$0";
        totalText.style.color = "white";
        incomeArray = [];
        expenseArray = [];
        this.total = 0;
        this.incomeTotal = 0;
        this.expenseTotal = 0;
    }
}
const budget = new Budget();

incomeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    incomeList.innerHTML = "";
    budget.addToIncomeArray();
    budget.updateTotal();
    incomeArray.forEach((currentElement) => {
        budget.createItem(currentElement, incomeList, incomeArray);
    })
    incomeForm.reset();
})

resetBtn.addEventListener('click', () => {
    budget.resetBudget();
    budget.updateTotal();
})

expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    expenseList.innerHTML = "";
    budget.addToExpenseArray();
    budget.updateTotal();
    expenseArray.forEach((currentElement) => {
        budget.createItem(currentElement, expenseList, expenseArray);
    })
    expenseForm.reset();
})