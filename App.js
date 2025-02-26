class BudgetPlanner {
    constructor() {
        this.transactions = this.loadTransactions();
        this.updateSummary();
        this.displayTransactions(); // Display stored transactions when the page loads
    }

    addTransaction(description, amount, category) {
        const transaction = {
            description,
            amount: parseFloat(amount),
            category,
            date: new Date()
        };
        this.transactions.push(transaction);
        this.saveTransactions();
        this.updateSummary();
        this.displayTransactions(); // Display transactions after adding a new one
    }

    editTransaction(index, description, amount) {
        this.transactions[index].description = description;
        this.transactions[index].amount = parseFloat(amount);
        this.saveTransactions();
        this.updateSummary();
        this.displayTransactions();
    }

    deleteTransaction(index) {
        this.transactions.splice(index, 1);
        this.saveTransactions();
        this.updateSummary();
        this.displayTransactions();
    }

    loadTransactions() {
        const transactions = localStorage.getItem('transactions');
        return transactions ? JSON.parse(transactions) : [];
    }

    saveTransactions() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }

    getTotalIncome() {
        return this.transactions
            .filter(transaction => transaction.category === 'income')
            .reduce((total, transaction) => total + transaction.amount, 0);
    }

    getTotalExpenses() {
        return this.transactions
            .filter(transaction => transaction.category !== 'income')
            .reduce((total, transaction) => total + transaction.amount, 0);
    }

    getBalance() {
        return this.getTotalIncome() - this.getTotalExpenses();
    }

    getCategoryBreakdown() {
        const breakdown = {};
        this.transactions.forEach(transaction => {
            if (!breakdown[transaction.category]) {
                breakdown[transaction.category] = 0;
            }
            breakdown[transaction.category] += transaction.amount;
        });
        return breakdown;
    }

    updateSummary() {
        document.getElementById('total-income').textContent = `$${this.getTotalIncome().toFixed(2)}`;
        document.getElementById('total-expenses').textContent = `$${this.getTotalExpenses().toFixed(2)}`;
        document.getElementById('balance').textContent = `$${this.getBalance().toFixed(2)}`;
    }

    displayTransactions() {
        const transactionList = document.getElementById('transaction-list');
        transactionList.innerHTML = '';
        this.transactions.forEach((transaction, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${transaction.description}: $${transaction.amount.toFixed(2)} (${transaction.category})</span>
                <button onclick="showEditForm(${index})">Edit</button>
                <button onclick="deleteTransaction(${index})">Delete</button>
            `;
            transactionList.appendChild(listItem);
        });
    }
}

const budgetPlanner = new BudgetPlanner();

document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    budgetPlanner.addTransaction(description, amount, category);
    this.reset();
});

function showEditForm(index) {
    const transaction = budgetPlanner.transactions[index];
    document.getElementById('edit-description').value = transaction.description;
    document.getElementById('edit-amount').value = transaction.amount;
    document.getElementById('edit-index').value = index;
    document.getElementById('edit-form-section').style.display = 'block';
}

document.getElementById('edit-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const index = document.getElementById('edit-index').value;
    const description = document.getElementById('edit-description').value;
    const amount = document.getElementById('edit-amount').value;
    budgetPlanner.editTransaction(index, description, amount);
    document.getElementById('edit-form-section').style.display = 'none';
});

function deleteTransaction(index) {
    if (confirm("Are you sure you want to delete this transaction?")) {
        budgetPlanner.deleteTransaction(index);
    }
}
