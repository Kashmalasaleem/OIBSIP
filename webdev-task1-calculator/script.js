const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");
let firstNumber = null;
let operator = null;

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    const value = button.value;

    if (value === "all-clear") {
      screen.value = "";
    } else if (!isNaN(value) || value === ".") {
      screen.value += value;
    } else if (value === "delete") {
      screen.value = screen.value.slice(0, -1);
    }

    switch (value) {
      case "+":
      case "-":
      case "*":
      case "/":
        if (screen.value === "") break;

        const currentNumber = parseFloat(screen.value);

        if (firstNumber !== null && operator !== null) {
          let result;
          // GIVING THE OPERATORS IT'S FUNCTIONALITY

          switch (operator) {
            case "+":
              result = firstNumber + currentNumber;
              break;

            case "-":
              result = firstNumber - currentNumber;
              break;

            case "*":
              result = firstNumber * currentNumber;
              break;

            case "/":
              if (currentNumber === 0) {
                screen.value = "Error";
                firstNumber = null;
                operator = null;
                return;
              }

              result = firstNumber / currentNumber;
              break;
          }

          // STORING THE RESULTANT NUMBER AS THE FIRSTNUMBER
          firstNumber = result;
        } else {
          firstNumber = currentNumber;
        }

        operator = value;
        screen.value = "";
        break;

      case "=":
        if (firstNumber === null || operator === null || screen.value === "") {
          break;
        }

        const secondNumber = parseFloat(screen.value);
        let finalResult;

        switch (operator) {
          case "+":
            finalResult = firstNumber + secondNumber;
            break;

          case "-":
            finalResult = firstNumber - secondNumber;
            break;

          case "*":
            finalResult = firstNumber * secondNumber;
            break;

          case "/":
            if (secondNumber === 0) {
              screen.value = "Error";
              firstNumber = null;
              operator = null;
              return;
            }

            finalResult = firstNumber / secondNumber;
            break;
        }

        screen.value = finalResult;
        firstNumber = finalResult;
        operator = null;
        break;
    }

    // INITIAL CODE JUST FOR 2 NUMBERS

    // switch (value) {
    //   case "+":
    //   case "-":
    //   case "*":
    //   case "/":
    //     if (screen.value === "") break;

    //     const currentNumber = parseFloat(screen.value);

    //     if (firstNumber !== null && operator !== null) {
    //       let result;

    //       switch (operator) {
    //         case "+":
    //           result = firstNumber + currentNumber;
    //           break;

    //         case "-":
    //           result = firstNumber - currentNumber;
    //           break;

    //         case "*":
    //           result = firstNumber * currentNumber;
    //           break;

    //         case "/":
    //           if (currentNumber === 0) {
    //             screen.value = "Error";
    //             firstNumber = null;
    //             operator = null;
    //             return;
    //           }

    //           result = firstNumber / currentNumber;
    //           break;
    //       }

    //       firstNumber = result;
    //     } else {
    //       firstNumber = currentNumber;
    //     }

    //     operator = value;
    //     screen.value = "";
    //     break;

    //   case "=":
    //     if (firstNumber === null || operator === null || screen.value === "") {
    //       break;
    //     }

    //     const secondNumber = parseFloat(screen.value);
    //     let finalResult;

    //     switch (operator) {
    //       case "+":
    //         finalResult = firstNumber + secondNumber;
    //         break;

    //       case "-":
    //         finalResult = firstNumber - secondNumber;
    //         break;

    //       case "*":
    //         finalResult = firstNumber * secondNumber;
    //         break;

    //       case "/":
    //         if (secondNumber === 0) {
    //           screen.value = "Error";
    //           firstNumber = null;
    //           operator = null;
    //           return;
    //         }

    //         finalResult = firstNumber / secondNumber;
    //         break;
    //     }

    //     screen.value = finalResult;
    //     firstNumber = finalResult;
    //     operator = null;
    //     break;
    // }
  });
});
