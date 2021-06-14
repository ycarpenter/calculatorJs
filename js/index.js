class Calculator {
  constructor(operandPrevious, operandCurrent) {
    this.operandPrevious = operandPrevious;
    this.operandCurrent = operandCurrent;
    this.clear();
  }

  clear() {
    this.operandCur = '';
    this.operandPr = '';
    this.operation = undefined;
  }

  delete() {
    this.operandCur = this.operandCur.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === "." && this.operandCur.includes(".")) return;
    this.operandCur = this.operandCur.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.operandCur === '') return;
    if (this.operandPr !== '') {
      this.compute();
    }
    this.operation = operation;
    this.operandPr = this.operandCur;
    this.operandCur = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.operandPr);
    const current = parseFloat(this.operandCur);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '÷':
        computation = prev / current;
        break;
      case 'x':
        computation = prev * current;
        break;
      default:
        return;
    }
    this.operandCur = computation;
    this.operation = undefined;
    this.operandPr = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() {
    this.operandCurrent.innerText = this.getDisplayNumber(this.operandCur);
    if (this.operation != null) {
      this.operandPrevious.innerText = `${this.getDisplayNumber(this.operandPr)} ${this.operation}`;
    } else {
      this.operandPrevious.innerText = '';
    }
  }
}

const buttonClear = document.querySelector(".button__clear");
const buttonOperation = document.querySelectorAll(".button__operation");
const buttonDelete = document.querySelector(".button__delete");
const buttonNumber = document.querySelectorAll(".button__number");
const buttonEquals = document.querySelector(".button__equals");
const operandPrevious = document.querySelector(".operand__previous");
const operandCurrent = document.querySelector(".operand__current");

const calculator = new Calculator(operandPrevious, operandCurrent);

buttonNumber.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

buttonOperation.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

buttonEquals.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

buttonClear.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

buttonDelete.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})

console.log(buttonOperation);
console.log(calculator);