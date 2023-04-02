
let num1 = ''
let num2 = ''
let prevNum1 = ''
let currentOperator = ''
let prevOperator = ''

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

function buttonClick(div) { //TODO: Why does operator function double-click each first time an operator is clicked
    let textContent = div.textContent;
    if (prevOperator === '') {
        if (/[0-9]/.test(textContent) && num1.length <= 8) {
            // console.log('The number is between 1-9');
            num1 = num1.concat(textContent);
        } else if (/[.]/.test(textContent) && num1.indexOf('.') == -1) {
            num1 = num1.concat(textContent);
        } else if (/[/\+\-X]/.test(textContent)) {
            operatorClick(textContent);
        } else if (textContent === 'C') {
            clearAll();
        } // maybe add an '=' event response that makes the display flicker when num2 isn't filled, indicating it needs more info;
    };
    if (prevOperator != '')  {
        if (/[0-9]/.test(textContent) && num2.length <= 8) {
            // console.log('The number is between 1-9');
            num2 = num2.concat(textContent);
        } else if (/[.]/.test(textContent) && num2.indexOf('.') == -1) {
            num2 = num2.concat(textContent);
        } else if (/[/\+\-X=]/.test(textContent)) {
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
    if (num1 != '' && num2 != '' || num1 === 0 && num2 != '') {
        return true;
    } else {
        return false;
    };
};

// FIXING OPERATOR FUNCTION
// when the operator is clicked, currentOperator = the click
// if the prevOperator is '' do nothing
// ... if the preOperator is +-/X, run the equation according to that operator
// 

function operatorClick(operator) {
    let numsFilled = checkNum1andNum2();

    // console.log(typeof operator);
    console.log(numsFilled);
    // console.log(parseFloat(num1));

    let result = num1;
    if (numsFilled === true && prevOperator === '+') {
        result = parseFloat(num1) + parseFloat(num2);
    } else if (numsFilled === true && prevOperator === '-') {
        result = parseFloat(num1) - parseFloat(num2);
    } else if (numsFilled === true && prevOperator === 'X') {
        result = parseFloat(num1) * parseFloat(num2);
    } else if (numsFilled === true && prevOperator === '/') {
        result = parseFloat(num1) / parseFloat(num2);
    } else if (numsFilled === true && prevOperator === '^') {
        result = parseFloat(num1) ** parseFloat(num2);
    } else if (numsFilled === false) {
        result = num1;
    };
    prevOperator = operator
    num1 = result
    num2 = '' 
    console.log(`this is the result: ${result}`);
};

function clearAll() {
    console.log("You've run clearAll()")
    // let display = document.getElementById('display')
    if (num1 != '' && num2 != '') {
        num2 = '';
    } else if (num1 != '' && num2 === '') {
        num1 = '';
        num2 = '';
        currentOperator = '';
        prevOperator = '';
    } else if (num1 === 0 && num2 === '') {
        num1 = '';
        num2 = '';
        currentOperator = '';
        prevOperator = '';
    } else if (num1 === '' && num2 != '') {
        num1 = '';
        num2 = '';
        currentOperator = '';
        prevOperator = '';
    } else if (num1 === 0 && num2 != '') {
        num1 = 0;
        num2 = '';
        currentOperator = '';
        prevOperator = '';
    }
};