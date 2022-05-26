// Declaring Variables
const gameBoard = document.querySelector(".game__board");
const columns = document.getElementsByClassName("game__columns");

const setBoard = (boardSize) => {
  console.log("setBoard called");

  const board = [];
  const array = new Array(boardSize).fill(0);

  for (let index = 0; index < boardSize + 1; index++) {
    board.push(array);
  }
  return board;
};

const setColumnLabels = (boardArr) => {
  console.log("setColumnLabels called");
  for (let index = 0; index < boardArr[0].length; index++) {
    gameBoard.innerHTML += `<div class="game__columns" style = "
        grid-column: ${index + 1};
        grid-row: ${1};
        ">Col. ${index + 1}</div>`;
  }
};

// --------------------------------- Game Play Functions ---------------------------- //

const gridSize = 5;

const newGame = (gridSize) => {
  setColumnLabels();
  return setBoard(gridSize);
};

const boardArr = setBoard(gridSize);
setColumnLabels(boardArr);

console.log(boardArr[2][3]);

const selectColumn = (event) => {
  const columnText = event.target.innerText;
  let column = 0;
  let row = 0;

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
  let row;
  let pos = boardArr.length - 1;

  boardArr.forEach((row) => {
    if (row[column] != 0) {
      row = 6 - pos;
      pos--;
    } else {
      return row;
    }
  });

  // for (let index = boardArr.length; index >= 0; index--) {
  //     if (boardArr[index][column] === 0) {
  //         row = index + 1;
  //         break;
  //     } else {
  //         continue;
  //     }
  // }
  return row;
};

const dropDisc = (event) => {
//   console.log(event);
  const column = selectColumn(event);
  const row = selectRow(column);
  console.log[boardArr[row]];
  gameBoard.innerHTML += `
      <div class="game__disc" style = "
      grid-column: ${column};
      grid-row: ${row};
      ">Disc</div>`;

  //   boardArr[row-1][column-1] = 1;
  
};

const columnsArray = Array.from(columns);

columnsArray.forEach((column) => {
  column.addEventListener("click", dropDisc);
});
