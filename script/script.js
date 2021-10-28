"user strict";

const display = document.getElementById('displayCover');
const output = document.getElementById('output');
const numbers = document.querySelectorAll('[id*=number]');
const operators = document.querySelectorAll('[id*=operators');


let newNumber = true;
let operator;
let previousNumber;


const pendingOperation = () => operator !== undefined;

const calculate = () => {
    if (pendingOperation()){
        const currentNumber = parseFloat(display.textContent.replace(',','.'));
        newNumber = true;
        const result = eval (`${previousNumber}${operator}${currentNumber}`);
        updateDisplay(result);
    }
}

const updateDisplay = (text) => {
   if (newNumber){
       display.textContent = text.toLocaleString('BR');
       newNumber = false;
   }else{
       display.textContent += text.toLocaleString('BR');
   }
}

const insertNumber = (event) => updateDisplay(event.target.textContent);
numbers.forEach ( number => number.addEventListener('click', insertNumber));


const selectOperator = (event) => {
   if (!newNumber) {
       calculate();
       newNumber = true;
       operator = event.target.textContent;
       previousNumber = parseFloat(display.textContent.replace(',','.'));
   }
}

operators.forEach (operator => operator.addEventListener('click', selectOperator));


const activateEqual = () => {
    calculate();
    operator = undefined;
}

document.getElementById('equal').addEventListener('click', activateEqual);

const clearDisplay = () => display.textContent = '';

document.getElementById('clearDisplay').addEventListener('click', clearDisplay);

const removeLastNumber = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removeLastNumber);

const reverseSign = () => {
    newNumber = true
    updateDisplay (display.textContent * -1);
}
document.getElementById('plusMinus').addEventListener('click', reverseSign);


const thereIsDecimal = () => display.textContent.indexOf(',') !== -1;
const thereIsValue = () => display.textContent.length > 0;
const insertDecimal = () => {
    if (!thereIsDecimal()){
        if (thereIsValue()){
            updateDisplay(',');
        }else{
            updateDisplay('0,');
        }
    }
}
document.getElementById('dot').addEventListener('click', insertDecimal);


const keyboardMap = {
    '0'         : 'number0',
    '1'         : 'number1',
    '2'         : 'number2',
    '3'         : 'number3',
    '4'         : 'number4',
    '5'         : 'number5',
    '6'         : 'number6',
    '7'         : 'number7',
    '8'         : 'number8',
    '9'         : 'number9',
    '/'         : 'operatorsDivision',
    '*'         : 'operatorsMultiplication',
    '-'         : 'operatorsMinus',
    '+'         : 'operatorsPlus',
    '='         : 'equal',
    'Enter'     : 'equal',
    'Backspace' : 'backspace',
    'c'         : 'clearDisplay',
    ','         : 'dot'
}

const mapKeyboard = (event) => {
    const key = event.key;
    const allowedKey = () => Object.keys(keyboardMap).indexOf(key) !== -1;
    if (allowedKey())  document.getElementById(keyboardMap[key]).click();
}
document.addEventListener('keydown', mapKeyboard);