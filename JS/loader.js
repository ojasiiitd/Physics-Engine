var win = window,
    doc = document,
    htm = doc.documentElement,
    body = doc.getElementsByTagName("body")[0];
    width = win.innerWidth || htm.clientWidth || body.clientWidth,
    height = win.innerHeight || htm.clientHeight || body.clientHeight;

var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = width-30;
canvas.height = 800;

var ctx = canvas.getContext("2d");

box();

function box()
{
    ctx.lineWidth = 10;
    ctx.strokeStyle = "slateblue";
    ctx.strokeRect(0 , 0 , canvas.width , canvas.height);
}

var xPos = [] , yPos = [] ,
    xVel = [] , yVel = [],
    run;

function ball(x , y)
{
    ctx.fillStyle = "tomato";
    for(var center = 0 ; center<x.length ; center++)
    {
        ctx.beginPath();
        ctx.arc(x[center] , y[center] , 14 , 0 , 2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

function drawInit()
{
    ctx.clearRect(0 , 0 , canvas.width , canvas.height);
    box();

    ball(xPos , yPos);   
}

function draw()
{
    for(var it = 0 ; it<xPos.length ; it++)
    {
        xPos[it] += xVel[it];
        yPos[it] += yVel[it];

        if(xPos[it]+8 >= canvas.width || xPos[it]-8 <= 0)
        {
            xVel[it] *= -1;
            if(yVel[it] > 0)
                yVel[it] -= .4;
            else
                yVel[it] += .4;
        }
        if(yPos[it]+8 >= canvas.height || yPos[it]-8 <= 0)
        {
            yVel[it] *= -1;
            if(xVel[it] > 0)
                xVel[it] -= .4;
            else
                xVel[it] += .4;
        }
    }

    drawInit();
}

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max)
{
    return Math.random() * (max - min + 1) + min;
}

const addBall = document.querySelectorAll(".button")[0];
const grav = document.querySelectorAll(".button")[1];
const stop = document.querySelectorAll(".button")[2];
addBall.addEventListener("click" , newBall);
grav.addEventListener("click" , start);
stop.addEventListener("click" , pause);

canvas.addEventListener("click" , pointerBall);

function pointerBall()
{
    xPos.push(event.clientX);
    yPos.push(event.clientY);
    xVel.push(getRandomFloat(0.1 , 7));
    yVel.push(getRandomFloat(0.1 , 7));

    drawInit();
}

function newBall()
{
    xPos.push(getRandomInt(13 , canvas.width-13));
    yPos.push(getRandomInt(13 , canvas.height-13));
    xVel.push(getRandomFloat(0.1 , 7));
    yVel.push(getRandomFloat(0.1 , 7));

    drawInit();
}

function start()
{
    clearInterval(run);
    run = setInterval(draw , 10);
}

function pause()
{
    clearInterval(run);
}