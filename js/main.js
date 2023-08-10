 // Import the Calculator class from your file
 import { Calculator } from "./utils.js"; // Adjust the import path

// Import the provided advanced functions
import {
  sin,
  cos,
  tan,
  pi,
  percentage,
  square,
  cube,
  nthRoot,
  binaryFactorial,
  naturalLog,
  commonLog,
} from "./helpers.js"; // Adjust the import path

// Create an instance of the Calculator class
 const calculator = new Calculator();

const btnNumbers = document.querySelectorAll('.calculator__number')
const btnOperations = document.querySelectorAll('.calculator__operator')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousInput = document.querySelector('[data-previous-input]')
const currentInput = document.querySelector('[data-current-input]');
const btnFactorial = document.querySelector('[data-fact]');

let prevOperand = previousInput.innerText;
let currentOperand = currentInput.innerText;
let operation;

// Events handlers

//reset
const reset = () => {
  prevOperand = "";
  currentOperand = "";
  operation = undefined;
};

//delete an input
const deleteInput = () => {
  currentOperand = currentOperand.toString().slice(0, -1);
};

//add a number
const addNumber = (number) => {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
};

// select an operation
const operationSelection = (operate) => {
  if (currentInput === "") return;
  if (previousInput !== "") {
    compute(operate);
  }
  operation = operate;
  prevOperand = currentOperand;
  currentOperand = "";
};

//function to implement calculation
const compute =(operate)=> {
  let result;
  let prev = parseFloat(prevOperand);
  let current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return
  result=calculator.operate(operate,prev,current);
  currentOperand = result;
  operation = undefined;
  prevOperand = "";
};

const displayNumber=(number)=> {
  const stringNumber = number.toString()
  const integerDigits = parseFloat(stringNumber.split('.')[0])
  const decimalDigits = stringNumber.split('.')[1]
  let integerDisplay;
  if (isNaN(integerDigits)) {
    integerDisplay = ''
  } else {
    integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`
  } else {
    return integerDisplay
  }
}

const updateDisplay=()=> {
  currentInput.innerText =
    displayNumber(currentOperand)
  if (operation != null) {
    previousInput.innerText =
      `${displayNumber(prevOperand)} ${operation}`
  } else {
    previousInput.innerText = ''
  }
}

//Events listners 

btnNumbers.forEach(button => {
  button.addEventListener('click', () => {
    console.log(button.innerText);
    addNumber(button.innerText);
    updateDisplay();
  })
})

btnOperations.forEach(button => {
  button.addEventListener('click', () => {
    console.log(button.innerText);
    operationSelection(button.innerText);
    updateDisplay();
  })
})

equalsButton.addEventListener('click', button => {
  console.log(button.innerText);
  compute(operation);
  updateDisplay();
})

allClearButton.addEventListener('click', button => {
 reset();
  updateDisplay();
})

deleteButton.addEventListener('click', button => {
  deleteInput();
  updateDisplay();
})

btnFactorial.addEventListener('click', button => {
  currentOperand =binaryFactorial(parseFloat(currentOperand));
  updateDisplay();
})