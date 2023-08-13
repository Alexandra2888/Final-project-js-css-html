import { appState } from "./globals.js";
import { formatExpression, limitFloatingPoint, processArray, removeLeadingZeros } from "./helpers.js";
import { currentValue, floatingPointSelector, history, previousEq } from "./selectors.js"
import { calculator } from "./utils.js";

export function disableIfError() {
  if (appState.errorData.status || currentValue.value.length === 0) {
    clearAll();
  }
}

export function updateDisplay(number) {
  if (number === "0" && currentValue.value === "0") {
    // Prevent multiple consecutive zeros
    return;
  }

  // put number on current value and previousEq
  currentValue.value += removeLeadingZeros(limitFloatingPoint(number))
  if (currentValue.value.includes(",")) {
    floatingPointSelector.disabled = true;
  }

  appState.result += limitFloatingPoint(number)
  validateCurrentInput(appState.result)
}

export function compute() {
  const processedList = processArray(appState.resultList);

  const previousFirstNum = parseFloat(processedList[0])
  const previousSecondNum = parseFloat(processedList[2])

  if ((isNaN(previousFirstNum) || previousFirstNum == 0) || (isNaN(previousSecondNum) || previousSecondNum == 0)) {
    appState.setError();
    if (appState.errorData.status) {
      currentValue.value = appState.errorData.errorMessage
      return;
    }
  } else {
    disableIfError();
  }

  const resultCalc = calculator.operate(processedList[1], processedList[0], processedList[2])
  previousEq.innerText = limitFloatingPoint(resultCalc);
  appState.setResult(`${limitFloatingPoint(resultCalc)}${appState.secondOperand}`)
  currentValue.value = `${limitFloatingPoint(resultCalc)}${appState.secondOperand}`;
  let expression = `${processedList[0]} ${processedList[1]} ${processedList[2]}`

  appState.historyItems.push({ expression, result: limitFloatingPoint(resultCalc) })
}

export function validateCurrentInput(result) {
  let counter = 0;
  let indexOfFirstOperator;
  let lastOperatorChar = ""
  for (let i = 0; i < result.length; i++) {
    if (result[i] && i < 1) {
      continue
    }
    if (appState.operands.includes(result[i])) {
      if (indexOfFirstOperator == null) {
        indexOfFirstOperator = i;
      }

      if (counter === 1) {
        const resultStringList = result.split("")
        let secondNumber = resultStringList.slice(indexOfFirstOperator + 1, resultStringList.length - 1);

        // reinitialize the empty string 
        appState.setResultList([])

        if (secondNumber.length > 0) {
          appState.resultList.push(resultStringList.splice(0, indexOfFirstOperator), appState.result[indexOfFirstOperator], secondNumber)
        } else {
          // check if user tries to change current sign 
          appState.resultList.push(resultStringList.splice(0, indexOfFirstOperator), appState.result[indexOfFirstOperator])
          lastOperatorChar = resultStringList[resultStringList.length - 1]
        }
      }
      counter++;
    }

    if (counter == 2) {
      if (appState.operands.includes(lastOperatorChar)) {
        appState.resultList.slice(0, -2);
        const firstOperand = appState.resultList.slice(0, -1);
        appState.setResultList([...firstOperand, lastOperatorChar]);
        currentValue.value = formatExpression(appState.resultList);
        appState.setResult(currentValue.value); // reset the new result 
        counter--; // reduce counter to add mulitple signs change 
        continue;
      } else {
        appState.setSecondOperand(appState.result[1])
        compute();
        updateHistory();
        counter = 0
        break;
      }
    }
  }
}

export function updateHistory() {
  appState.historyItems.forEach(obj => {
    if (!appState.addedHistoryItems.has(obj)) {
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

      appState.addedHistoryItems.add(obj); // Add the item to the record
    }
  });
}

export function deletePrevious() {
  // TODO: OBJECT ERROR FROM STRING INTO OBJECT 
  if (currentValue.value == null) {
    disableIfError();
    return;
  }
  if (!currentValue.value.slice(0, -1).includes(",")) {
    floatingPointSelector.disabled = false;
  }
  appState.setResultList(appState.resultList.slice(-1));
  appState.setResult(currentValue.value.slice(0, -1))
  currentValue.value = appState.result;
}


// Reinitialize calculator screen
export function clearAll() {
  appState.setResult("");
  currentValue.value = "";
  previousEq.innerText = ""
  appState.removeErorr();
  appState.setResultList([]);
  floatingPointSelector.disabled = false;
}


export function equalAction() {
  const resultValue = currentValue.value;
  for (let i = 0; i < appState.operands.length; i++) {
    if (resultValue.includes(appState.operands[i])) {
      if (appState.operands[i] == "-" && i < 1) continue; // skip first itteration in case minus is the first sign in calculation 
      const resultStringList = appState.result.split("")
      const indexOfActiveOperator = resultValue.indexOf(appState.operands[i]);
      let secondNumber = resultStringList.slice(indexOfActiveOperator + 1);
      appState.setResultList([])
      appState.resultList.push(resultStringList.splice(0, indexOfActiveOperator), appState.result[indexOfActiveOperator], secondNumber)
      compute();
      updateHistory();
      break;
    }
  }
}