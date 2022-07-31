const gridContainer = document.querySelector(".grid-container");

const drawButton = document.querySelector(".draw");
const rainbowButton = document.querySelector(".rainbow");
const eraseButton = document.querySelector(".erase");
const gridButton = document.querySelector(".grid");
const resizeButton = document.querySelector(".resize");
const clearButton = document.querySelector(".clear");

let DEFAULT_GRID_SIZE = 16; //default starting grid size (current: 16x16px)
let colorMode = 1;
let cells = [];
let buttons = [drawButton, rainbowButton, eraseButton];
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

drawButton.addEventListener("click", () => {
  colorMode = 1;
});

rainbowButton.addEventListener("click", () => (colorMode = 2));
eraseButton.addEventListener("click", () => (colorMode = 3));
gridButton.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.classList.toggle("grid");
  });
});

resizeButton.addEventListener("click", resizeGrid);
clearButton.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.style.backgroundColor = "#ffffff";
  });
});

buttons.forEach((button) => {
  button.addEventListener("click", activeButton);
});

function activeButton(e) {
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  e.target.classList.add("active");
}

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
  let inputGridSize = prompt("Grid Dimensions: (Max of 100px)");
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

window.onload = () => {
  createGrid(DEFAULT_GRID_SIZE);
};
