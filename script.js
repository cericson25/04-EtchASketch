const gridContainer = document.querySelector(".grid-container");
const resizeButton = document.querySelector(".resize");
const colorButton = document.querySelector(".color");
const clearButton = document.querySelector(".clear");
const eraseButton = document.querySelector(".erase");
let inputGridSize = 16; //default starting grid size (current: 16x16px)
let colorMode = 1;
let cells = [];

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

createGrid(inputGridSize);

resizeButton.addEventListener("click", resizeGrid);
colorButton.addEventListener("click", changeColorMode);
clearButton.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.style.backgroundColor = "#ffffff";
  });
});

eraseButton.addEventListener("click", () => (colorMode = 3));

function createGrid(inputGridSize) {
  for (let row = 0; row < inputGridSize; row++) {
    //creates rows
    const newRow = document.createElement("div");
    newRow.style.display = "flex";
    for (let cell = 0; cell < inputGridSize; cell++) {
      //creates columns
      const newCell = document.createElement("div");
      newCell.style.height = 400 / inputGridSize + "px";
      newCell.style.width = 400 / inputGridSize + "px";
      newCell.classList.add("cell");
      newCell.addEventListener("mouseover", changeCellColor);
      newCell.addEventListener("mousedown", changeCellColor);
      newRow.appendChild(newCell);
      cells.push(newCell);
    }
    gridContainer.appendChild(newRow);
  }
}

function changeCellColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (colorMode === 1) {
    e.target.style.backgroundColor = "#505050";
  } else if (colorMode === 2) {
    e.target.style.backgroundColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
  } else {
    e.target.style.backgroundColor = "#ffffff";
  }
}

function resizeGrid() {
  //removes original grid, and creates a new one with inputed dimensions
  inputGridSize = prompt("Grid Dimensions: (Max of 100px)");
  console.log(inputGridSize);
  if (inputGridSize === null) {
  } else if (inputGridSize <= 100) {
    while (gridContainer.firstChild) {
      //removes existing grid
      gridContainer.removeChild(gridContainer.lastChild);
    }
    createGrid(inputGridSize);
  } else {
    alert("Invalid Input");
  }
}

function changeColorMode() {
  if (colorMode !== 3) {
    colorMode++;
  } else {
    colorMode = 1;
  }
}
