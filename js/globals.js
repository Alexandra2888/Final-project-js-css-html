class AppState {
  constructor() {
    this.result = "";
    this.resultList = [];
    this.secondOperand = "";
    this.operands = ["-", "+", "*", "/"];
    this.historyItems = [];
    this.addedHistoryItems = new Set();
    this.errorData = {
      status: false,
      errorMessage: ""
    }
  }

  // result 
  setResult(value) {
    this.result = value;
  }

  // result List
  setResultList(value) {
    this.resultList = value;
  }

  // second operand
  setSecondOperand(value) {
    this.secondOperand = value;
  }

  // history items
  setHistoryItems(value) {
    this.historyItems = value;
  }

  // addedHistoryItems
  setAddedHistoryItems(value) {
    this.addedHistoryItems = value;
  }

  // error handling set
  setError() {
    this.errorData = {
      status: true,
      errorMessage: "Syntax Error"
    }
  }

  // error handling remove
  removeErorr() {
    this.errorData = {
      status: false,
      errorMessage: ""
    }
  }
}


// export as singleton
const appState = new AppState();
export { appState }