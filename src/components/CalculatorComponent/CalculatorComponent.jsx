import { useState } from "react"
import btnStyles from "../ButtonComponent/ButtonComponent.module.css"
import displayStyles from "../ButtonComponent/DisplayOutputComponent.module.css"
import calculatorStyles from "./CalculatorComponent.module.css"

export default function CalculatorComponent() {
	const buttons = [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"0",
		"-",
		"+",
		"*",
		"/",
	]
	const [displayOutput, setDisplayOutput] = useState("")
	const [calcInProgress, setCalcInProgress] = useState(false)

	let buttonElems = buttons.map((button) => (
		<button
			key={button} //а не лучше ли все-таки делать данные в виде {id:'+',value:'+'}? чтобы ключ === id
			className={btnStyles.button}
			onClick={() => {
				setDisplayOutput(displayOutput + button)
				setCalcInProgress(false)
			}}
		>
			{button}
		</button>
	))

	const calcMap = {
		"+": (a, b) => a + b,
		"-": (a, b) => a - b,
		"*": (a, b) => a * b,
		"/": (a, b) => (a / b === Infinity ? "0" : a / b),
	}

	function calculate() {
		try {
			setCalcInProgress(false)
			const actionSymbol = displayOutput.match(/[-+*/]/)[0]
			let [firstArg, secondArg] = displayOutput.split(actionSymbol)
			return calcMap[actionSymbol](parseInt(firstArg), parseInt(secondArg))
		} catch (e) {
			return "error. please press C and start over"
		}
	}

	return (
		<div className={calculatorStyles.general}>
			<div className={calcInProgress ? displayStyles.active : displayStyles.idle}>
				{displayOutput}
			</div>
			<div className={calculatorStyles.buttons}>{buttonElems}</div>
			<hr />
			<div className={calculatorStyles.extraBtns}>
				<button
					onClick={() => {
						setDisplayOutput(calculate())
						setCalcInProgress(true)
					}}
				>
					=
				</button>
				<button
					onClick={() => {
						setDisplayOutput("")
						setCalcInProgress(false)
					}}
				>
					C
				</button>
			</div>
		</div>
	)
}
