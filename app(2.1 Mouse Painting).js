const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = 2;

let isPainting = false;

function onMouseMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function onMouseDown() {
    isPainting = true;
}

function onMouseUp() {
    isPainting = false;
}

canvas.addEventListener("mousemove", onMouseMove);

canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);

//근데 여기까지만 하면 canvas에서 마우스를 클릭한 채로 밖에 나가게 되면
//여전히 MouseDown을 하고 있지 않더라도 canvas에서 그림이 그려지는 것을 확인할 수 있다(작은 버그)
//아래에서 이 문제를 고쳐보자

canvas.addEventListener("mouseleave", onMouseUp);
//canvas에서 mouseleave하면 MouseUp을 하겠다는 의미임

//다른 방법은
//canvas.addEventListener("mouseup", onMouseUp); 이것을
//document.addEventListener("mouseup", onMouseUp); 이걸로 바꿔주는 거임
//내 생각에 이거는 이전에 canvas에서만 적용되던 mouseUp을 documnet로 바꿔주면서 전체 웹 상에서 mouseUp을 listen하게 만든것 같음
