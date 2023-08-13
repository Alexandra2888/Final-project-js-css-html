import {
  currentValue,
  btnNumbers,
  btnFunctions,
  btnOperators,
  allClearSelector,
  deleteBtnSelector,
  equalBtnSelector,
  floatingPointSelector,
  calculatorScreen
} from "./selectors.js"
import {
  clearAll,
  equalAction,
  deletePrevious,
  disableIfError,
  updateDisplay,
  validateCurrentInput
} from "./functions.js"
import { appState } from "./globals.js";

// prevent event simultaneous calls 
document.addEventListener("load", () => {
  clearAll();
  calculatorScreen.focus(); // set focus on input when user loads the page 
});

btnOperators.forEach(button => {
  button.addEventListener('click', () => {
    disableIfError()
    updateDisplay(button.innerText)
  })
})

btnNumbers.forEach(button => {
  button.addEventListener('click', () => {
    disableIfError()
    if (button.textContent !== ",") {
      updateDisplay(button.innerText)
    }
  })
})

floatingPointSelector.addEventListener("click", () => {
  updateDisplay(",")
  floatingPointSelector.disabled = true; // disable floating point for preventing multiple dots encounter
})

equalBtnSelector.addEventListener('click', equalAction)

btnFunctions.forEach(button => {
  button.addEventListener('click', () => {
    updateDisplay(currentValue.value)
  })
})

// backspace button listener
deleteBtnSelector.addEventListener("click", deletePrevious)

// all clear button listener
allClearSelector.addEventListener("click", clearAll);

// add event listener for keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (appState.errorData.status) {
    disableIfError();
  }
  event.preventDefault(); // prevent multiple event firing
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
      updateDisplay(key)
      break;
    case "Backspace":
      deletePrevious();
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      updateDisplay(key)
      validateCurrentInput(currentValue.value)
      break;
    case "Enter":
      equalBtnSelector.focus(); // set focus on active element 
      equalAction();
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