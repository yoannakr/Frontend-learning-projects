import React from "react";
import "../../src/App.css";
import { numColorStatus } from "../common/utils"

interface IProps {
	num: number;
	onClick: Function;
	status: string;
}

const PlayNumber = ({ num, onClick, status }: IProps) => {
	return (
		<button
			className="number"
			style={{ backgroundColor: numColorStatus[status] }}
			onClick={() => onClick(num, status)}>
			{num}
		</button>
	);
};

export default PlayNumber;