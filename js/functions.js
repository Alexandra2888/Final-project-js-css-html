//basic
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

//advanced

//sin

function sin(a, b) {
  return Math.sin(a) * b;
}

console.log(sin(1, 10));
//expected: 8.414709848078965

//cos

function cos(a, b) {
  return Math.cos(a) * b;
}

console.log(cos(1, 10));
//expected: 5.403023058681398

//tangens

function tan(a) {
  return Math.tan((a * Math.PI) / 180);
}

console.log(tan(45));
//expected : 0

console.log(tan(45));
//expected:  0.9999999999999999

//pi

function pi(a) {
  return 2 * Math.PI * a;
}
console.log(pi(10));
//expected: 62.83185307179586

//%

function percentage(a, per) {
  return (a / 100) * per;
}
console.log(percentage(1000, 47.12));
//expected: 471.2

//square root
function square(a, b) {
  return Math.sqrt(a * a + b * b);
}
console.log(square(3, 4));
//expected: 5

//cube root

function cube(a) {
  return Math.cbrt(a);
}
console.log(cube(64));
//expected: 4

//xth root

function nthRoot(a, n) {
  ng = a % 2;
  if (ng == 1 || a < 0) a = -a;
  var r = Math.pow(a, 1 / n);
  n = Math.pow(r, n);

  if (Math.abs(a - n) < 1 && a > 0 === n > 0) return ng ? -r : r;
}
console.log(nthRoot(64, 2));
//expected: 8

//binary factorial

function binaryFactorial(a) {
  if (a === 0) {
    return 1;
  } else {
    return a * binaryFactorial(a - 1);
  }
}

console.log(binaryFactorial(5));
//expected: 120

//functions for converting decimal-octal
function decToBin(a) { return Number(a).toString(2) } // MAIN conversion
function decToOct(a) { return Number(a).toString(8) } // MAIN conversion


function binToDec(a) { return parseInt(String(a), 2) } // MAIN conversion
function binToOct(a) { return decToOct(binToDec(a)) }


function octToDec(a) { return parseInt(String(a), 8) } // MAIN conversion
function octToBin(a) { return decToBin(octToDec(a)) }





//natural log
function naturalLog(a) {
  return Math.log(a);
}
console.log(naturalLog(10));
//expected: 2.302585092994046


//common log

function commonLog(a, b) {
  return Math.log(b) / Math.log(a);
  }
  console.log(commonLog(2, 8));
  //expected: 3


export { operate };
