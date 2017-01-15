$(document).ready(function(){


var mousePressed = false;
var lastX, lastY, originX, originY, duringX, duringY, endX, endY, tool;
var ctx;
var canvas = document.getElementById('myCanvas')
ctx = canvas.getContext("2d");

         
        var isActive = false


$("#line").click(function(){ 
    Line();
})
$("#carre").click(function(){
    Rec();
})

function Line() {
    console.log();
    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        originX = e.pageX - $(this).offset().left
        originY = e.pageY - $(this).offset().top
        Draw(originX, originY, false);
    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
        duringX = e.pageX - $(this).offset().left
        duringY = e.pageY - $(this).offset().top
        Draw(duringX, duringY, true);
        }
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
        endX = e.pageX - $(this).offset().left
        endY = e.pageY - $(this).offset().top
        Draw(duringX, duringY, true);
    });
	
    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
    });
}

function Rec() {
    
    ctx = document.getElementById('myCanvas').getContext("2d");

    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        originX = e.pageX - $(this).offset().left
        originY = e.pageY - $(this).offset().top
        DrawRectangle(originX, originY, false);
    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
        duringX = e.pageX - $(this).offset().left
        duringY = e.pageY - $(this).offset().top
        DrawRectangle(duringX, duringY, false);
        }
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
        endX = e.pageX - $(this).offset().left
        endY = e.pageY - $(this).offset().top
        DrawRectangle(duringX, duringY, true);
    });
	
    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
    });
}


function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}


function DrawRectangle(x, y, isDown) {
    if (isDown) {
        var width= endX-originX;
        console.log(width);
        var height= endY-originY;
        console.log(height)
        ctx.beginPath();
        ctx.rect(originX, originY, width,height);
        ctx.stroke();
        ctx.closePath();
    }
        lastX = x; lastY = y;
}



$("#clear").click(function(){
    console.log("cleeaaar")
    clearArea();
})
function clearArea() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
var data=imgData.data;
for(var i=0;i<data.length;i+=4){
    if(data[i+3]<255){
        data[i]=255;
        data[i+1]=255;
        data[i+2]=255;
        data[i+3]=255;
    }
}
ctx.putImageData(imgData,0,0);
}



function download() {
    var dt = canvas.toDataURL('image/png');
    this.href = dt;
};

$("#downloadLnk").click(function(){
    console.log("download")
    download();
})





   
    
})