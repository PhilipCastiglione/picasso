var canvasElement = document.getElementById('canvas');
var ctx = canvasElement.getContext('2d');
canvasElement.addEventListener('click', draw);

canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight - 50;

function draw() {
  var red = document.getElementById('draw-color-red').value;
  var green = document.getElementById('draw-color-green').value;
  var blue = document.getElementById('draw-color-blue').value;
  var alpha = document.getElementById('draw-color-alpha').value;
  ctx.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha +")";
  
  var x = event.offsetX;
  var y = event.offsetY;
  ctx.fillRect(x, y, 10, 10);
}