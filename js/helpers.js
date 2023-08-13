// prepare array for screen display
export function processArray(arr) {
  const resultArr = [];

  for (const item of arr) {
    if (typeof item === 'string') {
      resultArr.push(item);
    } else if (Array.isArray(item)) {
      resultArr.push(item.join('')); // Concatenate array elements
    }
  }
  return resultArr;
}

// prevent multiple floating points 
export function limitFloatingPoint(inputNumber) {
  const numString = inputNumber.toString();
  const indexOfDecimal = numString.indexOf('.');

  if (indexOfDecimal === -1) {
    return inputNumber;
  }
  const digitsAfterDecimal = numString.length - indexOfDecimal - 1;

  if (digitsAfterDecimal > 4) {
    return parseFloat(inputNumber.toFixed(4)); // limit number to 4 digits
  } else {
    return inputNumber;
  }
}

// format list while two opperators ecounter
export function formatExpression(expressionList) {
  const operands = expressionList[0];
  const operator = expressionList[1];
  return operands.join("") + operator;
}

// remove leading zeros except if it's the only digit
export function removeLeadingZeros(input) {
  return input.replace(/^0+(?=\d)/, '');
}