import React from "react";
import "../../src/App.css";
import PlayNumber from "./PlayNumber";

interface IProps {
	numbers: Array<number>;
}

const DisplayNumbers = ({ numbers }: IProps) => {
	return (
		<div className="box">
			{numbers.map(n => <PlayNumber key={n} num={n} />)}
		</div>
	);
};

export default DisplayNumbers;