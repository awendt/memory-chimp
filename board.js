function Board(canvas) {
  this.canvas = canvas;
  this.circles = [];
  this.text_nodes = [];
  this.handlers = {};
}

Board.prototype.empty = function() {
  while(this.circles.length > 0) {
    this.circles.pop().remove();
  }
  while(this.text_nodes.length > 0) {
    this.text_nodes.pop().remove();
  }
};

Board.prototype.draw = function(num_circles) {
  this.empty();

  var free_boxes = [{x: 0, y: 0, width: this.canvas.width(), height: this.canvas.height()}];
  var radius = 150;

  var calculate_free_boxes_within = function(box, draw_at) {
    var boxes = [];
    if (draw_at.y-box.y > radius) {
      boxes.push({x: box.x, y: box.y, width: draw_at.x+radius-box.x, height: draw_at.y-box.y});
    }
    if (draw_at.x-box.x > radius) {
      boxes.push({x: box.x, y: draw_at.y, width: draw_at.x-box.x, height: box.y+box.height-draw_at.y});
    }
    if (box.x+box.width-draw_at.x > 2*radius) {
      boxes.push({x: draw_at.x+radius, y: box.y, width: box.x+box.width-draw_at.x-radius, height: draw_at.y+radius-box.y});
    }
    if (box.x+box.width-draw_at.x > radius && (box.y+box.height-draw_at.y-radius) > radius) {
      boxes.push({x: draw_at.x, y: draw_at.y+radius, width: box.x+box.width-draw_at.x, height: box.y+box.height-draw_at.y-radius});
    }
    return boxes;
  };

  var replace_current_box = function(index, new_boxes) {
    Array.prototype.splice.apply(free_boxes, [index, 1].concat(new_boxes));
  };

  var random_position = function() {
    var index = Math.floor(Math.random() * free_boxes.length);
    var box = free_boxes[index];
    var draw_at = {
      x: Math.floor(Math.random()*(box.width-radius)) + box.x,
      y: Math.floor(Math.random()*(box.height-radius)) + box.y
    };
    replace_current_box(index, calculate_free_boxes_within(box, draw_at));
    return {x: draw_at.x, y: draw_at.y};
  };
  var targets = [];
  while (targets.length < num_circles) {
    targets.push(random_position());
  }
  var index;
  for (index=0; index < targets.length; ++index) {
    var group = canvas.group();
    var x = targets[index].x;
    var y = targets[index].y;
    this.circles.push(group
      .circle(radius)
      .stroke({color: '#675647', width: '10'})
      .fill({color: '#EEC05E'})
      .move(x, y)
      .data('index', index)
    );
    this.text_nodes.push(group
      .plain((index+1).toString())
      .font({family: 'Arial, Helvetica, sans-serif', size: 64})
      .center(x+(radius/2), y+(radius/2))
      .fill({color: '#675647'})
      .data('index', index)
    );
  }

  var check_click = function(board) {
    return function() {
      if (board.circles.length === num_circles) {
        // first move
        board.handlers.start();
        // remove all text_nodes
        for (index=0; index < board.text_nodes.length; ++index) {
          board.text_nodes[index].remove();
        }
      }
      var circle = board.circles.shift();
      circle.remove();
      if (circle.data('index') !== this.data('index')) {
        // remove all circles if user didn't touch the correct one
        board.empty();
        board.handlers.fail();
      }
      else if (board.circles.length === 0) {
        board.handlers.done();
      }
    }
  }

  this.text_nodes[0].on('click', check_click(this));
  this.text_nodes[0].on('touchstart', check_click(this));
  for (index=0; index < this.text_nodes.length; ++index) {
    this.circles[index].on('click', check_click(this));
    this.circles[index].on('touchstart', check_click(this));
  }
};

Board.prototype.on = function(input, fn) {
  this.handlers[input] = fn;
};