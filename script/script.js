"user strict";

const display = document.getElementById('displayCover');
const numbers = document.querySelectorAll('[id*=number]');
const operators = document.querySelectorAll('[id*=operators');


let newNumber = true;
let operator;
let previousNumber;

const updateDisplay = (text) => {
   if (newNumber) {
      display.textContent = text;
      newNumber = false;
   } else {
      display.textContent += text;
   } 
}

const insetNumber = (event) => updateDisplay(event.target.textContent);
numbers.forEach ( number => number.addEventListener('click', insetNumber));



const selectOperator = (event) => {
   updateDisplay(event.target.textContent);
   

   operator = event.target.textContent;
   previousNumber = display.textContent;
}
operators.forEach ( operator => operator.addEventListener('click', selectOperator));
