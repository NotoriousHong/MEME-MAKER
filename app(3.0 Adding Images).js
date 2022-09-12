
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;

CANVAS_WIDTH = 800;
CANVAS_HEIGHT = 800;

let isPainting = false;
let isFilling = false;

function onMouseMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function onMouseDown() {
    isPainting = true;
}

function onMouseUp() {
    isPainting = false;
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
    ctx.strokeStyle = event.target.dataset.color;
    ctx.fillStyle = event.target.dataset.color;
    color.value = event.target.dataset.color
}

function onModeClick() {
    if(isFilling){
        isFilling = false
        modeBtn.innerText = "Change to Fill";
    } else {
        isFilling = true
        modeBtn.innerText = "Change to Draw";
    }
}

function onCanvasClick() {
    if(isFilling){
        ctx.fillRect(0, 0, 800, 800);
    }
}

function onDestroyClick() {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, 800, 800);
}

function onEraserClick() {
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Change to Fill";
}

function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function() {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    } // image.onload는 이미지가 웹에 업로드 되어있는 상태(inload)일 때를 말한다.
    //여기서는 이때 {}부분과 같은 function을 사용할 것이라고 말하고 있다.
    fileInput.value = null;
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("mouseleave", onMouseUp);

lineWidth.addEventListener("change", onLineWidthChange);

color.addEventListener("change", onColorChange);


colorOptions.forEach(color => color.addEventListener("click", onColorClick))

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);



