//  // Import the Calculator class from your file
//  import { Calculator } from "./utils.js"; // Adjust the import path



// // Import the provided advanced functions
// import {
//   advancedOperation
// } from "./helpers.js"; // Adjust the import path

// // Create an instance of the Calculator class
//  const calculator = new Calculator();

// const btnNumbers = document.querySelectorAll('.calculator__button--num');
// const btnOperations = document.querySelectorAll('.calculator__button--basic-op');
// const btnAdvancedOperations = document.querySelectorAll('.calculator__button--func');
// const equalsButton = document.querySelector('[data-equal]');
// const deleteButton = document.querySelector('[data-delete]');
// const allClearButton = document.querySelector('[data-all-clear]');
// const previousInput = document.querySelector('[data-previous-input]');
// const currentInput = document.querySelector('[data-current-input]');
// const degitAvailable =document.querySelector('[data-degit]');
// const history = document.querySelector('.history__group');

// let prevOperand = previousInput.innerText;
// let currentOperand = currentInput.value;
// let operation;
// let advancedOperator;

// let historyItems = [];
// const addedHistoryItems = new Set();// Keep track of added history items

// // Events handlers

// //reset
// const reset = () => {
//   prevOperand = "";
//   currentOperand = "";
//   operation = undefined;
//   advancedOperator = undefined;
//   degitAvailable.disabled = false;
// };

// //delete an input
// const deleteInput = () => {
//   currentOperand = currentOperand.toString().slice(0, -1);
//   if (currentOperand.toString().includes(".")){
//     return;
//   }else{
//     degitAvailable.disabled = false;
//   }
// };

// //add a number
// const addNumber = (number) => {
//   if (number==="." && currentOperand.toString().includes(".")){
//     degitAvailable.disabled = true;
//     return;
//   }
//   if (currentOperand.toString().includes(".")){
//     degitAvailable.disabled = true;
//     currentOperand = currentOperand.toString() + number.toString();
//   }else if (number==="." || !currentOperand.toString().includes(".")){
//     degitAvailable.disabled = false;
//     currentOperand = currentOperand.toString() + number.toString();
//   }else{
//     currentOperand = currentOperand.toString() + number.toString();
//   }
// };

// // select an operation
// const operationSelection = (operate) => {
//   if (currentOperand === "") return;
//   operation = operate;
//   prevOperand = currentOperand;
//   currentOperand = "";

//   //reset the degit button
//   degitAvailable.disabled = false;
// };

// // function to select an advanced operation
// const advancedOperationSelection = (operate) => {
//   if (currentInput === "") return;
//   advancedOperator = operate.toString();
//   prevOperand = currentOperand;
// };

// //function to implement basic calculation (addition, division ...) 
// const compute =(operate)=> {
//   let result;
//   let expression;
//   let prev = parseFloat(prevOperand);
//   let current = parseFloat(currentOperand);
//   console.log(prev);
//   console.log(current);
//   if (isNaN(prev) || isNaN(current)) return
//   /* if (current === 0 ){
//     previousInput.innerText="Cant devide by ZERO!";
//     currentOperand="";
//     operation = undefined;
//     //setTimeout(reset(), 1500);
//     return;
//   } */
//   expression = `${prev} ${operate} ${current}`
//   result=displayNumber(calculator.operate(operate,prev,current));
//   historyItems.push({expression,result})
//   currentOperand = result;
//   operation = undefined;
//   prevOperand = "";

// };


// // Function to handle degit number
// const displayNumber=(number)=> {
//   const stringNumber = number.toString();
//   const integerDigits = parseFloat(stringNumber.split('.')[0])
//   const decimalDigits = stringNumber.split('.')[1]
//   let integerDisplay;
//   if (isNaN(integerDigits)) {
//     integerDisplay = ''
//   } else {
//     integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
//   }
//   if (decimalDigits != null) {
//     const decimalDegitReduced = decimalDigits.slice(0,8);
//     return `${integerDisplay}.${decimalDegitReduced}`
//   } else {
//     return integerDisplay
//   }
// }

// // Function to update the result afetr each operation
// const updateDisplay=()=> {
//   currentInput.value =
//     displayNumber(currentOperand);

//   if (operation != null) {
//      previousInput.innerText =
//       `${displayNumber(prevOperand)} ${operation} ${displayNumber(currentOperand)} `;
//   } else {
//     previousInput.innerText = ''
//   }
// }

