
let num1 = ''
let num2 = ''
let prevNum1 = ''
let currentOperator = ''

const container = document.querySelector('#calcContainer');
const divs = container.querySelectorAll('div');
divs.forEach(div => {
    div.classList.add('button');
});

const allButtons = document.querySelectorAll('.button');

allButtons.forEach(div => {
    div.addEventListener('click', () => {
        buttonClick(div);
        // console.log(div.textContent);
        display(num2);
        
    });
});

function buttonClick(div) {
    let textContent = div.textContent;
    if (currentOperator === '') {
        if (/[0-9]/.test(textContent) && num1.length <= 8) {
            // console.log('The number is between 1-9');
            num1 = num1.concat(textContent);
        } else if (/[.]/.test(textContent) && num1.indexOf('.') == -1) {
            num1 = num1.concat(textContent);
        } else if (/[/\+\-X]/.test(textContent)) {
            operatorClick(textContent);
        } else if (textContent === "C") {
            clearAll();
        };
    };
    if (currentOperator != '')  {
        if (/[0-9]/.test(textContent) && num2.length <= 8) {
            // console.log('The number is between 1-9');
            num2 = num2.concat(textContent);
        } else if (/[.]/.test(textContent) && num2.indexOf('.') == -1) {
            num2 = num2.concat(textContent);
        } else if (/[/\+\-X]/.test(textContent)) {
            operatorClick(textContent);
        } else if (textContent === "C") {
            clearAll();
        };
    };
    console.log(`this is num1: ${num1}`)
    console.log(`this is num2: ${num2}`);
};

function display(num2) {
    let display = document.getElementById('display')
    display.textContent = num1
    if (num2 === '') {
        display.textContent = num1; 
    } else if (num2 != '') {
        display.textContent = num2;
    };
}

let numsFilled = false
function checkNum1andNum2() {
    if (num1 != '' && num2 != '') {
        return true;
    } else {
        return false;
    };
};

function operatorClick(operator) { //TODO: Can't figure out why the conditionals are being bypassed. Check your ChatGPT convo
    let numsFilled = checkNum1andNum2();
    console.log(numsFilled);
    let result = num1;
    if (numsFilled = false) {
        result = num1;
    } else if (numsFilled && operator === '+') {
        result = parseFloat(num1) + parseFloat(num2);
    } else if (numsFilled === true && operator === '-') {
        result = parseFloat(num1) - parseFloat(num2);
    } else if (numsFilled === true && operator === '*') {
        result = parseFloat(num1) * parseFloat(num2);
    } else if (numsFilled === true && operator === '/') {
        result = parseFloat(num1) / parseFloat(num2);
    } else if (numsFilled === true && operator === '^') {
        result = parseFloat(num1) ** parseFloat(num2);
    };

    currentOperator = operator;
    console.log(currentOperator);
    num1 = result
    num2 = '' 
    console.log(`this is the result: ${result}`);
};

function clearAll() {
    // let display = document.getElementById('display')
    if (num1 != '' && num2 != '') {
        num2 = '';
    } else if (num1 != '' && num2 === '') {
        num1 = '';
        num2 = '';
        currentOperator = '';
    };
};