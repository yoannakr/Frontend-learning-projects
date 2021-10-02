import React from "react";
import "../../src/App.css";
interface IProps {
	isWin: boolean;
	playAgain: any;
}

const GameStatus = ({ isWin, playAgain }: IProps) => {
	return (
		<div className="box">
			<div className="game-status">
				<h3
					style={{ color: isWin ? "green" : "red" }}>
					{isWin ? "Nice" : "Game over"}</h3>
				<button
					className="play-again-btn"
					onClick={playAgain}>
					Play Again
				</button>
			</div >
		</div >
	);
};

export default GameStatus;