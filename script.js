const gridContainer = document.querySelector(".grid-container");
const resizeButton = document.querySelector(".resize-button");
let baseGridSize = 16; //default starting grid size (current: 16x16px)
let cells = [];

createGrid(baseGridSize);

resizeButton.addEventListener("click", resizeGrid);

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
      newRow.appendChild(newCell);
      cells.push(newCell);
    }
    gridContainer.appendChild(newRow);
  }
  eventListener();
}

function eventListener() {
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      cell.style.backgroundColor = "#505050";
    });
  });
}

function resizeGrid() {
  gridInput = prompt("Grid Dimensions: (Max of 100px)");
  if (gridInput <= 100) {
    removeExistingGrid(gridContainer);
    createGrid(gridInput);
  }
}

function removeExistingGrid(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }
}
