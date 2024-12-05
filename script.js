// script.js
document.addEventListener("DOMContentLoaded", () => {
  const inputBox = document.getElementById("inputbox");
  const buttons = document.querySelectorAll(".Calculator button");

  let currentInput = "";
  let operator = null;
  let firstOperand = null;

  const updateDisplay = (value) => {
    inputBox.value = value || "0";
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      // Clear all (AC)
      if (value === "AC") {
        currentInput = "";
        operator = null;
        firstOperand = null;
        updateDisplay("");
      }
      // Delete last character (DEL)
      else if (value === "DEL") {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
      }
      // Handle operators
      else if (["+", "-", "×", "÷", "%"].includes(value)) {
        if (currentInput) {
          firstOperand = parseFloat(currentInput);
        }
        operator = value;
        currentInput = "";
      }
      // Handle equal sign
      else if (value === "=") {
        if (firstOperand !== null && operator && currentInput) {
          const secondOperand = parseFloat(currentInput);
          let result = null;

          switch (operator) {
            case "+":
              result = firstOperand + secondOperand;
              break;
            case "-":
              result = firstOperand - secondOperand;
              break;
            case "×":
              result = firstOperand * secondOperand;
              break;
            case "÷":
              result =
                secondOperand !== 0 ? firstOperand / secondOperand : "Error";
              break;
            case "%":
              result = firstOperand % secondOperand;
              break;
          }

          updateDisplay(result);
          currentInput = result.toString();
          operator = null;
          firstOperand = null;
        }
      }
      // Handle numbers and decimal
      else {
        if (value === "." && currentInput.includes(".")) return;
        currentInput += value;
        updateDisplay(currentInput);
      }
    });
  });
});
