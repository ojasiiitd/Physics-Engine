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
    xVel , yVel,
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

    ball(xPos , yPos);

    xPos += xVel;
    yPos += yVel;

    if(xVel == 0 || yVel == 0)
        stop.click();

    if(xPos >= canvas.width || xPos <= 0)
    {
        xVel *= -1;
        if(yVel > 0)
            yVel -= .4;
        else
            yVel += .4;
    }
    if(yPos >= canvas.height || yPos <= 0)
    {
        yVel *= -1;
        if(xVel > 0)
            xVel -= .4;
        else
            xVel += .4;
    }
}

function getRandomInt(min, max)
{
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
    xVel = 5.2;
    yVel = 5.2;

    clearInterval(run);
    run = setInterval(draw , 10);
}

function pause()
{
    clearInterval(run);
}