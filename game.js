(function() {
  var draw = SVG('canvas').size(window.innerWidth, window.innerHeight);
  var free_boxes = [{x: 0, y: 0, width: draw.width(), height: draw.height()}];
  var radius = 50;
  var num_circles = 6;

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
  var circles = [];
  var text_nodes = [];
  var index;
  for (index=0; index < targets.length; ++index) {
    var group = draw.group();
    var x = targets[index].x;
    var y = targets[index].y;
    circles.push(group
      .circle(radius)
      .stroke({color: '#69B6D1', width: '5'})
      .fill({color: '#E6DBCA'})
      .move(x, y)
      .data('index', index)
    );
    text_nodes.push(group
      .plain((index+1).toString())
      .font({family: 'Arial, Helvetica, sans-serif', size: 30})
      .center(x+(radius/2), y+(radius/2))
      .fill({color: '#69B6D1'})
      .data('index', index)
    );
  }
  var check_click = function() {
    if (circles.length === num_circles) {
      // remove all text_nodes if this is the first move
      for (index=0; index < text_nodes.length; ++index) {
        text_nodes[index].remove();
      }
    }
    var circle = circles.shift();
    circle.remove();
    if (circle.data('index') !== this.data('index')) {
      // remove all circles if user didn't touch the correct one
      while(circles.length > 0) {
        circles.pop().remove();
      }
      alert("YOU LOSE!");
    }
    // if (circles.length === 0) {
    //   LEVEL UP!
    // }
  }

  text_nodes[0].on('click', check_click);
  for (index=0; index < text_nodes.length; ++index) {
    circles[index].on('click', check_click);
  }

}());
