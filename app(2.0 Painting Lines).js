const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = 2;

const colors = [
    "#ff4d4d",
    "#ff3838",
    "#ffaf40",
    "#ff9f1a",
    "#fffa65",
    "#fff200",
    "#ffcccc",
    "#ffb8b8"
];

function onMove(event) {
    ctx.beginPath(); //이게 없으면 마우스를 움직일 때 마다 반응했던 모든 선들의 색이 바뀔 것이다.
    ctx.moveTo(400, 400); //선의 시작점이 되는 곳을 설정한다.
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.strokeStyle = color;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

canvas.addEventListener("mousemove", onMove);
