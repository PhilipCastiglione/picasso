var canvasElement = document.getElementById('canvas');
var ctx = canvasElement.getContext('2d');
canvasElement.addEventListener('click', draw);

canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight - 30;

function draw() {
  ctx.fillStyle = "rgba(150, 0, 50, .5)";
  var x = event.offsetX;
  var y = event.offsetY;
  ctx.fillRect(x, y, 10, 10);
}