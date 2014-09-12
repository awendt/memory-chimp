// http://www.colourlovers.com/palette/3459622/Flowering_Tiles

var $elements = {
  game_over: document.getElementById('game_over'),
  you_won: document.getElementById('you_won'),
};
var canvas = SVG('canvas').size(window.innerWidth-40, window.innerHeight-document.getElementById('canvas').offsetTop-20);
var board = new Board(canvas);
var stopwatch = new StopWatch({delay: 5, timer: document.getElementById('instructions')});
var level = 4;
var MAX_LEVEL = 9;

board.draw(level);
board.on('start', function() {
  stopwatch.reset();
  stopwatch.start();
});
board.on('done', function() {
  stopwatch.stop();
  document.getElementById("level"+level).classList.add("done");
  if (level == MAX_LEVEL) {
    $elements.you_won.classList.add("active");
  } else {
    level += 1;
    setTimeout(function() {
      board.draw(level);
    }, 500);
  }
});
board.on('fail', function() {
  stopwatch.stop();
  $elements.game_over.classList.add("active");
});

document.getElementById('start_over').addEventListener('click', function() {
  location.reload();
});

document.getElementById('retry').addEventListener('click', function() {
  $elements.game_over.classList.remove("active");
  board.draw(level);
});

document.body.addEventListener('touchmove', function(e){ e.preventDefault(); });
