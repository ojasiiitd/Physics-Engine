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
    xVel = [] , yVel = [] , u = 0 ,
    g = 9.81 , run , runtime = 0 , flag = false;

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
    runtime += 15;
    for(var it = 0 ; it<xPos.length ; it++)
    {
        yPos[it] += yVel[it];

        if(u < 0 && (yVel[it] < 0.001 && yVel[it] > -0.001))
        {
            u = 0;
            yVel[it] = 0;
            runtime = 0;
        }

        if(yVel[it] >= 0 && u == 0)
            yVel[it] = (g*(runtime/1000));
        else
            yVel[it] = u + (g*(runtime/1000));
        
        if(yPos[it]+17 >= canvas.height)
        {
            yVel[it] *= -.9;
            u = yVel[it];
            runtime = 0;
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
    xVel.push(0);
    yVel.push(0);

    drawInit();
}

function newBall()
{
    xPos.push(getRandomInt(13 , canvas.width-13));
    yPos.push(getRandomInt(13 , canvas.height-13));
    xVel.push(0);
    yVel.push(0);

    drawInit();
}

function start()
{
    clearInterval(run);
    run = setInterval(draw , 15);
}

function pause()
{
    clearInterval(run);
}