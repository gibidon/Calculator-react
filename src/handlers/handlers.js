import { calcMap } from "../constants";

export function handleResultClick(state) {
  const { displayOutput, setDisplayOutput, setCalcInProgress } = state;

  try {
    setCalcInProgress(false);
    // const correctedVal = checkMinus(displayOutput);
    const actionSymbol = displayOutput.match(/[-+*/]/)[0];
    let [firstArg, secondArg] = displayOutput.split(actionSymbol);
    const result = calcMap[actionSymbol](parseInt(firstArg), parseInt(secondArg));
    setDisplayOutput(isNaN(result) ? 0 : result);
    setCalcInProgress(true);
  } catch (e) {
    state.setDisplayOutput("0");
  }
}

export function handleResetClick(state) {
  state.setDisplayOutput("");
  state.setCalcInProgress(false);
}
