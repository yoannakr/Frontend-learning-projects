import React from 'react';
import './App.css';
import DisplayStars from './components/DisplayStars';
import DisplayNumbers from './components/DisplayNumbers';
import { fillArrayInRange } from "../src/common/utils"

function App() {
	const numbers = fillArrayInRange(1, 9);
	return (
		<div>
			<p>Pick 1 or more numbers that sum to the number of stars</p>
			<div className="container">
				<DisplayStars />
				<DisplayNumbers numbers={numbers} />
			</div>
			<p className="timer">Time Remaining: 0</p>
		</div>
	);
}

export default App;
