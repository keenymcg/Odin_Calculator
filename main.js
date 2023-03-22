/*  JS TODO

create functions for all the operators

each time a num-op-num combination is clicked, it stores that answer in a variable, which updates on the display
thereafter (in same function?), each time an operator is pressed, it uses the previously calculated variable

maybe push all click-events to an array, 
For loop (where # of iterations is based on length of array) 

When = is clicked, join all elements of the array, run the calculation 


specific functions for if its clicked; a number or an operator

~~ number function
event listener: a click concatenates a num (as a string) to a variable
- variable can only be 9 digits long
--- therefore it checks for the num1 string-length. If it === 9, don't concatenate

when an operator is pressed, the operator is stored in an array? thinking we use a template literal to pull from the array?

a new num variable is created (num2) which will be used after


if a number is clicked, check to see if the var that holds operator is blank. If so, num1 variable is activated.
Clicks and subsequent number-clicks are concatenated to the num1 variable
Send that variable to the screen? (or store in a "display" variable that constantly gets updated and pushed to the screen)

on subsequent number click-events, it checks if there's an operator stored, and if so...
...num2 is created, and number-clicks are stored/concat-ed to that num2 var

OPERATOR FUNCTION (using * as example)
clicks on the operator should act as an equal sign at first (for the first two numbers), so that num1 is the accumulator
in the first click-event, it'll return a num1 times an empty num2
- if num1 * num2 != number, don't do anything
Then num2 is clicked, and still nothing visibly happens except: 
- checks to see if there's a value in the operator variable, and...
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





let result;
let num1 = 1
let num2 = 2
let temp = 0

function testFunc(operator) {
    if (operator === '+') {
        result = num1 + num2;
        num1 = result
    } else if (operator === '-') {
        result = num1 - num2;
    } else if (operator === '*') {
        result = num1 * num2;
    } else if (operator === '/') {
        result = num1 / num2;
    }
    console.log(result);
}

/*  HTML TODO



*/