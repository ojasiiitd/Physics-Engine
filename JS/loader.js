var win = window,
    doc = document,
    htm = doc.documentElement,
    body = doc.getElementsByTagName("body")[0];
    width = win.innerWidth || htm.clientWidth || body.clientWidth,
    height = win.innerHeight || htm.clientHeight || body.clientHeight;

var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = width-18;
canvas.height = 800;
var ctx = canvas.getContext("2d");

const addBall = document.querySelector("#moreBalls");
const grav = document.querySelector("#gravity");
const stop = document.querySelector("#stopAll");

addBall.addEventListener("click" , newBall);
grav.addEventListener("click" , start);
stop.addEventListener("click" , pause);
canvas.addEventListener("click" , pointerBall);

var colors = [
    "tomato" , "blueviolet" , 
    "lime" , "snow" , 
    "orange"
    ];

var ballColor = [] , xPos = [] , yPos = [] ,
    xVel = [] , yVel = [] , u = [] ,
    runtime = [] , g = 9.81 , restitution = 0.99 ,
    run , runInterval = 100 , radius = 10 , initialX;

function pointerBall()
{
    initialX = getRandomInt(-5 , 5);
    ballColor.push(colors[getRandomInt(0 , colors.length-1)]);
    xPos.push(event.clientX);
    yPos.push(event.clientY);
    xVel.push(initialX);
    yVel.push(0);
    u.push(0);
    runtime.push(0);

    drawInit();
}

function newBall()
{
    initialX = getRandomInt(-5 , 5);
    ballColor.push(colors[getRandomInt(0 , colors.length-1)]);
    xPos.push(getRandomInt(13 , canvas.width-13));
    yPos.push(getRandomInt(13 , canvas.height-13));
    xVel.push(initialX);
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
    ctx.strokeStyle = "slateblue";
    ctx.strokeRect(0 , 0 , canvas.width , canvas.height);
}

function ball()
{
    for(var c = 0 ; c<xPos.length ; c++)
    {
        ctx.fillStyle = ballColor[c];
        ctx.beginPath();
        ctx.arc(xPos[c] , yPos[c] , 2*radius , 0 , 2*Math.PI);
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
        xPos[it] += xVel[it];
        yPos[it] += yVel[it];

        if(xVel[it] <= 0.3 && xVel[it] >= (-0.3))
            xVel[it] = 0;
        if(yVel[it] <= 0.3 && yVel[it] >= (-0.3))
            yVel[it] = 0;

        if(yVel[it] >= 0 && u[it] == 0)
            yVel[it] = (g*(runtime[it]/1000));
        else
            yVel[it] = u[it] + (g*(runtime[it]/1000));
        
        if(xPos[it]+16+radius >= canvas.width || xPos[it]-16-radius <= 0)
            xVel[it] *= (-1);

        if(yPos[it]+16+radius >= canvas.height)
        {
            runtime[it] = 0;
            yVel[it] *= (-1);
            yVel[it] *= (restitution);
            u[it] = yVel[it];
        }
    }

    drawInit();
    checkCollision();
}

function checkCollision()
{
    for(var i=0 ; i<xPos.length ; i++)
    {
        for(var j=0 ; j<xPos.length ; j++)
        {
            if(i == j)
                continue;
            
            var dist = Math.sqrt(((xPos[j]-xPos[i])*(xPos[j]-xPos[i])) + ((yPos[j]-yPos[i])*(yPos[j]-yPos[i])));
            console.log(dist);
            if(dist <= 2*radius)
            {
                ballColor[i] = "yellow";
                ballColor[j] = "yellow";
            }
        }
    }
}

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max)
{
    return Math.random() * (max - min + 1) + min;15
}