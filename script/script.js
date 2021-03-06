(function(){

  //input (puts things into a queue)
  //canvas (includes headerheight)
  //draw/shapes
  //render (for the loop) includes sample and operates on a queue

  var page = {
    initialize: function() {
      // init event listeners
      for (var i = 0; i < this.shapes.length; i++) {
        this.shapes[i].addEventListener('click', draw.updateShape);
        this.shapes[i].addEventListener('click', style.update);
        this.shapes[i].addEventListener('click', style.render);
      }
      window.onmousemove = this.trackMouse;
    },
    headerHeight: document.getElementById('header').offsetHeight,
    shapes: document.getElementsByClassName('shape'),
    trackMouse: function() {
      page.mouseX = event.clientX;
      page.mouseY = event.clientY;
    }
  };

  var canvas = {
    initialize: function() {
      // init event listeners
      window.onresize = this.setSize;
      // set initial canvas size
      this.setSize();
    },
    element: document.getElementById('canvas'),
    context: document.getElementById('canvas').getContext('2d'),
    setSize: function() {
      canvas.element.width = window.innerWidth;
      canvas.element.height = window.innerHeight - page.headerHeight;
    },
    render: function() {
      draw[draw.shape]();
    },
    reset: function() {
      canvas.context.fillStyle = "rgb(255, 255, 255)";
      canvas.context.fillRect(0, 0, canvas.element.width, canvas.element.height);
    }
  };

  var style = {
    initialize: function() {
      // init properties
      style.red = document.getElementById('red');
      style.green = document.getElementById('green');
      style.blue = document.getElementById('blue');
      style.alpha = document.getElementById('alpha');
      this.update();
      // init event listeners
      for (var i = 0; i < this.styleElements.length; i++) {
        this.styleElements[i].addEventListener('change', this.update);
      }
    },
    styleElements: document.getElementsByClassName('content-style'),
    update: function() {
      style.rgba = "rgba(" + style.red.value + "," + style.green.value + "," + style.blue.value + "," + style.alpha.value +")";
      style.size = document.getElementById('size').value;
      if (document.getElementsByName('rate')[0].checked) {
        style.rate = 0;
      } else {
        style.rate = 10000;
      }
      sample.render();
    }
  };

  var sample = {
    initialize: function() {
      // display initial sample 
      this.render();
    },
    render: function() {
      page.mouseX = window.innerWidth - 85;
      page.mouseY = 140;
      canvas.context.fillStyle = "rgb(250, 250, 250)";
      canvas.context.fillRect(page.mouseX - 50, page.mouseY - page.headerHeight - 50, 100, 100);
      canvas.render();
    }
  };

  var draw = {
    initialize: function() {
      // init event listeners
      canvas.element.addEventListener('mousedown', draw.start);
      canvas.element.addEventListener('mouseup', draw.stop);
    },
    shape: 'square',
    updateShape: function() {
      draw.shape = event.target.dataset.shape;
    },
    start: function() {
      canvas.render();
      draw.timer = setInterval(canvas.render, style.rate);
    },
    stop: function() {
      clearInterval(draw.timer);
      history.store();
    },
    square: function() {
      canvas.context.fillStyle = style.rgba;
      canvas.context.fillRect(page.mouseX - style.size / 2, page.mouseY - page.headerHeight - style.size / 2, style.size, style.size);
    },
    circle: function() {
      canvas.context.beginPath();
      canvas.context.arc(page.mouseX, page.mouseY - page.headerHeight, style.size / 2, 0, Math.PI * 2, true);
      canvas.context.fillStyle = style.rgba;
      canvas.context.fill();
    },
    triangle: function() {
      canvas.context.beginPath();
      canvas.context.moveTo(page.mouseX, page.mouseY - style.size / 2 - page.headerHeight);
      canvas.context.lineTo(page.mouseX + style.size / 2, page.mouseY + style.size / 2 - page.headerHeight);
      canvas.context.lineTo(page.mouseX - style.size / 2, page.mouseY + style.size / 2 - page.headerHeight);
      canvas.context.fillStyle = style.rgba;
      canvas.context.fill();
    },
    diamond: function() {
      canvas.context.beginPath();
      canvas.context.moveTo(page.mouseX, page.mouseY - style.size / 2 - page.headerHeight);
      canvas.context.lineTo(page.mouseX + style.size / 2, page.mouseY - page.headerHeight);
      canvas.context.lineTo(page.mouseX, page.mouseY + style.size / 2 - page.headerHeight);
      canvas.context.lineTo(page.mouseX - style.size / 2, page.mouseY - page.headerHeight);
      canvas.context.fillStyle = style.rgba;
      canvas.context.fill();
    },
    star: function() {
      var alpha = 2 * Math.PI / 10; 
      canvas.context.beginPath();
      for(var i = 0; i < 11; i++) {
        var r = (style.size / 2) * (i % 2 + 1) / 2;
        var omega = alpha * i;
        canvas.context.lineTo((r * Math.sin(omega)) + page.mouseX, (r * Math.cos(omega)) + page.mouseY - page.headerHeight);
      }
      canvas.context.closePath();
      canvas.context.strokeStyle = style.rgba;
      canvas.context.stroke();
    },
    heart: function() {
      var x = page.mouseX;
      var y = page.mouseY - page.headerHeight;
      var s = style.size;
      canvas.context.beginPath();
      canvas.context.moveTo(x, y - s * 1.5 / 8);
      canvas.context.bezierCurveTo(x + s * 1.0 / 8, y - s * 3.5 / 8, x + s * 2.5 / 8, y - s * 3.5 / 8, x + s * 3.5 / 8, y - s * 2.0 / 8);
      canvas.context.bezierCurveTo(x + s * 4.0 / 8, y - s * 1.5 / 8, x + s * 4.0 / 8, y - s * 0.0 / 8, x + s * 2.0 / 8, y + s * 2.0 / 8);
      canvas.context.lineTo(x, y + s * 4 / 8);
      canvas.context.lineTo(x - s * 2 / 8, y + s * 2 / 8);
      canvas.context.bezierCurveTo(x - s * 4.0 / 8, y - s * 0.0 / 8, x - s * 4.0 / 8, y - s * 1.5 / 8, x - s * 3.5 / 8, y - s * 2.0 / 8);
      canvas.context.bezierCurveTo(x - s * 2.5 / 8, y - s * 3.5 / 8, x - s * 1.0 / 8, y - s * 3.5 / 8, x - s * 0.0 / 8, y - s * 1.5 / 8);
      canvas.context.strokeStyle = style.rgba;
      canvas.context.stroke();
    }
  };

  var history = {
    initialize: function() {
      // init event listeners
      document.getElementById('undo').addEventListener('click', this.undo);
      document.getElementById('redo').addEventListener('click', this.redo);
      this.store();
    },
    undoHistory: [],
    redoHistory: [],
    store: function() {
      history.undoHistory.push(canvas.context.getImageData(0, 0, canvas.element.width, canvas.element.height));
      history.redoHistory = [];
      console.log(history.undoHistory);
      console.log(history.redoHistory);
    },
    undo: function() {
      if (history.undoHistory.length > 1) {
        history.redoHistory.unshift(history.undoHistory.pop());
        canvas.element.getContext("2d").putImageData(history.undoHistory[history.undoHistory.length - 1], 0, 0);
        var img = document.createElement('img');
        img.src = canvas.element.toDataURL();
        canvas.reset();
        canvas.context.drawImage(img, 0, 0);
        sample.render();
      }
    },
    redo: function() {
      if (history.redoHistory.length > 0) {
        history.undoHistory.push(history.redoHistory.pop());
        canvas.element.getContext("2d").putImageData(history.redoHistory[history.redoHistory.length - 1], 0, 0);
        var img = document.createElement('img');
        img.src = canvas.element.toDataURL();
        canvas.reset();
        canvas.context.drawImage(img, 0, 0);
        sample.render();
      }
    }
  }

  page.initialize();
  canvas.initialize();
  style.initialize();
  sample.initialize();
  draw.initialize();
  history.initialize();

})();
