
let num1 = ''
let num2 = ''
let postEquals = ''
let prevNum1 = ''
let currentOperator = ''
let prevOperator = ''

// TODO: Hitting equals ("=") needs to retain number displayed on screen, but subsequent 
// button presses needs to refill num1, meaning num1 must be empty

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
    } else if (num2 === '' && num1 === '' && postEquals != '') {
        display.textContent = postEquals;
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
    } else if (numsFilled === true && operator === '=') {
        runEquals();
    } else if (numsFilled === false) {
        result = num1;
    };
    
    if (operator != '=') { // TODO: do I even need this statement?
        prevOperator = operator
    };

    num1 = result;
    formatNumber(num1);
    num2 = '' 
    console.log(`this is the result: ${result}`);
};

function runEquals() {
    if (prevOperator === '+') {
        result = parseFloat(num1) + parseFloat(num2);
    } else if (prevOperator === '-') {
        result = parseFloat(num1) - parseFloat(num2);
    } else if (prevOperator === 'X') {
        result = parseFloat(num1) * parseFloat(num2);
    } else if (prevOperator === '/') {
        result = parseFloat(num1) / parseFloat(num2);
    } else if (prevOperator === '^') {
        result = parseFloat(num1) ** parseFloat(num2);
    }
    postEquals = result;
    num1 = '';
    num2 = '';
    prevOperator = '';
}

function formatNumber(numToFormat) {
    if (Number.isInteger(numToFormat) && numToFormat.toString().length < 9) {
        return;
    } else if (Number.isInteger(numToFormat) && numToFormat.toString().length > 9) {
        num1 = "too long 🥵"
    } else {
        let numAsString = numToFormat.toString()
        let poopyArray = []
        poopyArray = numAsString.split('.')
        let beforeDec = poopyArray[0].length;
        if (numAsString.length <= 9) {
            num1 = numToFormat;
        } else if (numAsString.length > 9 && beforeDec < 9) {
            num1 = numToFormat.toFixed(8 - beforeDec);
            console.log(`This is num1 after format: ${num1}`);
        } else if (beforeDec >= 9) {
            num1 = "too long 🥵"
        };
    };
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