// // Function to handle advanced operations like(sin, cos ...)
// function handleAdvancedOperation(advancedOperator) {
//   let result;
//   let expression;
//   let prev = parseFloat(prevOperand);
//   let current = parseFloat(currentOperand);
//   if (isNaN(prev) && isNaN(current)) return
//   result=displayNumber(advancedOperation(advancedOperator,prev,current));
//   previousInput.textContent = `${advancedOperator} (${prev})`;
//   expression=previousInput.textContent ;
//   currentInput.value = displayNumber(result);
//   historyItems.push({expression,result});
//   advancedOperator=undefined; 
// }






// //Events listners 

// btnNumbers.forEach(button => {
//   button.addEventListener('click', () => {
//     addNumber(button.innerText);
//     updateDisplay();
//   })
// })

// btnOperations.forEach(button => {
//   button.addEventListener('click', () => {
//     operationSelection(button.innerText);
//     updateDisplay();
//   })
// })

// equalsButton.addEventListener('click', button => {
//   if (currentInput === "") return;
//     compute(operation);
//     updateDisplay();
//     updateHistory ();

// })

// allClearButton.addEventListener('click', button => {
//  reset();
//   updateDisplay();
// })

// deleteButton.addEventListener('click', button => {
//   deleteInput();
//   updateDisplay();
// })

// btnAdvancedOperations.forEach( button => {
//   button.addEventListener('click', () => {

//     advancedOperationSelection(button.innerText)
//     handleAdvancedOperation(button.innerText);
//     updateHistory ();
//     //updateDisplay();
//   })
// });

// // add event listener for keyboard support
// document.addEventListener("keydown", (event) => {
//   const key = event.key;
// console.log(key);
//   switch (key) {
//     case "Backspace":
//       deleteInput();
//       break;
//     case "+":
//     case "-":
//     case "*":
//     case "/":
//       operationSelection(key);
//       break;
//     case "Enter":
//       compute();
//       break;
//     case "Escape":
//       reset();
//       break;
//     default:
//       if (!isNaN(key) || key === ".") {
//         addNumber(key);
//       }
//       break;
//   }

//   updateDisplay();
// });
// utils.js

export class Calculator {
  add(a, b) {
    return parseFloat(a) + parseFloat(b);
  }

  subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
  }

  multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
  }

  divide(a, b) {
    if (parseFloat(b) === 0) {
      throw new Error("Cannot divide by zero");
    }
    return parseFloat(a) / parseFloat(b);
  }

  operate(operator, a, b) {
    switch (operator) {
      case "+":
        return this.add(a, b);
      case "-":
        return this.subtract(a, b);
      case "*":
        return this.multiply(a, b);
      case "/":
        return this.divide(a, b);
      default:
        throw new Error("Invalid operator");
    }
  }
}

function factorialRecursive(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorialRecursive(n - 1);
  }
}

