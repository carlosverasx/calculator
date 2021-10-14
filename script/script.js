//Selectors
let numbers = document.querySelectorAll(".numbers");
let operators = document.querySelectorAll(".operators");

let equalto = document.querySelector(".equalto");
let clear = document.querySelector(".clear");
let backspace = document.querySelector(".backspace");
let plusMinus = document.querySelector(".plus-minus");
let dot = document.querySelector(".dot");

let display = document.querySelector(".display");
let output = document.querySelector(".output");

let equaltoPressed = false;

//Event Listeners
for (let i = 0; i < numbers.length; i++) {
	numbers[i].addEventListener("click", function () {
		if (equaltoPressed) {
			display.textContent = "";
			equaltoPressed = false;
		}
		//if condition so that if the display has "Infinity" on it, we don't append digits
		if (
			"0123456789.+-×÷".includes(
				display.textContent[display.textContent.length - 1]
			) ||
			display.textContent == ""
		)
			display.textContent += this.textContent;
		evaluate();
	});
}

for (let i = 0; i < operators.length; i++) {
	operators[i].addEventListener("click", function () {
		if (display.textContent !== "." && display.textContent !== "") {
			equaltoPressed = false;
			if ("+-×÷".includes(display.textContent[display.textContent.length - 1]))
				display.textContent =
					display.textContent.substring(0, display.textContent.length - 1) +
					this.textContent;
			else display.textContent += this.textContent;
		}
	});
}

equalto.addEventListener("click", function () {
	if (output.textContent !== "") {
		display.textContent = output.textContent;
		output.textContent = "";
		equaltoPressed = true;
	}
});

clear.addEventListener("click", function () {
	equaltoPressed = false;
	display.textContent = "";
	output.textContent = "";
});

backspace.addEventListener("click", function () {
	equaltoPressed = false;
	display.textContent = display.textContent.substr(
		0,
		display.textContent.length - 1
	);
	evaluate();
});

plusMinus.addEventListener("click", function () {
	//This "if" will restrict evaluate() if the display is of the type "-." or "."
	if (display.textContent !== ".") {
		equaltoPressed = false;
		let expression = display.textContent;
		let flag = true;

		for (let i = expression.length - 1; i >= 0; i--) {
			if ("+-×÷".includes(expression[i])) {
				if (expression[i] !== "-")
					expression =
						expression.substring(0, i + 1) +
						"-" +
						expression.substring(i + 1, expression.length);
				else if ("+-×÷".includes(expression[i - 1]) || i - 1 < 0)
					expression =
						expression.substring(0, i) +
						expression.substring(i + 1, expression.length);
				else
					expression =
						expression.substring(0, i) +
						"+" +
						expression.substring(i + 1, expression.length);
				flag = false;
				break;
			}
		}

		if (flag) expression = "-" + expression;
		display.textContent = expression;
		evaluate();
	}
});

dot.addEventListener("click", function () {
	if (equaltoPressed) {
		display.textContent = "";
		equaltoPressed = false;
	}
	let start = 0;
	for (let i = display.textContent.length - 1; i >= 0; i--) {
		if ("+-×÷".includes(display.textContent[i])) {
			start = i + 1;
			break;
		}
	}
	if (
		!display.textContent
			.substring(start, display.textContent.length)
			.includes(".")
	)
		display.textContent += ".";
});

//Functions
function evaluate() {
	let expression = display.textContent;

	for (let i = 0; i < expression.length; i++) {
		if (expression[i] === "×")
			expression =
				expression.substring(0, i) +
				"*" +
				expression.substring(i + 1, expression.length);
		if (expression[i] === "÷")
			expression =
				expression.substring(0, i) +
				"/" +
				expression.substring(i + 1, expression.length);
	}
	
	const tempFunc = (exp) => {
		return new Function(`return ${exp}`)();
	};
	
	if (
		"0123456789.".includes(expression[expression.length - 1]) &&
		tempFunc(expression) != expression
	) {
		
		output.textContent = tempFunc(expression);
	} else output.textContent = "";
}

// Adding click animation

document.querySelectorAll(".row div").forEach((el) => {
	el.addEventListener("click", function () {
		this.classList.add("click-effect");
		setTimeout(() => {
			this.classList.remove("click-effect");
		}, 100);
	});
});
// VIMP: In addEventListener you cannot use an arrow function because then the "this" keyword won't work as expected.
