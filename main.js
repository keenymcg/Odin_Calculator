
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
        display(num2);
        
    });
});

// TODO: 
// floats don't cap at 9 spaces-- spills out of display box
// make num1 and num2 be rounded to the...
// well... if I tell it to round the decimal to 8 digits, will it add decimals to integers, making ugly like 81.000000?

function buttonClick(div) {
    let textContent = div.textContent;
//    equals(textContent);
    if (prevOperator === '') {
        if (/[0-9]/.test(textContent) && num1.length <= 8) {
            // console.log('The number is between 1-9');
            num1 = num1.concat(textContent);
        } else if (/[.]/.test(textContent) && num1.indexOf('.') == -1) {
            num1 = num1.concat(textContent);
        } else if (/[/\+\-X^]/.test(textContent)) {
            operatorClick(textContent);
        } else if (textContent === '~') { 
            num1 = num1 * -1;
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
        } else if (/[/\+\-X^=]/.test(textContent)) {
            operatorClick(textContent);
        } else if (textContent === '~') { 
            posNegNum2('~');
        } else if (textContent === "C") {
            clearAll();
        };
    };
    console.log(`this is num1: ${num1}`)
    console.log(`this is num2: ${num2}`);
};

/* function equals(equal) {
    if (equal === '=' && num2 != '') {
        num1 = num2;
    };
}; */

function posNegNum2(posNeg) {
    if (num2 === '' || num2 === 0) {
        num2 = '';
    } else if (num2 != '' || num2 != 0) {
        num2 = num2 * -1;
    };
};

function display(num2) {
    let display = document.getElementById('display')
    display.textContent = num1
    if (num2 === '') {
        display.textContent = num1; 
    } else if (num2 != '') {
        display.textContent = num2;
    };
};

let numsFilled = false
function checkNum1andNum2() {
    if (num1 != '' && num2 != '' || num1 === 0 && num2 != '') {
        return true;
    } else {
        return false;
    };
};

function operatorClick(operator) {
    let numsFilled = checkNum1andNum2();

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
    
    if (operator != '=') {
        prevOperator = operator
    };

    num1 = result;
    formatNumber(num1);
    num2 = '' 
    console.log(`this is the result: ${result}`);
};

// this isn't working -- other idea of I have is to slice the num1 at the decimal, count the number...
// ...then use toFixed to determine decimals at that point
function formatNumber(numToFormat) { // This formatNumber function I stole from ChatGPT...
    if (Number.isInteger(numToFormat)) {
        return;
    } else {
        const maxDigits = 9; // Maximum total number of digits in display
        const maxDecimals = maxDigits - numToFormat.toFixed(0).toString().length; // Maximum number of decimal places
        const roundedNum = numToFormat.toFixed(maxDecimals); // Round number to maximum number of decimal places
        num1 = roundedNum.toString(); // Return formatted number as string
    }
};

function clearAll() {
    console.log("You've run clearAll()")

    if (num1 != '' && num2 != '') {
        num2 = '';
    } else if ((num1 != '' && num2 === '') ||
    (num1 === 0 && num2 === '') || 
    (num1 === '' && num2 != '') ||
    (num1 === 0 && num2 != '')) {
        num1 = '';
        num2 = '';
        currentOperator = '';
        prevOperator = '';
    };
};