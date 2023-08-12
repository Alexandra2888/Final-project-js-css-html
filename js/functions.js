import { Calculator } from "./utils.js";
import {
  sin,
  cos,
  tan,
  pi,
  percentage,
  square,
  cube,
  nthRoot,
  binaryFactorial,
  naturalLog,
  commonLog,
} from "./helpers.js";

console.log(Calculator.operate("add", 2, 3));
console.log(Calculator.operate("multiply", 4, 5));

console.log(sin(1, 10));
console.log(cos(1, 10));
console.log(tan(45));
console.log(pi(10));
console.log(percentage(1000, 47.12));
console.log(square(3, 4));
console.log(cube(64));
console.log(nthRoot(64, 2));
console.log(binaryFactorial(5));
console.log(naturalLog(10));
console.log(commonLog(2, 8));