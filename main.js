// -------------------- Variables ---------------------------- //
// These variables are connected to the elements in index.html using DOM
const gameBoard = document.querySelector(".game__board");
const columns = document.getElementsByClassName("game__columns");
const newGameButton = document.querySelector(".game__reset");


// -------------------- Functions used to Declare  ---------------------------- //
// Functions use 
const setGrid = (gridSize) => {
    const board = [];
    const bools = Array(gridSize).fill(false);
    board.push(bools);
    for (let index = 0; index < gridSize; index++) {
        const array = Array(gridSize).fill(0);
        board.push(array);
    }
    return board;
};

const setBoard = (boardArr) => {
    gameBoard.innerHTML = "";
    for (let index = 0; index < boardArr[0].length; index++) {
        gameBoard.innerHTML += columnLabels(index);
    }
    for (let x = 1; x < boardArr.length; x++) {
        for (let y = 0; y < boardArr[x].length; y++) {
            gameBoard.innerHTML += blockLabels(x, y);
        }
    }
};

const columnLabels = (index) => {
    return `<div class="game__columns" style = "
  grid-column: ${index + 1};
  grid-row: ${1};
  ">Col. ${index + 1}</div>`;
};

const blockLabels = (x, y) => {
    return `<div id="Block-${x}-${y}" class="game__blocks" style = "
        grid-column: ${y + 1};
        grid-row: ${x + 1};"
        ></div>`;
        // To ensure that there are labels on each block - Block ${x + 1} ${y + 1}
};

// -------------------- Game Play variables and Functions ---------------------------- //

// Declaring Gameplay variables
const gridSize = 5;
let turns;
let boardArr = [];

const newGame = () => {
    turns = 1;
    boardArr = setGrid(gridSize);
    setBoard(boardArr);
};

const resetGame = () => {
    turns = 1;

    for (let x = 0; x < boardArr.length; x++) {
        for (let y = 0; y < boardArr[y].length; y++) {
            if (boardArr[x][y] === true) {
                boardArr[x][y] = false;
            } else if (boardArr[x][y] === 1 || boardArr[x][y] === 2) {
                boardArr[x][y] = 0;
            }
        }
    }

    for (let x = 1; x < boardArr.length; x++) {
        for (let y = 0; y < boardArr[x].length; y++) {
            const targetDiv = document.querySelector(`#Block-${x}-${y}`);
            targetDiv.innerHTML = "";
            targetDiv.innerHTML += blockLabels(x, y);
        }
    }
};

newGame();

const selectColumn = (columnText) => {
    for (let index = 0; index < boardArr.length; index++) {
        if (columnText === `Col. ${index + 1}`) {
            return index + 1;
        }
    }
};

const selectRow = (column) => {
    if (boardArr[1][column - 1] === 0) {
        for (let index = boardArr.length - 1; index >= 0; index--) {
            if (boardArr[index][column - 1] === 0) {
                return index + 1;
            }
        }
    } else if (boardArr[1][column - 1] != 0) {
        boardArr[0][column - 1] = true;
    }
};

const placeDisc = (event) => {
    const column = selectColumn(event.target.innerText);
    const row = selectRow(column);
    const targetDiv = document.querySelector(`#Block-${row - 1}-${column - 1}`);

    if (!boardArr[0][column - 1]) {
        targetDiv.innerText = "";
        if (turns % 2 === 1) {
            boardArr[row - 1][column - 1] = 1;
            targetDiv.innerHTML += insertPlayerDiscHTML(row, column);
        } else {
            boardArr[row - 1][column - 1] = 2;
            targetDiv.innerHTML += insertComputerDiscHTML(row, column);
        }
        checkWin();
        turns += 1;
    } else {
        alert("This column is full. Please select another.");
    }
};

const insertPlayerDiscHTML = (row, column) => {
    return `<div class="game__player-disc"style = "grid-column: ${column}; grid-row: ${row};"></div>`;
};

const insertComputerDiscHTML = (row, column) => {
    return `<div class="game__computer-disc"style = "grid-column: ${column}; grid-row: ${row};"></div>`;
};

const checkLine = (a, b, c, d) => {
    return a != 0 && a == b && a == c && a == d;
};

// Checking if a player has lined up four in a row
const checkWin = () => {
    // Check down
    for (let row = 0; row < gridSize - 2; row++) {
        for (let column = 0; column < boardArr[row].length; column++) {
            if (
                checkLine(
                    boardArr[row][column],
                    boardArr[row + 1][column],
                    boardArr[row + 2][column],
                    boardArr[row + 3][column]
                )
            ) {
                alert(`Player ${boardArr[row][column]} wins!`);
            }
        }
    }
    // Check right
    for (let row = 0; row < boardArr.length; row++) {
        for (let column = 0; column < boardArr[row].length - 2; column++) {
            if (
                checkLine(
                    boardArr[row][column],
                    boardArr[row][column + 1],
                    boardArr[row][column + 2],
                    boardArr[row][column + 3]
                )
            ) {
                alert(`Player ${boardArr[row][column]} wins!`);
            }
        }
    }
    // Check down and right
    for (let row = 0; row < gridSize - 2; row++) {
        for (let column = 0; column < boardArr[row].length - 2; column++) {
            if (
                checkLine(
                    boardArr[row][column],
                    boardArr[row + 1][column + 1],
                    boardArr[row + 2][column + 2],
                    boardArr[row + 3][column + 3]
                )
            ) {
                alert(`Player ${boardArr[row][column]} wins!`);
            }
        }
    }
    // Check down and left
    for (let row = gridSize - 1; row <= gridSize; row++) {
        for (let column = 0; column < boardArr[row].length - 2; column++) {
            if (
                checkLine(
                    boardArr[row][column],
                    boardArr[row - 1][column + 1],
                    boardArr[row - 2][column + 2],
                    boardArr[row - 3][column + 3]
                )
            ) {
                alert(`Player ${boardArr[row][column]} wins!`);
            }
        }
    }
};

// ---------------------------- Event Listeners ------------------------------------ //
newGameButton.addEventListener("click", resetGame);

const columnsArray = Array.from(columns);
columnsArray.forEach((column) => {
    column.addEventListener("click", placeDisc);
});