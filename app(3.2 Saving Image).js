
const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
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
ctx.lineCap = "round";

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
    }
    fileInput.value = null;
}

function onDoubleClick(event) {
    const text = textInput.value;
    if (text !== "") {
    ctx.save(); // ctx와 관련된 모든 정보를 저장한다.
    ctx.lineWidth = 1;
    ctx.font = "53px serif";
    ctx.fillText(text, event.offsetX, event.offsetY) //offsetX와 offsetY는 마우스카 클릭한 canvas 내부 좌표다.
    ctx.restore() // save와 restore 사이에서는 어떤 수정을 하던 저장되지 않을 것이다.(앞의 save이전 상태로 돌아감)
    }
}

function onSaveClick() {
    const url = canvas.toDataURL(); // canvas에 저장되어 있는 파일을 url데이터 형태로 들고오고
    const a = document.createElement("a"); // a태그를 만들어준다음 가짜 링크를 만든다.
    a.href = url // a.href를 이전에 이미지 데이터를 저장한 url과 연결해준다.
    a.download = "myDrawing.png"; // 저장된 이미지와 url이 연결된 a태그를 다운로드 할 때 mydrawing.png 형태로 저장될 것이다.
    a.click(); // a 태그를 클릭하는 동작을 실행한다. 이 동작이 실행됨으로써 파일이 다운로드 된다.
}



canvas.addEventListener("dblclick", onDoubleClick);
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
saveBtn.addEventListener("click", onSaveClick);

