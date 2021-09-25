import React from "react";
import "../../src/App.css";

interface IProps {
	num: number;
}

const PlayNumber = ({ num }: IProps) => {
	return (
		<button className="number">{num}</button>
	);
};

export default PlayNumber;