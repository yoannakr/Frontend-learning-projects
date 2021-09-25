export const fillArrayInRange = (start: number, end: number) => {
	return Array(end - start + 1).fill(0).map((_, idx) => start + idx)
};