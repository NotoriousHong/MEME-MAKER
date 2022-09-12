const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

//앞에 1.2에서 배웠던 rect function을 분해해서 그려보자
//rect function을 분해해서 선 하나하나로 그린거를 나타낸거임 아래는
ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
ctx.lineTo(150, 150);
ctx.lineTo(50, 150);
ctx.lineTo(50, 50);
ctx.fill(); //ctx.stroke(); 하면 그냥 선만 그려짐