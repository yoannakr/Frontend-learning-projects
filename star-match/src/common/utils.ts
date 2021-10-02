export const fillArrayInRange = (start: number, end: number) => {
	return Array(end - start + 1).fill(0).map((_, idx) => start + idx)
};

export const numColorStatus: {
	[index: string]:string
} = {
	available: "lightgray",
	used: "lightgreen",
	wrong: "lightcoral",
	candidate: "deepskyblue",
}

// Sum an array
export const sum = (arr:Array<number>) => arr.reduce((acc, curr) => acc + curr, 0);

// pick a random number between min and max (edges included)
export const random = (min:number, max:number) => min + Math.floor(Math.random() * (max - min + 1));

export const randomSumIn = (arr:Array<number>, max:number) => {
    const sets:Array<Array<number>> = [[]];
    const sums:Array<number> = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet:Array<number> = sets[j].concat(arr[i]);
        const candidateSum = sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[random(0, sums.length - 1)];
  };