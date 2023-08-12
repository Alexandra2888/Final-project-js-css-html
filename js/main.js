 // Import the Calculator class from your file
 import { Calculator } from "./utils.js"; // Adjust the import path

// Import the provided advanced functions
import {
  advancedOperation
} from "./helpers.js"; // Adjust the import path

// Create an instance of the Calculator class
 const calculator = new Calculator();

const btnNumbers = document.querySelectorAll('.calculator__button--num');
const btnOperations = document.querySelectorAll('.calculator__button--basic-op');
const btnAdvancedOperations = document.querySelectorAll('.calculator__button--func');
const equalsButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousInput = document.querySelector('[data-previous-input]');
const currentInput = document.querySelector('[data-current-input]');
const degitAvailable =document.querySelector('[data-degit]');
const history = document.querySelector('.history__group');

let prevOperand = previousInput.innerText;
let currentOperand = currentInput.value;
let operation;
let advancedOperator;

let historyItems = [];
const addedHistoryItems = new Set();// Keep track of added history items

// Events handlers

//reset
const reset = () => {
  prevOperand = "";
  currentOperand = "";
  operation = undefined;
  advancedOperator = undefined;
  degitAvailable.disabled = false;
};

//delete an input
const deleteInput = () => {
  currentOperand = currentOperand.toString().slice(0, -1);
  if (currentOperand.toString().includes(".")){
    return;
  }else{
    degitAvailable.disabled = false;
  }
};

//add a number
const addNumber = (number) => {
  if (number==="." && currentOperand.toString().includes(".")){
    degitAvailable.disabled = true;
    return;
  }
  if (currentOperand.toString().includes(".")){
    degitAvailable.disabled = true;
    currentOperand = currentOperand.toString() + number.toString();
  }else if (number==="." || !currentOperand.toString().includes(".")){
    degitAvailable.disabled = false;
    currentOperand = currentOperand.toString() + number.toString();
  }else{
    currentOperand = currentOperand.toString() + number.toString();
  }
};

// select an operation
const operationSelection = (operate) => {
  if (currentOperand === "") return;
  operation = operate;
  prevOperand = currentOperand;
  currentOperand = "";

  //reset the degit button
  degitAvailable.disabled = false;
};

// function to select an advanced operation
const advancedOperationSelection = (operate) => {
  if (currentInput === "") return;
  advancedOperator = operate.toString();
  prevOperand = currentOperand;
};

//function to implement basic calculation (addition, division ...) 
const compute =(operate)=> {
  let result;
  let expression;
  let prev = parseFloat(prevOperand);
  let current = parseFloat(currentOperand);
  console.log(prev);
  console.log(current);
  if (isNaN(prev) || isNaN(current)) return
  /* if (current === 0 ){
    previousInput.innerText="Cant devide by ZERO!";
    currentOperand="";
    operation = undefined;
    //setTimeout(reset(), 1500);
    return;
  } */
  expression = `${prev} ${operate} ${current}`
  result=displayNumber(calculator.operate(operate,prev,current));
  historyItems.push({expression,result})
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
    const decimalDegitReduced = decimalDigits.slice(0,8);
    return `${integerDisplay}.${decimalDegitReduced}`
  } else {
    return integerDisplay
  }
}

// Function to update the result afetr each operation
const updateDisplay=()=> {
  currentInput.value =
    displayNumber(currentOperand);
   
  if (operation != null) {
     previousInput.innerText =
      `${displayNumber(prevOperand)} ${operation} ${displayNumber(currentOperand)} `;
  } else {
    previousInput.innerText = ''
  }
}

// Function to handle advanced operations like(sin, cos ...)
function handleAdvancedOperation(advancedOperator) {
  let result;
  let expression;
  let prev = parseFloat(prevOperand);
  let current = parseFloat(currentOperand);
  if (isNaN(prev) && isNaN(current)) return
  result=displayNumber(advancedOperation(advancedOperator,prev,current));
  previousInput.textContent = `${advancedOperator} (${prev})`;
  expression=previousInput.textContent ;
  currentInput.value = displayNumber(result);
  historyItems.push({expression,result});
  advancedOperator=undefined; 
}

//function to implement history computation and operations
function updateHistory() {
  historyItems.forEach(obj => {
    if (!addedHistoryItems.has(obj)) {
      const historyItem = document.createElement('div');
      historyItem.classList.add('history__option');

      const reuseButton = document.createElement('button');
      reuseButton.classList.add('history__reuse-option-btn');
      reuseButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="reuse__svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"></path>
        </svg>
      `;

      const historyOptionGroup = document.createElement('div');
      historyOptionGroup.classList.add('history__option--group');

      const historyOptionContent = document.createElement('div');
      historyOptionContent.classList.add('history__option--content');

      const historyOptionCalculation = document.createElement('p');
      historyOptionCalculation.classList.add('history__option--calc');
      historyOptionCalculation.textContent = obj.expression;

      const historyOptionResult = document.createElement('p');
      historyOptionResult.classList.add('history__option--result');
      historyOptionResult.textContent = obj.result;

      historyOptionContent.appendChild(historyOptionCalculation);
      historyOptionContent.appendChild(historyOptionResult);

      historyOptionGroup.appendChild(historyOptionContent);

      historyItem.appendChild(reuseButton);
      historyItem.appendChild(historyOptionGroup);

      history.appendChild(historyItem);
      
      addedHistoryItems.add(obj); // Add the item to the record
    }
  });
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
    compute(operation);
    updateDisplay();
    updateHistory ();

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
    
    advancedOperationSelection(button.innerText)
    handleAdvancedOperation(button.innerText);
    updateHistory ();
    //updateDisplay();
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