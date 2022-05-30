// Declaring Variables
const gameBoard = document.querySelector(".game__board");
const columns = document.getElementsByClassName("game__columns");
const reset = document.querySelector(".game__reset");

const setGrid = (gridSize) => {
    console.log("setGrid called");

    const board = [];
    const bools = Array(gridSize).fill(false);
    board.push(bools);
    console.log(bools);

    // console.log(array);

    for (let index = 0; index < gridSize; index++) {
        const array = Array(gridSize).fill(0);
        board.push(array);
    }

    // board.unshift(bools);
    return board;
};

const setBoard = (boardArr) => {
    console.log("setBoard called");
    for (let index = 0; index < boardArr[0].length; index++) {
        gameBoard.innerHTML += `<div class="game__columns" style = "
        grid-column: ${index + 1};
        grid-row: ${1};
        ">Col. ${index + 1}</div>`;
    }

    for (let x = 1; x < boardArr.length; x++) {
        for (let y = 0; y < boardArr[x].length; y++) {
            gameBoard.innerHTML += `<div id="Block-${x}-${y}" class="game__blocks" style = "
        grid-column: ${y + 1};
        grid-row: ${x + 1};"
        >Block ${x} ${y}</div>`;
        }
    }
};

// --------------------------------- Game Play Functions ---------------------------- //

const gridSize = 5;
const boardArr = setGrid(gridSize);

const newGame = (gridSize) => {
    console.log("newGame called");
    setGrid(gridSize);
    setBoard(gridSize);
};

const testArr = [
    [false, false, false, false, false],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
];

setBoard(boardArr);
console.log(boardArr);
console.log(testArr);

const selectColumn = (columnText) => {
    let column = 0;

    if (columnText === "Col. 1") {
        column = 1;
    } else if (columnText === "Col. 2") {
        column = 2;
    } else if (columnText === "Col. 3") {
        column = 3;
    } else if (columnText === "Col. 4") {
        column = 4;
    } else if (columnText === "Col. 5") {
        column = 5;
    }

    return column;
};

const selectRow = (column) => {
    if (boardArr[1][column - 1] === 0) {
        for (let index = boardArr.length - 1; index >= 0; index--) {
            console.log(boardArr[index][column - 1]);
            if (boardArr[index][column - 1] === 0) {
                return index + 1;
            }
        }
    } else if (boardArr[1][column - 1] === 1) {
        boardArr[0][column - 1] = true;
    }
};

const placeDisc = (event) => {
    console.log("Selected column no. " + selectColumn(event.target.innerText));
    const column = selectColumn(event.target.innerText);
    const row = selectRow(column);
    const targetDiv = document.querySelector(`#Block-${row - 1}-${column - 1}`);
    console.log(row, column);
    console.log(row - 1, column - 1);
    // console.log(targetDiv.innerText);
    console.log(boardArr[0][column - 1]);
    if (boardArr[0][column - 1] === false) {
        boardArr[row - 1][column - 1] = 1;
        console.log(boardArr);
        targetDiv.innerHTML += insertDiscHTML(row, column);
    } else if (boardArr[0][column - 1] === true) {
        alert("This column is full. Please select another.");
    }
};

const insertDiscHTML = (row, column) => {
    return `<div class="game__disc"style = "grid-column: ${column}; grid-row: ${row};">Disc</div>`;
};

const checkWin = () => {};

const columnsArray = Array.from(columns);

columnsArray.forEach((column) => {
    column.addEventListener("click", placeDisc);
});

// reset.addEventListener("click", newGame(5));
