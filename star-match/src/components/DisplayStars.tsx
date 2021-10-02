import React from "react";
import "../../src/App.css";
import Star from "./Star";
import { fillArrayInRange } from "../common/utils";
interface IProps {
	countOfStars: number;
}

const DisplayStars = ({ countOfStars }: IProps) => {
	const stars = fillArrayInRange(1, countOfStars);
	return (
		<div className="box">
			{stars.map(star => <Star key={star} />)}
		</div>
	);
};

export default DisplayStars;