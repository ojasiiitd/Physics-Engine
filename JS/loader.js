var win = window,
    doc = document,
    htm = doc.documentElement,
    body = doc.getElementsByTagName("body")[0];
    width = win.innerWidth || htm.clientWidth || body.clientWidth,
    height = win.innerHeight || htm.clientHeight || body.clientHeight;

var physicalObjects = [];

var canvas = document.createElement("canvas");
canvas.id = "canvas";
canvas.width = width;
canvas.height = height;

document.body.appendChild(canvas);

var ctx = canvas.getContext("2d");

var PhysicalObject = function(x , y , w , h)
{
    this.x = x;
    this.y = y;

    this.width = w;
    this.height = h;

    this.xVel = 0;
    this.yVel = 0;

    this.addXVel = function(vel)
    {
        this.xVel += vel;
    }
    this.addYVel = function(vel)
    {
        this.yVel += vel;
    }

    this.nextFrame = function()
    {
        this.x += this.xVel;
        this.y += this.yVel;
    }
}

function frameReader()
{
    ctx.clearRect(0 , 0 , width , height);

    for(var i=0 ; i<physicalObjects.length ; i++)
    {
        ctx.fillRect(
            physicalObjects[i].x,
            physicalObjects[i].y,
            physicalObjects.width,
            physicalObjects[i].height);
        
        physicalObjects[i].nextFrame();
    }
}

function frameRenderLoop()
{
    requestAnimationFrame(frameRenderLoop);
    frameReader();
}

frameRenderLoop();
physicalObjects.push(new PhysicalObject(100, 100, 20, 20));