
let num1 = ''
let num2 = ''
let postEquals = ''
let prevNum1 = ''
let currentOperator = ''
let prevOperator = ''
let equalsHit = false;

// TODO: Float won't turn +/-, but after hitting clearAll one time it does

const container = document.querySelector('#calcContainer');
const divs = container.querySelectorAll('div');
divs.forEach(div => {
    div.classList.add('button');
    if (/[1-9]/.test(div.textContent)) {
        div.classList.add('numButton')
    }
});


const allButtons = document.querySelectorAll('.button');

allButtons.forEach(div => {
    div.addEventListener('click', () => {
        buttonClick(div);
        display();
    });
});

function buttonClick(div) {
    let textContent = div.textContent;

    if (prevOperator === '') {
        if (/[0-9]/.test(textContent) && num1.length <= 8) {
            postEquals = '';
            num1 = num1.concat(textContent);
        } else if (/[.]/.test(textContent) && num1.indexOf('.') == -1) {
            num1 = num1.concat(textContent);
        } else if (/[/\+\-X^]/.test(textContent)) {
            operatorClick(textContent);
        } else if (textContent === '~') { 
            if (postEquals === '') {
                num1 = num1 * -1;
            } else if (postEquals != '') {
                postEquals = postEquals * -1;
            };
        } else if (textContent === 'C') {
            clearAll();
        } // maybe add an '=' event response that makes the display flicker when num2 isn't filled, indicating it needs more info;
    };
    if (prevOperator != '')  {
        if (/[0-9]/.test(textContent) && num2.length <= 8) {
            num2 = num2.concat(textContent);
        } else if (/[.]/.test(textContent) && num2.indexOf('.') == -1) {
            num2 = num2.concat(textContent);
        } else if (/[/\+\-X^=]/.test(textContent)) {
            operatorClick(textContent);
        } else if (textContent === '~') { 
            posNegNum2();
        } else if (textContent === "C") {
            clearAll();
        };
    };
    console.log(`this is num1: ${num1}`)
    console.log(`this is num2: ${num2}`);
};

function posNegNum2() {
    if (num2 === '' || num2 === 0) {
        num2 = '';
    } else if (num2 != '' || num2 != 0) {
        num2 = num2 * -1;
    };
};

function display() {
    let display = document.getElementById('display')
    display.textContent = num1
    if (num2 === '' && num1 != '') {
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
    if (operator != '=') {
        equalsHit === false;
        runEquation(); 
        prevOperator = operator
    };

    if (operator === '=') {
        equalsHit === true;
        runEquals();
    };

    if (num1 === '' && 
        num2 === '' && 
        postEquals != '' &&
        operator != '=') {
            num1 = postEquals;
            postEquals = ''
            prevOperator = operator;
    }
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
    };
    num1 = '';
    num2 = '';
    prevOperator = '';
    postEquals = parseFloat(result);
    formatNumber(postEquals);
};

function runEquation() {
    let numsFilled = checkNum1andNum2();

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
    num1 = result;
    formatNumber(num1);
    num2 = '' 
};

function formatNumber(numToFormat) {
    if (Number.isInteger(numToFormat) && numToFormat.toString().length < 9) {
        return;
    } else if (Number.isInteger(numToFormat) && numToFormat.toString().length > 9) {
        clearAll();
        clearAll();
        postEquals = "too long 🥵"
    } else {
        let numAsString = numToFormat.toString()
        let poopyArray = []
        poopyArray = numAsString.split('.')
        let beforeDec = poopyArray[0].length;
        if (numAsString.length <= 9) {
            if (equalsHit === false) {
                num1 = numToFormat;
            } else if (equalsHit === true) {
                postEquals === numToFormat;
            }
        } else if (numAsString.length > 9 && beforeDec < 9) {
            if (equalsHit === false) {
                num1 = numToFormat.toFixed(8 - beforeDec);
            } else if (equalsHit === true) {
                postEquals === numToFormat.toFixed(8 - beforeDec);
            }
        } else if (beforeDec >= 9) {
            clearAll();
            clearAll();
            postEquals = "too long 🥵"
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
    } else if (num1 === '' && num2 === '') {
        postEquals = '';
    }
};