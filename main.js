/*  JS TODO

~~ number function
event listener: a click concatenates a num (as a string) to a variable
- variable can only be 9 digits long
--- therefore it checks for the num1 string-length. If it === 9, don't concatenate

OPERATOR FUNCTION (using * as example) - DONE?
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
let num3 = 1
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
        display();
    
    });
});

function numClick(value) { // might need to store this function inside the num1 and num2 parsefloat parameters
    if (currentOperator == '' && num1.length < 9) {
        num1 = num1.concat(value);
        return num1;
    } else if (currentOperator != "" && num2.length < 9) {
        num2 = num2.concat(value);
        return num2;
    };
};

/* 
num1
for every div in the #calcContainer, add the class "button"
EVENTLISTENER for any button click
if the value/text-content of the click isn't 0-9 or "." or "C", and num1 = "", do nothing
if it's "C", run the reset function
if num1.length = 9, continue (aka break, do nothing)
if button is a number 1-9, and num1 = empty string, concat to num1
if button 
*/


function buttonClick(div) {
    let textContent = div.textContent;
        if (/[0-9]/.test(textContent) && num1.length <= 8) {
            // console.log('The number is between 1-9');
            num1 = num1.concat(textContent);
        } else if (/[.]/.test(textContent) && num1.indexOf('.') == -1) {
            num1 = num1.concat(textContent);
        } else if (textContent === "C") {
            clearAll(); // why is this being run if I click decimal more than once or get past 9 chars?
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


// JAVASCRIPT

function operatorClick(operator) { //change this to a click-activated function
    let result = 0;
    currentOperator = operator

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