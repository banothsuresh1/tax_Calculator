const form = document.getElementById('taxCalculatorForm');
const errorIcons = document.getElementById('errorIcons');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const ageInput = document.getElementById('age');
    const grossIncomeInput = document.getElementById('grossIncome');
    const extraIncomeInput = document.getElementById('extraIncome');
    const deductionsInput = document.getElementById('deductions');

    const age = parseInt(ageInput.value);
    const grossIncome = parseFloat(grossIncomeInput.value);
    const extraIncome = parseFloat(extraIncomeInput.value);
    const deductions = parseFloat(deductionsInput.value);

    if (isNaN(age) || isNaN(grossIncome) || isNaN(extraIncome) || isNaN(deductions)) {
        showErrorIcon('All fields must be numbers');
    } else {
        hideErrorIcon();
        const tax = calculateTax(age, grossIncome, extraIncome, deductions);
        displayTaxResult(tax);
    }
});

function calculateTax(age, grossIncome, extraIncome, deductions) {
    const taxableIncome = grossIncome + extraIncome - deductions;
    let tax = 0;

    if (taxableIncome > 800000) {
        if (age < 40) {
            tax = 0.3 * (taxableIncome - 800000);
        } else if (age >= 40 && age < 60) {
            tax = 0.4 * (taxableIncome - 800000);
        } else {
            tax = 0.1 * (taxableIncome - 800000);
        }
    }

    return tax;
}

function displayTaxResult(tax) {
    const resultContainer = document.getElementById('taxResult');
    resultContainer.textContent = `Your tax amount is: ${tax.toFixed(2)} Lakhs`;
}

function showErrorIcon(message) {
    const errorIcon = document.createElement('div');
    errorIcon.textContent = message;
    errorIcons.appendChild(errorIcon);
}

function hideErrorIcon() {
    errorIcons.innerHTML = '';
}
