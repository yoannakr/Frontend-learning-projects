import React, { useState } from 'react';
import "../App.css"
import DisplayStars from './DisplayStars';
import PlayNumber from './PlayNumber';
import GameStatus from './GameStatus';
import { fillArrayInRange, sum, randomSumIn } from "../common/utils";

const StarMatch = () => {
	let numbers = fillArrayInRange(1, 9);
	const [countOfStars, setCountOfStars] = useState<number>(randomSumIn(numbers, 9));
	const [usedNumbers, setUsedNumbers] = useState<Array<number>>([]);
	const [choosenNumbers, setChoosenNumbers] = useState<Array<number>>([]);

	const candidatesAreWrong = sum(choosenNumbers) > countOfStars;

	const addNum = (num: number, status: string) => {
		if (status === "used") {
			return;
		}

		const currentChoosenNums =
			status === "available"
				? choosenNumbers.concat(num)
				: choosenNumbers.filter(cn => cn !== num);

		if (sum(currentChoosenNums) !== countOfStars) {
			setChoosenNumbers(currentChoosenNums);
		} else {
			const currentUsedNums = [...usedNumbers, ...currentChoosenNums];
			numbers = numbers.filter(n => !currentUsedNums.includes(n));
			setUsedNumbers(currentUsedNums);
			if (numbers.length !== 0)
				setCountOfStars(randomSumIn(numbers, 9));
			setChoosenNumbers([]);
		}
	};
	const numberStatus = (num: number) => {
		if (usedNumbers.includes(num)) {
			return "used";
		}
		if (choosenNumbers.includes(num)) {
			return candidatesAreWrong ? "wrong" : "candidate";
		}
		return "available";
	};

	const resetGame = () => {
		setUsedNumbers([]);
		setCountOfStars(randomSumIn(numbers, 9));
		setChoosenNumbers([]);
	};

	return (
		<div>
			<p>Pick 1 or more numbers that sum to the number of stars</p>
			<div className="container">
				{usedNumbers.length === 9
					? <GameStatus message="Nice" playAgain={resetGame} />
					: <DisplayStars countOfStars={countOfStars} />}
				<div className="box">
					{numbers.map(num =>
						<PlayNumber
							key={num}
							num={num}
							status={numberStatus(num)}
							onClick={addNum} />
					)}
				</div>
			</div>
			<p className="timer">Time Remaining: 0</p>
		</div>
	);
}

export default StarMatch;
