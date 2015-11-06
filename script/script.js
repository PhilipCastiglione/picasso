// CANVAS CONFIG
var canvasElement = document.getElementById('canvas');
var ctx = canvasElement.getContext('2d');

// CANVAS DRAW FUNCTION
function draw() {
  var red = document.getElementById('draw-color-red').value;
  var green = document.getElementById('draw-color-green').value;
  var blue = document.getElementById('draw-color-blue').value;
  var alpha = document.getElementById('draw-color-alpha').value;
  ctx.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha +")";
  
  var x = mouseX;
  var y = mouseY - headerHeight;
  ctx.fillRect(x, y, 5, 5);
}

// EVENTS
// CANVAS SIZE
var headerHeight = 50;
function setCanvasSize() {
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight - headerHeight;
}
setCanvasSize();
window.onresize = setCanvasSize;

// MOUSE TRACKING
var mouseX, mouseY;
function trackMouse() {
  mouseX = event.clientX;
  mouseY = event.clientY;
}
window.onmousemove = trackMouse;

// DRAWING MOUSE EVENTS
canvasElement.addEventListener('mousedown', startDrawing);
var drawTimer;
function startDrawing() {
  drawTimer = setInterval(draw, 20);
}
canvasElement.addEventListener('mouseup', stopDrawing);
function stopDrawing() {
  clearInterval(drawTimer);
}
