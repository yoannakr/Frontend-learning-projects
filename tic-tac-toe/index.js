let isXTurn = true;
let isXWinner = false;
let xWins = 0;
let oWins = 0;
let tie = 0;
let board = new Array(9).fill(null);
const blockElementClassName = "block";
const blockDataCellIndexAttributeName = "data-cell-index";
const winnerTitleId = "winner";
const xWinsId = "x-wins";
const oWinsId = "o-wins";
const tieId = "tie";
const turnId = "turn";
const markedClassName = "marked";
const noWinnerMessage = "No winner yet!";
const winningCombinations = [
	[0,1,2],
	[0,4,8],
	[2,4,6],
	[0,3,6],
	[2,5,8],
	[1,4,7],
	[6,7,8],
	[3,4,5]
];

function isBoardCompleted(){
	return !board.includes(null);
}

function checkForWinner() {
	for (const combination of winningCombinations)
		if(board[combination[0]] !== null && 
			board[combination[0]] === board[combination[1]] && 
			board[combination[1]] == board[combination[2]]){
				document.getElementById(`block-${combination[0]}`).classList.add(markedClassName);
				document.getElementById(`block-${combination[1]}`).classList.add(markedClassName);
				document.getElementById(`block-${combination[2]}`).classList.add(markedClassName);
				return board[combination[0]];
			}

	return null;
}

function disableAllBlocks() {
	const elements = document.getElementsByClassName(blockElementClassName);
	Array.from(elements).map(el => {
		el.disabled = true;
	});
}

function play(elementId) {
	const textContent = isXTurn ? "X" : "O";
	let element = document.getElementById(elementId);
	element.textContent = textContent;
	element.disabled = true;
	isXTurn = !isXTurn; 
	document.getElementById(turnId).textContent = `${isXTurn ? "X" : "O"} turn`;
	board[element.getAttribute(blockDataCellIndexAttributeName)] = textContent;

	const winner = checkForWinner();
	if(winner !== null){
		isXWinner = winner === "X";
		isXWinner ? ++xWins : ++oWins;
		document.getElementById(winnerTitleId).textContent = `Winner ${isXWinner ? "X" : "O"}`;
		document.getElementById(xWinsId).textContent = `${xWins}`;
		document.getElementById(oWinsId).textContent = `${oWins}`;
		disableAllBlocks();
	} else if(isBoardCompleted()){
		++tie;
		document.getElementById(tieId).textContent = `${tie}`;
		document.getElementById(winnerTitleId).textContent = "Tie";
	}
}

function continueGame(){
	const elements = document.getElementsByClassName(blockElementClassName);
	Array.from(elements).map(el => {
		el.textContent = "";
		el.disabled = false;
		el.classList.remove(markedClassName);
	});
	isXTurn = true;
	document.getElementById(turnId).textContent = "X turn";
	board = new Array(9).fill(null);
	document.getElementById(winnerTitleId).textContent = noWinnerMessage;
}

function reset() {
	continueGame();

	// reset values
	xWins = 0;
	oWins = 0;
	tie = 0;
	document.getElementById(xWinsId).textContent = `${xWins}`;
	document.getElementById(oWinsId).textContent = `${oWins}`;
	document.getElementById(tieId).textContent = `${tie}`;
}