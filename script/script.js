(function(){
  // CANVAS CONFIG
  var canvasElement = document.getElementById('canvas');
  var ctx = canvasElement.getContext('2d');

  // DRAW SAMPLE
  var headerHeight = document.getElementById('header').offsetHeight;
  function updateDrawSample() {
    mouseX = window.innerWidth - 85;
    mouseY = 140;
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.fillRect(mouseX - 50, mouseY - headerHeight - 50, 100, 100);
    drawShape();
  }
  var shape = 'square';
  function updateShape() {
    shape = event.target.dataset.shape;
    updateDrawSample();
  }

  // EVENT LISTENERS
  var shapes = document.getElementsByClassName('shape');
  for (var i = 0; i < shapes.length; i++) {
    shapes[i].addEventListener('click', updateShape);
  }

  // SHAPES
  function drawSquare() {
    ctx.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha +")";
    ctx.fillRect(mouseX - size / 2, mouseY - headerHeight - size / 2, size, size);
  }
  function drawCircle() {
    ctx.beginPath();
    ctx.arc(mouseX, mouseY - headerHeight, size / 2, 0, Math.PI*2, true);
    ctx.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha +")";
    ctx.fill();
  }
  function drawTriangle() {
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY - size / 2 - headerHeight);
    ctx.lineTo(mouseX + size / 2, mouseY + size / 2 - headerHeight);
    ctx.lineTo(mouseX - size / 2, mouseY + size / 2 - headerHeight);
    ctx.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha +")";
    ctx.fill();
  }
  function drawDiamond() {
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY - size / 2 - headerHeight);
    ctx.lineTo(mouseX + size / 2, mouseY - headerHeight);
    ctx.lineTo(mouseX, mouseY + size / 2 - headerHeight);
    ctx.lineTo(mouseX - size / 2, mouseY - headerHeight);
    ctx.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha +")";
    ctx.fill();
  }
  function drawStar() {
    var alpha = 2 * Math.PI / 10; 
    ctx.beginPath();
    for(var i = 0; i < 11; i++) {
        var r = (size / 2) * (i % 2 + 1) / 2;
        var omega = alpha * i;
        ctx.lineTo((r * Math.sin(omega)) + mouseX, (r * Math.cos(omega)) + mouseY - headerHeight);
    }
    ctx.closePath();
    ctx.strokeStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha +")";
    ctx.stroke();
  }

  // CANVAS STATE
  function resetCanvas() {
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
  }
  function save() {
    // undoHistory.push(canvasElement.toDataURL());
  }
  var undoHistory = [];
  var redoHistory = [];
  document.getElementById('save').addEventListener('click', save);
  function undo() {
    redoHistory.push(undoHistory.pop());
    var img = document.createElement('img')
    img.src = redoHistory[redoHistory.length - 1];
    resetCanvas();
    ctx.drawImage(img, 0, 0);
    updateDrawSample();
  }
  document.getElementById('undo').addEventListener('click', undo);
  function redo() {
    undoHistory.push(redoHistory.pop());
    var img = document.createElement('img')
    img.src = undoHistory[undoHistory.length - 1];
    resetCanvas();
    ctx.drawImage(img, 0, 0);
    updateDrawSample();
  }
  document.getElementById('redo').addEventListener('click', redo);

  // CANVAS DRAW FUNCTION
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
      case 'star':
        drawStar();
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
    // save();
    drawShape();
    drawTimer = setInterval(drawShape, repeat);
  }
  canvasElement.addEventListener('mouseup', stopDrawing);
  function stopDrawing() {
    clearInterval(drawTimer);
    // maybe make this clear all timers somehow
  }
})();