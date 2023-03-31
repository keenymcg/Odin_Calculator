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

const container = document.querySelector('#calcContainer');
const divs = container.querySelectorAll('div');
divs.forEach(div => {
    div.classList.add('button');
});

const allButtons = document.querySelectorAll('.button');

allButtons.forEach(div => {
    div.addEventListener('click', () => {
        buttonClick(div);
        display();
        
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
        if (/[0-9]/.test(textContent) && num1.length <= 8) {
            // console.log('The number is between 1-9');
            num1 = num1.concat(textContent);
        } else if (/[.]/.test(textContent) && num1.indexOf('.') == -1) {
            num1 = num1.concat(textContent);
        } else if (textContent === /[/\+\-X]/) {
            operatorClick(textContent);
        } else if (textContent === "C") {
            clearAll();
        } 
}

function display() {
    let display = document.getElementById('display')
    display.textContent = num1
    if (num2 = '') {
        display.textContent = num1; 
    } else if (num2 != '') {
        display.textContent = num2;
    };
}

// START HERE: Question: How to make number inputs switch to fill num2 after the operator is clicked?
// 
function operatorClick(textContent) { 
    let result = 0;
    let operator = textContent;
    // maybe put all of this inside an "if num2 = '' don't do anything, BUT..."
    // ...if num2 != 0, do something
    // remember trying to put all this into a template literal, the create function to run equation?
    if (operator === '+') {
        result = parseFloat(num1) + parseFloat(num2);
    } else if (operator === '-') {
        result = parseFloat(num1) - parseFloat(num2);
    } else if (operator === '*') {
        result = parseFloat(num1) * parseFloat(num2);
    } else if (operator === '/') {
        result = parseFloat(num1) / parseFloat(num2);
    } else if (operator === '^') {
        result = parseFloat(num1) ** parseFloat(num2);
    };

    num1 = result
    num2 = "" // I think this will 

    return result //eventually, push this result to the display
};

// need a clearAll() to reset the calculator
// ideally clicking it once just resets the current variable, and twice resets everything
// if clearAll() is run when the display has text-content, clear the display? or go back to the prior result (num1)...
    // ...with a little message that says "previous input..."
// if num2 is an empty string, then num1 = '', and clear the operator variable? clear num2 var for good measure. 
function clearAll() {
    num1 = ''

}

// console.log(numClick("2"));