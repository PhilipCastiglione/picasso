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
  function updateShapeColors() {
    
  }
  function updateDrawSample() {
    var drawSampleElement = document.getElementById('draw-sample');
    drawSampleElement.style.backgroundColor = "rgba(" + red + "," + green + "," + blue + "," + alpha +")";
    drawSampleElement.style.height = size + "px";
    drawSampleElement.style.width = size + "px";
  }
  function updateDrawContentStyles() {
    red = document.getElementById('red').value;
    green = document.getElementById('green').value;
    blue = document.getElementById('blue').value;
    alpha = document.getElementById('alpha').value;
    size = document.getElementById('size').value;
    if (document.getElementsByName('rate')[0].checked) {
      repeat = 0;
    } else {
      repeat = 10000;
    }
    updateShapeColors();
    updateDrawSample();
  }
  updateDrawContentStyles();
  var contentStyleElements = document.getElementsByClassName('content-style');
  for (var i = 0; i < contentStyleElements.length; i++) {
    contentStyleElements[i].addEventListener('change', updateDrawContentStyles);
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
    draw();
    drawTimer = setInterval(draw, repeat);
  }
  canvasElement.addEventListener('mouseup', stopDrawing);
  function stopDrawing() {
    clearInterval(drawTimer);
  }
})();