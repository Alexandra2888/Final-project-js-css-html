// globals
let result = "";
let resultList = [];
let secondOperand = ""
const operands = ["-", "+", "*", "/"];
const currentValue = document.getElementById("active__value"); // string
const previousEq = document.getElementById("previous__eq"); // string
const btnNumbers = document.querySelectorAll('.calculator__button--num'); // get all numbers 
const btnFunctions = document.querySelectorAll(".calculator__button--func"); // get all functions buttons
const btnOperators = document.querySelectorAll(".calculator__button--basic-op") // target operators 
const allClearSelector = document.getElementById("all-clear");
const deleteBtnSelector = document.getElementById("delete__opt"); // string
const equalBtnSelector = document.getElementById("equal__opt"); // string
const history = document.querySelector('.history__group');

const floatingPointSelector = document.querySelector(".calculator__button--point"); // string
let historyItems = [];
const addedHistoryItems = new Set();// Keep track of added history items
export class Calculator {
  constructor() {
    this.syntaxErrorActive = false;
  }
  add(a, b) {
    return parseFloat(a) + parseFloat(b);
  }

  subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
  }

  multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
  }

  toggleSyntaxError(status = false) {
    if (status) {
      currentValue.value = "Syntax error"
      this.syntaxErrorActive = true
      return;
    }
    this.syntaxErrorActive = false;
  }

  divide(a, b) {
    if (parseFloat(b) === 0) {
      clearAll();
      this.toggleSyntaxError(true);
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
const calculator = new Calculator();

/* functions */

function updateDisplay(number) {
  // put number on current value and previousEq
  currentValue.value += limitFloatingPoint(number)
  if (currentValue.value.includes(",")) {
    floatingPointSelector.disabled = true;
  }

  result += limitFloatingPoint(number)
  validateCurrentInput(result)
}

/* compute function (calculation) */

function compute() {
  const processedList = processArray(resultList);

  const previousFirstNum = parseFloat(processedList[0])
  const previousSecondNum = parseFloat(processedList[2])

  if (isNaN(previousFirstNum) || isNaN(previousSecondNum) || currentValue.value.includes("Syntax Error")) {
    currentValue.value = "Syntax Error"
    return;
  } else {
    disableIfError();
  }

  const resultCalc = calculator.operate(processedList[1], processedList[0], processedList[2])
  previousEq.innerText = limitFloatingPoint(resultCalc);
  result = `${limitFloatingPoint(resultCalc)}${secondOperand}`
  currentValue.value = `${limitFloatingPoint(resultCalc)}${secondOperand}`;
  let expression = `${processedList[0]} ${processedList[1]} ${processedList[2]}`

  historyItems.push({ expression, result: limitFloatingPoint(resultCalc) })
}

// utils function 

// prevent event simultaneous calls 

document.addEventListener("load", clearAll);

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
      compute(true);
      updateHistory();
      counter = 0
      break;
    }
  }
}

function updateHistory() {
  historyItems.forEach(obj => {
    if (!addedHistoryItems.has(obj)) {
      const historyItem = document.createElement('div');
      historyItem.classList.add('history__option');

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

      historyItem.appendChild(historyOptionGroup);

      history.appendChild(historyItem);

      addedHistoryItems.add(obj); // Add the item to the record
    }
  });
}

/* event listeners */

function limitFloatingPoint(inputNumber) {

  const numString = inputNumber.toString();
  const indexOfDecimal = numString.indexOf('.');

  if (indexOfDecimal === -1) {
    return inputNumber; // No decimal point, return the original number
  }

  const digitsAfterDecimal = numString.length - indexOfDecimal - 1;

  if (digitsAfterDecimal > 4) {
    return parseFloat(inputNumber.toFixed(4));
  } else {
    return inputNumber;
  }
}

btnOperators.forEach(button => {
  button.addEventListener('click', () => {
    updateDisplay(button.innerText)
  })
})

btnNumbers.forEach(button => {
  button.addEventListener('click', () => {
    calculator.toggleSyntaxError(false);
    if (button.textContent !== ",") {
      updateDisplay(button.innerText)
    }
  })
})

floatingPointSelector.addEventListener("click", () => {
  updateDisplay(",")
  floatingPointSelector.disabled = true;
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

btnFunctions.forEach(button => {
  button.addEventListener('click', () => {
    advancedOperation(button.textContent, currentValue.value)
  })
})

function deletePrevious() {
  if (currentValue.value == null || currentValue.value.length === 0 || currentValue.value.includes("Syntax Error")) {
    disableIfError();
    return;
  }

  if (!currentValue.value.slice(0, -1).includes(",")) {
    floatingPointSelector.disabled = false;
  }
  resultList.slice(-1)
  result = currentValue.value.slice(0, -1)
  currentValue.value = result;
}

// Add delete button funcitonality 
deleteBtnSelector.addEventListener("click", deletePrevious)

function clearAll() {
  result = "";
  currentValue.value = "";
  previousEq.innerText = ""
  resultList = [];
  floatingPointSelector.disabled = false;
}

// Add all clear funcitonality 
allClearSelector.addEventListener("click", clearAll);

function disableIfError() {
  if (currentValue.value.includes("Syntax Error")) {
    clearAll();
  }
}

// add event listener for keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;
  calculator.toggleSyntaxError(false);
  switch (key) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
      disableIfError();
      updateDisplay(event.key)
      break;
    case "Backspace":
      deletePrevious();
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      disableIfError();
      updateDisplay(event.key)
      validateCurrentInput(currentValue.value)
      break;
    case "Enter":
      // set focus on active element 
      equalBtnSelector.focus();
      compute();
      updateHistory();
      break;
    case "Escape":
      allClearSelector.focus();
      clearAll();
      break;
    default:
      event.preventDefault()
      // button not supported
      break;
  }
});
