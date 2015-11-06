// CANVAS CONFIG
var canvasElement = document.getElementById('canvas');
var ctx = canvasElement.getContext('2d');

// CANVAS DRAW FUNCTION
function draw() {
  ctx.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha +")";
  ctx.fillRect(mouseX, mouseY - headerHeight, size, size);
}

// CANVAS SIZE
var headerHeight = 50;
function setCanvasSize() {
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight - headerHeight;
}
setCanvasSize();
window.onresize = setCanvasSize;

// DRAWING CONTENT EVENTS
var red, green, blue, alpha, size;
function updateDrawContentStyle() {
  red = document.getElementById('draw-color-red').value;
  green = document.getElementById('draw-color-green').value;
  blue = document.getElementById('draw-color-blue').value;
  alpha = document.getElementById('draw-color-alpha').value;
  size = document.getElementById('draw-size-px').value;
}
updateDrawContentStyle();
var contentStyles = document.getElementsByClassName('content-style');
for (var i = 0; i < contentStyles.length - 1; i++) {
  contentStyles[i].addEventListener('change', updateDrawContentStyle);
}

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
