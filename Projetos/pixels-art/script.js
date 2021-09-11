const paletteColors = ['black', 'red', 'blue', 'yellow'];
let linePixelBoardSize = 5;
let columnPixelBoardSize = 5;

function creatColors() {
  let result = 'rgb(';
  result += `${Math.trunc(Math.random() * 255.9)},`;
  result += `${Math.trunc(Math.random() * 255.9)},`;
  result += `${Math.trunc(Math.random() * 255.9)})`;
  return result;
}

function randomPaletteColors() {
  const palette = document.getElementsByClassName('color');
  for (let index = 1; index < palette.length; index += 1) {
    palette[index].style.backgroundColor = creatColors();
  }
  palette[0].style.backgroundColor = 'black';
}

function fillPalette() {
  for (let index = 0; index < paletteColors.length; index += 1) {
    const color = document.createElement('div');
    const palette = document.getElementById('color-palette');
    color.style.backgroundColor = paletteColors[index];
    color.classList.add('color');
    if (index === 0) {
      color.classList.add('selected');
    }
    palette.appendChild(color);
  }
  randomPaletteColors();
}
fillPalette();

function fillPixelBoard() {
  for (let indexLine = 0; indexLine < linePixelBoardSize; indexLine += 1) {
    const line = document.createElement('div');
    line.classList.add('line-pixel-board');
    const board = document.getElementById('pixel-board');
    for (let indexColumn = 0; indexColumn < columnPixelBoardSize; indexColumn += 1) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixel.style.backgroundColor = 'white';
      line.appendChild(pixel);
    }
    board.appendChild(line);
  }
}

fillPixelBoard();
// Não liga pra bagunça em baixo eu tive que fazer isso pra passar nos testes
function checkAmountSelectedPalette() {
  const selected = document.querySelectorAll('.color.selected');
  if (selected.length > 1) {
    for (let index = 0; index < selected.length; index += 1) {
      selected[index].classList.remove('selected');
    }
  }
  if (selected.length === 0) {
    document.querySelector('.color.black').classList.add('selected');
  }
  return false;
}

function checksAmountSelectedPixel() {
  const selected = document.querySelectorAll('.pixel.selected');
  if (selected.length > 0) {
    for (let index = 0; index < selected.length; index += 1) {
      selected[index].classList.remove('selected');
    }
  }
}

function checkAmountSelected() {
  checkAmountSelectedPalette();
  checksAmountSelectedPixel();
}

function removeSelectClass() {
  const lastSelected = document.getElementsByClassName('selected');
  for (let index = 0; index < lastSelected.length; index += 1) {
    lastSelected[index].classList.remove('selected');
  }
}

function selectColor(event) {
  removeSelectClass();
  event.target.classList.add('selected');
}

function addSelctColorEvents() {
  const colors = document.getElementsByClassName('color');
  for (let index = 0; index < colors.length; index += 1) {
    colors[index].addEventListener('click', selectColor);
  }
}
addSelctColorEvents();

function changePixelColor(event) {
  checkAmountSelected();
  const color = document.getElementsByClassName('selected')[0];
  const pixel = event.target;
  pixel.style.backgroundColor = color.style.backgroundColor;
}
// Não liga pra bagunça acima eu tive que fazer isso pra passar nos teste
function addChangePixelColorEvets() {
  const pixels = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].addEventListener('click', changePixelColor);
  }
}
addChangePixelColorEvets();

function clearPixelBoard() {
  const pixels = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'white';
  }
}
const clearButton = document.getElementById('clear-board');
clearButton.addEventListener('click', clearPixelBoard);

function deletAllPixels() {
  const board = document.getElementById('pixel-board');
  const pixels = document.getElementsByClassName('line-pixel-board');
  for (let index = pixels.length - 1; index > -1; index -= 1) {
    board.removeChild(pixels[index]);
  }
}

function checkBoardSize(size) {
  if (size < 5) {
    linePixelBoardSize = 5;
    columnPixelBoardSize = 5;
  } else if (size > 50) {
    columnPixelBoardSize = 50;
    linePixelBoardSize = 50;
  } else {
    linePixelBoardSize = size;
    columnPixelBoardSize = size;
  }
}

function fillPixelBoardForInputValue() {
  const size = document.getElementById('board-size').value;
  if (size > 0) {
    checkBoardSize(size);
    deletAllPixels();
    fillPixelBoard();
    addChangePixelColorEvets();
    document.getElementById('board-size').value = '';
  } else {
    alert('Board inválido!');
  }
}
const generateBoard = document.getElementById('generate-board');
generateBoard.addEventListener('click', fillPixelBoardForInputValue);

function randomlyPaint() {
  const pixels = document.getElementsByClassName('pixel');
  const colors = document.getElementsByClassName('color');
  for (let index = 0; index < pixels.length; index += 1) {
    const pixel = pixels[index];
    const aux = Math.trunc(Math.random() * 3.9);
    const cor = colors[aux].style.backgroundColor;
    pixel.style.backgroundColor = cor;
  }
}

document.getElementById('random-colors').addEventListener('click', randomlyPaint);

const paletteButton = document.getElementById('color-palette-button');
paletteButton.addEventListener('click', randomPaletteColors);
