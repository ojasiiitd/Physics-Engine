var win = window,
    doc = document,
    htm = doc.documentElement,
    body = doc.getElementsByTagName("body")[0];
    width = win.innerWidth || htm.clientWidth || body.clientWidth,
    height = win.innerHeight || htm.clientHeight || body.clientHeight;

var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = width-16;
canvas.height = 800;
var ctx = canvas.getContext("2d");

const addBall = document.querySelectorAll(".button")[0];
const grav = document.querySelectorAll(".button")[1];
const stop = document.querySelectorAll(".button")[2];

addBall.addEventListener("click" , newBall);
grav.addEventListener("click" , start);
stop.addEventListener("click" , pause);
canvas.addEventListener("click" , pointerBall);

var colors = [
    "tomato" , "blueviolet" , 
    "lime" , "snow" , 
    "brown" , "black" ,
    "orange" ,  "tan"
    ];
var xPos = [] , yPos = [] ,
    xVel = [] , yVel = [] , u = [] ,
    runtime = [] , g = 9.81 , restitution = 0.99 ,
    run , runInterval = 1 ;

function pointerBall()
{
    xPos.push(event.clientX);
    yPos.push(event.clientY);
    xVel.push(0);
    yVel.push(0);
    u.push(0);
    runtime.push(0);

    drawInit();
}

function newBall()
{
    xPos.push(getRandomInt(13 , canvas.width-13));
    yPos.push(getRandomInt(13 , canvas.height-13));
    xVel.push(0);
    yVel.push(0);
    u.push(0);
    runtime.push(0);

    drawInit();
}

function start()
{
    clearInterval(run);
    run = setInterval(draw , runInterval);
}

function pause()
{
    clearInterval(run);
}

box();
function box()
{
    ctx.lineWidth = 10;
    ctx.strokeStyle = "red";
    ctx.strokeRect(0 , 0 , canvas.width , canvas.height);
}

function ball(x , y)
{
    ctx.fillStyle = "blueviolet";
    for(var c = 0 ; c<x.length ; c++)
    {
        ctx.beginPath();
        ctx.arc(x[c] , y[c] , 14 , 0 , 2*Math.PI);
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
    for(var it = 0 ; it<yPos.length ; it++)
        runtime[it] += runInterval;
    for(var it = 0 ; it<yPos.length ; it++)
    {
        yPos[it] += yVel[it];

        if(yVel[it] >= 0 && u[it] == 0)
            yVel[it] = (g*(runtime[it]/1000));
        else
            yVel[it] = u[it] + (g*(runtime[it]/1000));
        
        if(yPos[it]+19 >= canvas.height)
        {
            runtime[it] = 0;
            yVel[it] *= (-1);
            yVel[it] *= (restitution);
            u[it] = yVel[it];
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
    return Math.random() * (max - min + 1) + min;15
}