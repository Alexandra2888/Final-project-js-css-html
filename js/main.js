 // Import the Calculator class from your file
 import { Calculator } from "./utils.js"; // Adjust the import path

// Import the provided advanced functions
import {
  advancedOperation
} from "./helpers.js"; // Adjust the import path

// Create an instance of the Calculator class
 const calculator = new Calculator();

const btnNumbers = document.querySelectorAll('.calculator__number');
const btnOperations = document.querySelectorAll('.calculator__operator');
const btnAdvancedOperations = document.querySelectorAll('.calculator__function');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousInput = document.querySelector('[data-previous-input]');
const currentInput = document.querySelector('[data-current-input]');
const degitAvailable =document.querySelector('.degit');

let prevOperand = previousInput.innerText;
let currentOperand = currentInput.innerText;
let operation;
let advancedOperator;


// Events handlers

//reset
const reset = () => {
  prevOperand = "";
  currentOperand = "";
  operation = undefined;
  advancedOperator = undefined;
};

//delete an input
const deleteInput = () => {
  currentOperand = currentOperand.toString().slice(0, -1);
  if (currentOperand.toString().includes(".")){
    return;
  }else{
    document.querySelector('.degit').disabled = false;
  }
};

//add a number
const addNumber = (number) => {
  if (currentOperand.toString().includes(".")){
    degitAvailable.disabled = true;
    currentOperand = currentOperand.toString() + number.toString();
  }else if (number==="." || !currentOperand.toString().includes(".")){
    degitAvailable.disabled = false;
    currentOperand = currentOperand.toString() + number.toString();
  } 
 //currentOperand = currentOperand.toString() + number.toString();
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
  degitAvailable.disabled = false;
};

// function to select an advanced operation
const advancedOperationSelection = (operate) => {
  if (currentInput === "") return;
  advancedOperator = operate.toString();
  prevOperand = currentOperand;
  currentOperand = "";
};

//function to implement basic calculation (addition, division ...) 
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


// Function to handle degit number
const displayNumber=(number)=> {
  const stringNumber = number.toString();
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

// Function to update the result afetr each operation
const updateDisplay=()=> {
  currentInput.innerText =
    displayNumber(currentOperand);
   
  if (operation != null) {
     previousInput.innerText =
      `${displayNumber(prevOperand)} ${operation} `;
  } else {
    previousInput.innerText = ''
  }
}

// Function to handle advanced operations like(sin, cos ...)
function handleAdvancedOperation(advancedOperator) {
  let result;
  let prev = parseFloat(prevOperand);
  let current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return
  result=advancedOperation(advancedOperator,prev,current);
  previousInput.textContent = `${advancedOperator}(${prev},${current})`;
  currentInput.textContent = result; 
}


//Events listners 

btnNumbers.forEach(button => {
  button.addEventListener('click', () => {
    addNumber(button.innerText);
    updateDisplay();
  })
})

btnOperations.forEach(button => {
  button.addEventListener('click', () => {
    operationSelection(button.innerText);
    updateDisplay();
  })
})

equalsButton.addEventListener('click', button => {
  if (currentInput === "") return;
  if (operation){
    compute(operation);
    updateDisplay();
  } else if (advancedOperator) {
    handleAdvancedOperation(advancedOperator,prevOperand,currentOperand);
  }
})

allClearButton.addEventListener('click', button => {
 reset();
  updateDisplay();
})

deleteButton.addEventListener('click', button => {
  deleteInput();
  updateDisplay();
})

btnAdvancedOperations.forEach( button => {
  button.addEventListener('click', () => {
    advancedOperationSelection(button.innerText);
    updateDisplay();
  })
});

// add event listener for keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;
console.log(key);
  switch (key) {
    case "Backspace":
      deleteInput();
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      operationSelection(key);
      break;
    case "Enter":
      compute();
      break;
    case "Escape":
      reset();
      break;
    default:
      if (!isNaN(key) || key === ".") {
        addNumber(key);
      }
      break;
  }

  updateDisplay();
});