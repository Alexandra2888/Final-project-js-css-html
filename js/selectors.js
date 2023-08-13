//element selectors
export const currentValue = document.getElementById("active__value"); // string
export const previousEq = document.getElementById("previous__eq"); // string
export const btnNumbers = document.querySelectorAll('.calculator__button--num'); // get all numbers 
export const btnFunctions = document.querySelectorAll(".calculator__button--func"); // get all functions buttons
export const btnOperators = document.querySelectorAll(".calculator__button--basic-op") // target operators 
export const allClearSelector = document.getElementById("all-clear");
export const deleteBtnSelector = document.getElementById("delete__opt"); // string
export const equalBtnSelector = document.getElementById("equal__opt"); // string
export const history = document.querySelector('.history__group');
export const calculatorScreen = document.querySelector(".calculator__screen-calc"); // used for focus elem
export const floatingPointSelector = document.querySelector(".calculator__button--point"); // string