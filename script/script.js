(function(){
  // CANVAS CONFIG
  var canvasElement = document.getElementById('canvas');
  var ctx = canvasElement.getContext('2d');

  // CANVAS DRAW FUNCTION
  var headerHeight = 50;
  function draw() {
    ctx.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha +")";
    ctx.fillRect(mouseX, mouseY - headerHeight, size, size);
  }

  // CANVAS SIZE
  function setCanvasSize() {
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight - headerHeight;
  }
  setCanvasSize();
  window.onresize = setCanvasSize;

  // DRAWING CONTENT STYLES
  var red, green, blue, alpha, size, repeat;
  function updateDrawContentStyles() {
    red = document.getElementById('draw-color-red').value;
    green = document.getElementById('draw-color-green').value;
    blue = document.getElementById('draw-color-blue').value;
    alpha = document.getElementById('draw-color-alpha').value;
    size = document.getElementById('draw-size-px').value;
    repeat = document.getElementById('draw-repeat-ms').value;
  }
  updateDrawContentStyles();

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
    updateDrawContentStyles();
    draw();
    drawTimer = setInterval(draw, repeat);
  }
  canvasElement.addEventListener('mouseup', stopDrawing);
  function stopDrawing() {
    clearInterval(drawTimer);
  }
})();