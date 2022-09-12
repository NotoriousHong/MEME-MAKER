const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.rect(50, 50, 100, 100);
ctx.rect(150, 150, 100, 100);
ctx.rect(250, 250, 100, 100);
ctx.fill();

ctx.beginPath(); 
//이 함수는 앞의 ctx와 뒤의 ctx의 경로를 분리시킨다 그래서 html에 검정색과 빨간색이 분리되어 칠해짐
ctx.rect(350, 350, 100, 100);
ctx.fillStyle = "red";
ctx.fill();