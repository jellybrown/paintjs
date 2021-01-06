const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

const colorBox = document.querySelector("#jsColors");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  console.log("hey");
  const clikedColor = event.target;
  if (clikedColor.classList.contains("jsColor")) {
    const color = clikedColor.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
  }
}
function handleRangechange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handelModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

// Array.from(colors).forEach((color) =>
//   color.addEventListener("click", handleColorClick)
// );

// 컬러선택 target으로 바꾸기 (이벤트 위임)
colorBox.addEventListener("click", handleColorClick);

if (range) {
  range.addEventListener("input", handleRangechange);
}

if (mode) {
  mode.addEventListener("click", handelModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
