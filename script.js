const gridContainer = document.querySelector(".grid-container");
const resizeButton = document.querySelector(".resize");
const colorButton = document.querySelector(".color");
const clearButton = document.querySelector(".clear");
let inputGridSize = 16; //default starting grid size (current: 16x16px)
let colorMode = 1;
let cells = [];

createGrid(inputGridSize);

resizeButton.addEventListener("click", resizeGrid);
colorButton.addEventListener("click", changeColorMode);
clearButton.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.style.backgroundColor = "#ffffff";
  });
});

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
  sketchEventListener();
}

function sketchEventListener() {
  //creates an event listener for each grid tile
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      cell.style.backgroundColor = colorLogic(colorMode);
    });
  });
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
  if (colorMode === 1) {
    colorMode++;
  } else {
    colorMode = 1;
  }
}

function colorLogic() {
  if (colorMode === 1) {
    return "#505050";
  } else {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
}
