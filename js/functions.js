
function add(a, b) {
    return a + b;
  }
  
  function subtract(a, b) {
    return a - b;
  }
  
  function multiply(a, b) {
    return a * b;
  }
  
  function divide(a, b) {
    if (b === 0) {
      return "Error: Cannot divide by zero";
    }
    return a / b;
  }
  
  function operate(operator, a, b) {
    switch (operator) {
      case "add":
        return add(a, b);
      case "subtract":
        return subtract(a, b);
      case "multiply":
        return multiply(a, b);
      case "divide":
        return divide(a, b);
      default:
        return "Error: Invalid operator";
    }
  }
  
  export { operate };
  