function updateHistory() {
  console.log(historyItems)
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


function advancedOperation(operation, operand) {
  switch (operation) {
    case "sin":
      currentValue.value += "sin()"
      currentValue.setSelectionRange(currentValue.value.length - 1, currentValue.value.length - 1);
      currentValue.focus();
      return Math.sin(operand);
    case "cos":
      currentValue.value += "cos()"
      return Math.cos(operand);
    case "tan":
      currentValue.value += "tan()"
      return Math.tan(operand);
    case "π":
      currentValue.value += "π";
      return 2 * Math.PI * operand;
    case "%":
      currentValue.value += "%";
      return (operand / 100);
    case "sqr":
      currentValue.value += "²";
      return Math.sqrt(operand);

    case "n!":
      if (operand === 0) {
        currentValue.value += "!";
        return 1;
      } else {
        currentValue.value += "!";
        return operand * factorialRecursive("n!", operand - 1);
      }
    case "ln":/*natural log*/
      return Math.log(operand);
    case "log":
      return Math.log10(operand);
    default:
      throw new Error("Unsupported operation");
  }
}



// globals
let result = "";
let resultList = [];
let secondOperand = ""
const operands = ["-", "+", "*", "/", "="];

const currentValue = document.getElementById("active__value"); // string
const previousEq = document.getElementById("previous__eq"); // string
const btnNumbers = document.querySelectorAll('.calculator__button--num'); // get all numbers 
const btnFunctions = document.querySelectorAll(".calculator__button--func"); // get all functions buttons
const btnOperators = document.querySelectorAll(".calculator__button--basic-op") // target operators 
const allClearSelector = document.getElementById("all-clear");
const deleteBtnSelector = document.getElementById("delete__opt"); // string
const equalBtnSelector = document.getElementById("equal__opt"); // string
const floatingPointSelector = document.getElementById("floating__point"); // string
const history = document.querySelector('.history__group');
let historyItems = [];
const addedHistoryItems = new Set();// Keep track of added history items

let pointerPosition = currentValue.value.length;

// setup basic history 
let historyValues = [];
const calculator = new Calculator();

/* functions */

function updateDisplay(number) {
  // put number on current value and previousEq
  currentValue.value += number
  if (currentValue.value.includes(".")) {
    floatingPointSelector.disabled = true;
  }

  result += number
  validateCurrentInput(result)
}

function updateContent(newContent, newPosition) {
  content = newContent;
  pointerPosition = newPosition;

  // Update the user interface
  // ...
}

// Function to handle the delete button press


/* compute functiion (calculation) */

function compute() {
  console.log(processArray(resultList))
  const processedList = processArray(resultList);

  const resultCalc = calculator.operate(processedList[1], processedList[0], processedList[2])
  previousEq.innerText = resultCalc;
  result = `${resultCalc}${secondOperand}`
  currentValue.value = `${resultCalc}${secondOperand}`;
  let expression = `${processedList[0]} ${processedList[1]} ${processedList[2]}`
  historyItems.push({ expression, result })
  // if (isNaN(prev) || isNaN(current)) return
  /* if (current === 0 ){
    previousInput.innerText="Cant devide by ZERO!";
    currentOperand="";
    operation = undefined;
    //setTimeout(reset(), 1500);
    return;
  } */
  // result = displayNumber(calculator.operate(operate, prev, current));
  // historyItems.push({ expression, result })
  // currentOperand = result;
  // operation = undefined;
  // prevOperand = "";

}

// utils function 

function processArray(arr) {
  const result = [];

  for (const item of arr) {
    if (typeof item === 'string') {
      result.push(item);
    } else if (Array.isArray(item)) {
      result.push(item.join('')); // Concatenate array elements
    }
  }

  return result;
}



function validateCurrentInput(result) {

  let counter = 0;
  let indexOfFirstOperator;
  for (let i = 0; i < result.length; i++) {
    if (result[i] && i < 1) {
      continue
    }

    if (operands.includes(result[i])) {
      if (indexOfFirstOperator == null) {
        indexOfFirstOperator = i;
      }
      if (counter === 1) {
        const resultStringList = result.split("")
        let secondNumber = resultStringList.slice(indexOfFirstOperator + 1, resultStringList.length - 1);
        resultList = []
        resultList.push(resultStringList.splice(0, indexOfFirstOperator), result[indexOfFirstOperator], secondNumber)
      }
      counter++;
    }
    if (counter == 2) {
      secondOperand = result[i]
      compute();
      counter = 0
      break;
    }
  }
}


/* event listeners */

btnNumbers.forEach(button => {
  button.addEventListener('click', () => {

    updateDisplay(button.innerText)
  })
})

equalBtnSelector.addEventListener('click', () => {
  const resultValue = currentValue.value;
  for (let i = 0; i < operands.length; i++) {
    if (resultValue.includes(operands[i])) {
      const resultStringList = result.split("")
      const indexOfActiveOperator = resultValue.indexOf(operands[i]);
      let secondNumber = resultStringList.slice(indexOfActiveOperator + 1);
      resultList = []
      resultList.push(resultStringList.splice(0, indexOfActiveOperator), result[indexOfActiveOperator], secondNumber)
      compute();
      updateHistory();
      break;
    }
  }
})


btnOperators.forEach(button => {
  button.addEventListener('click', () => {
    /*   addNumber(button.innerText);
      updateDisplay(); */
    updateDisplay(button.innerText)
    console.log(button.innerText)
  })
})

btnFunctions.forEach(button => {
  button.addEventListener('click', () => {
    advancedOperation(button.textContent, currentValue.value)
  })
})

// Add delete button funcitonality 
deleteBtnSelector.addEventListener("click", () => {
  if (currentValue.value == null || currentValue.value.length === 0) {
    return;
  }

  if (currentValue.value.includes(".")) {
    floatingPointSelector.disabled = false;
  }
  resultList.slice(-1)
  result = currentValue.value.slice(0, -1)
  currentValue.value = result;
})


// Add all clear funcitonality 
allClearSelector.addEventListener("click", () => {
  // reset input value on calculator screen
  result = 0;
  currentValue.value = "";
  previousEq.innerText = ""
  resultList = [];
})

// add event listener for keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;
  console.log(key);
  switch (key) {
    case "Backspace":
      // deleteInput();
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      // operationSelection(key);

      break;
    case "Enter":
      // compute();

      break;
    case "Escape":

      // reset();
      break;
    default:

      /*      if (!isNaN(key) || key === ".") {
             addNumber(key);
           } */
      break;
  }

  /* updateDisplay(); */
});
