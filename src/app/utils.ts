export const formatSmartNumber = (num: number | string): string => {
	if (typeof num === "string") {
		num = Number(num);
	}

	if (num >= 10) {
		return parseFloat(num.toFixed(1)).toString();
	} else if (num >= 1) {
		return parseFloat(num.toFixed(2)).toString();
	} else {
		let numberDecimalAfterZero = 3;

		// if (Number(num) >= 0.1) {
		// 	numberDecimalAfterZero = 4;
		// }

		const strNumber = num.toFixed(13).toString();
		const arr = strNumber.split(".");
		if (arr.length === 1) {
			return num.toString();
		}
		const decimal = arr[1];
		//find first non-zero number
		let index = 0;
		while (index < decimal.length && decimal[index] === "0") {
			index++;
		}
		if (index === decimal.length) {
			return parseFloat(num.toString()).toString();
		}

		let threeDecimal = decimal.slice(index, index + numberDecimalAfterZero);

		threeDecimal = Number(threeDecimal.split("").reverse().join(""))
			.toString()
			.split("")
			.reverse()
			.join("");

		return `${arr[0]}.${decimal.slice(0, index)}${threeDecimal}`;
	}
};

export function numberWithCommas(x: number | string | undefined) {
	return !x
		? "0"
		: formatSmartNumber(x)
				.toString()
				.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
				.replace(/\.0$/, "");
}
