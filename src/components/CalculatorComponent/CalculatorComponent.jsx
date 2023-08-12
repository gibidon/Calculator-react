import { useState } from "react";
import { useEffect } from "react";

import calculatorStyles from "./CalculatorComponent.module.scss";

export default function CalculatorComponent() {
  // или лучше через {id:'+',value:'+'} ?
  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+", "*", "/"];
  const [displayOutput, setDisplayOutput] = useState("");
  const [calcInProgress, setCalcInProgress] = useState(false);

  let buttonElems = buttons.map((button) => (
    <button
      key={button} //а не лучше ли все-таки делать данные в виде {id:'+',value:'+'}? чтобы ключ === id
      className={calculatorStyles.button}
      onClick={() => {
        setDisplayOutput(displayOutput + button);
        setCalcInProgress(false);
      }}
    >
      {button}
    </button>
  ));

  const calcMap = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => Math.round(a * b),
    "/": (a, b) => (a / b === Infinity ? "0" : Math.round(a / b)),
  };

  function calculate() {
    try {
      setCalcInProgress(false);
      const actionSymbol = displayOutput.match(/[-+*/]/)[0];
      let [firstArg, secondArg] = displayOutput.split(actionSymbol);
      return calcMap[actionSymbol](parseInt(firstArg), parseInt(secondArg));
    } catch (e) {
      setTimeout(() => {
        setDisplayOutput("0");
      }, 1000);
      return "error";
    }
  }

  return (
    <div className={calculatorStyles.general}>
      <div
        className={
          calcInProgress ? calculatorStyles.display_active : calculatorStyles.display_idle
        }
      >
        {displayOutput}
      </div>
      <div className={calculatorStyles.buttons}>{buttonElems}</div>
      <div className={calculatorStyles.extraBtns}>
        <button
          className={calculatorStyles.button}
          onClick={() => {
            setDisplayOutput(calculate());
            setCalcInProgress(true);
          }}
        >
          =
        </button>
        <button
          className={calculatorStyles.button}
          onClick={() => {
            setDisplayOutput("");
            setCalcInProgress(false);
          }}
        >
          C
        </button>
      </div>
    </div>
  );
}
