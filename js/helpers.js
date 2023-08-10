function advancedOperation(operation,...operands) {
  switch (operation) {
    case "sin":
      return Math.sin(operands[0]) * operands[1];
    case "cos":
      return Math.cos(operands[0]) *operands[1];
    case "tan":
      return Math.tan((operands[0] * Math.PI) / 180);
    case "pi":
      return 2 * Math.PI * operands[0];
    case "%":
      return (operands[0] / 100) * operands[1];
    case "sqr":
      return Math.sqrt(operands[0] * operands[0] + operands[1] * operands[1]);
    case "cube":
      return Math.cbrt(operands[0]);
    case "nthRoot":
      const ng = operands[0] % 2;
      if (ng == 1 || operands[0] < 0) operands[0] = -operands[0];
      const r = Math.pow(operands[0], 1 / operands[1]);
      operands[1] = Math.pow(r, operands[1]);
  
      if (Math.abs(operands[0] - operands[1]) < 1 && operands[0] > 0 === operands[1] > 0)
        return ng ? -r : r;
    case "factorial":
      if (operands[0] === 0) {
        return 1;
      } else {
        return operands[0] * performOperation("factorial", operands[0] - 1);
      }
    case "logn":
      return Math.log(operands[0]);
    case "log10":
      return Math.log(operands[1]) / Math.log(operands[0]);
    default:
      throw new Error("Unsupported operation");
  }
}

export { advancedOperation };
