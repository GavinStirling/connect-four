// Declaring variables which connect the JS and HTML
const gameBoard = document.querySelector(".game__board");
const columns = document.getElementsByClassName("game__columns");
const reset = document.querySelector(".game__reset");

const setGrid = (gridSize) => {
    console.log("setGrid called");

    const board = [];
    const bools = Array(gridSize).fill(false);
    board.push(bools);

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

// -------------------- Game Play variables and Functions ---------------------------- //

// Declaring Gameplay variables
const gridSize = 5;
let turns = 1;
const boardArr = setGrid(gridSize);
setBoard(boardArr);
console.log(boardArr)

const newGame = (gridSize) => {
    console.log("newGame called");
    setGrid(gridSize);
    setBoard(gridSize);
};


const selectColumn = (columnText) => {
    for (let index = 0; index < boardArr.length; index++) {
      if (columnText === `Col. ${index+1}`) {
        return index +1;
      } 
    }
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
    console.log(boardArr[0][column - 1]);

    
    if (!boardArr[0][column - 1]) {
      if (turns%2 === 1){
        boardArr[row - 1][column - 1] = 1;
        console.log(boardArr);
        targetDiv.innerHTML += insertPlayerDiscHTML(row, column);
      } else {
        boardArr[row - 1][column - 1] = 2;
        console.log(boardArr);
        targetDiv.innerHTML += insertComputerDiscHTML(row, column);
      }
      turns+=1;
        
    } else if (boardArr[0][column - 1]) {
        alert("This column is full. Please select another.");
    }
};

const insertPlayerDiscHTML = (row, column) => {
    return `<div class="game__player-disc"style = "grid-column: ${column}; grid-row: ${row};">Disc</div>`;
};

const insertComputerDiscHTML = (row, column) => {
  return `<div class="game__computer-disc"style = "grid-column: ${column}; grid-row: ${row};">Disc</div>`;
};

const checkWin = () => {};



// ---------------------------- Event Listeners ------------------------------------ //

const columnsArray = Array.from(columns);

columnsArray.forEach((column) => {
    column.addEventListener("click", placeDisc);
});

// reset.addEventListener("click", newGame(5));
