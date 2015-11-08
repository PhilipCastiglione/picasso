(function(){
  // CANVAS CONFIG
  var canvasElement = document.getElementById('canvas');
  var ctx = canvasElement.getContext('2d');

  // CANVAS DRAW FUNCTION
  var shape = 'square';
  function updateDrawSample() {
    mouseX = window.innerWidth - 85;
    mouseY = 140;
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.fillRect(mouseX - 50, mouseY - headerHeight - 50, 100, 100);
    drawShape();
  }
  function updateShape() {
    shape = event.target.dataset.shape;
    updateDrawSample();
  }
  var shapes = document.getElementsByClassName('shape');
  for (var i = 0; i < shapes.length; i++) {
    shapes[i].addEventListener('click', updateShape);
  }
  var headerHeight = document.getElementById('header').offsetHeight;
  function drawSquare() {
    ctx.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha +")";
    ctx.fillRect(mouseX - size / 2, mouseY - headerHeight - size / 2, size, size);
  }
  function drawCircle() {
    ctx.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha +")";
    ctx.beginPath();
    ctx.arc(mouseX, mouseY - headerHeight, size / 2, 0, Math.PI*2, true);
    ctx.fill();
  }
  function drawTriangle() {
    ctx.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha +")";
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY - size / 2 - headerHeight);
    ctx.lineTo(mouseX + size / 2, mouseY + size / 2 - headerHeight);
    ctx.lineTo(mouseX - size / 2, mouseY + size / 2 - headerHeight);
    ctx.fill();
  }
  function drawDiamond() {
    ctx.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha +")";
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY - size / 2 - headerHeight);
    ctx.lineTo(mouseX + size / 2, mouseY - headerHeight);
    ctx.lineTo(mouseX, mouseY + size / 2 - headerHeight);
    ctx.lineTo(mouseX - size / 2, mouseY - headerHeight);
    ctx.fill();
  }
  function drawShape() {
    switch (shape) {
      case 'square':
        drawSquare();
        break;
      case 'circle':
        drawCircle();
        break;
      case 'triangle':
        drawTriangle();
        break;
      case 'diamond':
        drawDiamond();
        break;
      default:
        console.log('drawShape error');
        break;
    }
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
    drawShape();
    drawTimer = setInterval(drawShape, repeat);
  }
  canvasElement.addEventListener('mouseup', stopDrawing);
  function stopDrawing() {
    clearInterval(drawTimer);
    // maybe make this clear all timers somehow
  }
})();