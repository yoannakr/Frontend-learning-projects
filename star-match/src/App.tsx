import React from 'react';
import './App.css';
import DisplayStars from './components/DisplayStars';
import DisplayNumbers from './components/DisplayNumbers';

function App() {
	return (
		<div>
			<p>Pick 1 or more numbers that sum to the number of stars</p>
			<div className="container">
				<DisplayStars />
				<DisplayNumbers />
			</div>
			<p className="timer">Time Remaining: 0</p>
		</div>
	);
}

export default App;
