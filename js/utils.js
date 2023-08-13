import { clearAll } from "./functions.js";
import { currentValue } from "./selectors.js";
import { appState } from "./globals.js"

class Calculator {
  constructor(currentValue, clearAll, errorData) {
    this.errorData = errorData;
    this.clearAll = clearAll;
    this.currentValue = currentValue;
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



  divide(a, b) {
    if (parseFloat(b) === 0) {
      this.clearAll();
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

// export as singleton
const calculator = new Calculator(currentValue.value, clearAll);
export { calculator }