import { useState } from "react";
import { buttons } from "../constants";
import calculatorStyles from "./CalculatorComponent.module.scss";
import { handleResetClick, handleResultClick } from "../handlers/handlers";

export default function CalculatorComponent() {
  const [displayOutput, setDisplayOutput] = useState("");
  const [calcInProgress, setCalcInProgress] = useState(false);

  const state = { displayOutput, setDisplayOutput, calcInProgress, setCalcInProgress };

  let buttonElems = buttons.map((button) => (
    <button
      key={button}
      className={calculatorStyles.button}
      onClick={() => {
        setDisplayOutput(displayOutput + button);
        setCalcInProgress(false);
      }}
    >
      {button}
    </button>
  ));

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
          onClick={() => handleResultClick(state)}
        >
          =
        </button>
        <button
          className={calculatorStyles.button}
          onClick={() => handleResetClick(state)}
        >
          C
        </button>
      </div>
    </div>
  );
}
