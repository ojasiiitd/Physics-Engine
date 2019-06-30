var win = window,
    doc = document,
    htm = doc.documentElement,
    body = doc.getElementsByTagName("body")[0];
    width = win.innerWidth || htm.clientWidth || body.clientWidth,
    height = win.innerHeight || htm.clientHeight || body.clientHeight;

var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = 400;
canvas.height = 400;

var ctx = canvas.getContext("2d");

box();

function box()
{
    ctx.lineWidth = 10;
    ctx.strokeStyle = "slateblue";
    ctx.strokeRect(0 , 0 , canvas.width , canvas.height);
}

var xPos , yPos ,
    xVel = 10 , yVel = -10,
    run;

function ball(x , y)
{
    ctx.fillStyle = "tomato";
    ctx.beginPath();
    ctx.arc(x , y , 14 , 0 , 2*Math.PI);
    ctx.fill();
    ctx.closePath();
}

function draw()
{
    ctx.clearRect(0 , 0 , canvas.width , canvas.height);
    box();

    console.log(xPos , yPos);
    ball(xPos , yPos);

    xPos += xVel;
    yPos += yVel;
    
    if(xPos >= canvas.width || xPos <= 0)
    	xVel *= -1;
    if(yPos >= canvas.height || yPos <= 0)
    	yVel *= -1;
}

function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const grav = document.querySelectorAll(".button")[0];
const stop = document.querySelectorAll(".button")[1];
grav.addEventListener("click" , start);
stop.addEventListener("click" , pause);

function start()
{
    xPos = getRandomInt(0 , canvas.width);
    yPos = getRandomInt(0 , canvas.height);

    clearInterval(run);
    run = setInterval(draw , 10);
}

function pause()
{
    clearInterval(run);
}