var win = window,
    doc = document,
    htm = doc.documentElement,
    body = doc.getElementsByTagName("body")[0];
    width = win.innerWidth || htm.clientWidth || body.clientWidth,
    height = win.innerHeight || htm.clientHeight || body.clientHeight;

var canvas = document.createElement("canvas");
canvas.id = "canvas";
canvas.width = width/1.01;
canvas.height = height/1.05;

var canvasPiece = document.getElementsByClassName("big")[0];
canvasPiece.appendChild(canvas);
var ctx = canvas.getContext("2d");

drawShape();

function drawShape()
{
    ctx.lineWidth = 10;
    ctx.strokeRect(0 , 0 , width/1.01 , height/1.05);

    ctx.beginPath();
    ctx.moveTo(width/5 , height/5);
    ctx.lineTo(width/5  , height/1.3);
    ctx.lineTo(width/1.3 , height/1.3);
    ctx.closePath();

    ctx.lineWidth = 6;
    ctx.strokeStyle = "slateblue";
    ctx.stroke();
}

window.addEventListener("click" , renderBalls);

function renderBalls()
{
    var xPos = event.clientX,
        yPos = event.clientY;
    drawBall(xPos , yPos);
}

function drawBall(x , y)
{
    ctx.beginPath();
    ctx.moveTo(x , y);
    ctx.arc(x , y , 13 , 0 , 2*Math.PI);

    ctx.fillStyle = "tomato";
    ctx.fill();
}

const gravityBtn = document.querySelector(".button");

gravityBtn.addEventListener("click" , physics);

function physics()
{
    
}