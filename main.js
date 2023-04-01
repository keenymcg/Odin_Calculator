/*  JS TODO

OPERATOR FUNCTION (using * as example) - DONE? NO
clicks on the operator should act as an equal sign at first (for the first two numbers), so that num1 is the accumulator
in the first click-event, it'll return a num1 times an empty num2
- if num1 * num2 != number, don't do anything
Then num2 is clicked, and still nothing visibly happens except: 
- IN SEPARATE FUNC? checks to see if there's a value in the operator variable, and...
- ...if there is, num2 is wiped to empty string
- then the new number is concatenated to the newly-empty num2 variable (don't forget max of 9 digits/chars)
then assume the operator is clicked again
it performs the equation, now with num2 having a number
sends that number to the screen
stores the result in num1
on subsequent number click-events, it checks if there's an operator stored, and if so...
...num2 is populated with the new number, and number-clicks are stored/concat-ed to that num2 var
And then that just repeats
*/



let num1 = ''
let num2 = ''
let temp = 0
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

/* function numClick(value) { // might need to store this function inside the num1 and num2 parsefloat parameters
    if (currentOperator == '' && num1.length < 9) {
        num1 = num1.concat(value);
        return num1;
    } else if (currentOperator != "" && num2.length < 9) {
        num2 = num2.concat(value);
        return num2;
    };
}; */

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
    if (num2 = '') {
        display.textContent = num1; 
    } else if (num2 != '') {
        display.textContent = num2;
    };
}

let numsFilled = false
function checkNum1andNum2() {
    if (num1 != '' && num2 != '') {
        numsFilled = true;
    };
};

function operatorClick(operator) {
    checkNum1andNum2();
    let result = num1;
    if (numsFilled = false) {
        result = num1;
    } else if (numsFilled === true && operator === '+') {
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
}
    // maybe put all of this inside an "if num2 = '' don't do anything, BUT..."
    // ...if num2 != 0, do something
    // remember trying to put all this into a template literal, the create function to run equation?


// need a clearAll() to reset the calculator
// ideally clicking it once just resets the current variable, and twice resets everything
// if clearAll() is run when the display has text-content, clear the display? or go back to the prior result (num1)...
    // ...with a little message that says "previous input..."
// if num2 is an empty string, then num1 = '', and clear the operator variable? clear num2 var for good measure. 
function clearAll() {
    let display = document.getElementById('display')
    if (display.textContent != '') {
        num1 = ''; // TODO: this needs to become the previous input; like bring it back to the old num1 so they don't lose progress
    } else if (display.textContent === '') {
        num1 = '';
        num2 = '';
        currentOperator = '';
    };
};

// console.log(numClick("2"));