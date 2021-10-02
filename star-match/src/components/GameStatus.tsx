import React from "react";
import "../../src/App.css";
interface IProps {
	message: string;
	playAgain: any;
}

const GameStatus = ({ message, playAgain }: IProps) => {
	return (
		<div className="box">
			<div className="game-status">
				<h3>{message}</h3>
				<button
					className="play-again-btn"
					onClick={playAgain}>
					Play Again
				</button>
			</div >
		</div>
	);
};

export default GameStatus;