var $elements = {
  game_over: document.getElementById('game-over'),
  you_won: document.getElementById('you-won'),
  instructions: document.getElementById('instructions')
};
var canvas = SVG('canvas').size(window.innerWidth-40, window.innerHeight-document.getElementById('canvas').offsetTop-20);
var board = new Board(canvas);
var stopwatch = new StopWatch({delay: 5, timer: $elements.instructions});
var level = 4;
var MAX_LEVEL = 9;
var scoreboard = new Scoreboard({
  score: document.getElementById('score-container'),
  best: document.getElementById('best-container')
})

board.draw(level);
board.on('start', function() {
  if (level == 4) {
    document.getElementById('scoreboard').classList.add("slide-in");
    $elements.instructions.classList.add("game-started");
  }
  stopwatch.reset();
  stopwatch.start();
});
board.on('done', function() {
  stopwatch.stop();
  scoreboard.add(Math.round(20000/stopwatch.elapsed()*level*level));
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

document.getElementById('start-over').addEventListener('click', function() {
  location.reload();
});

document.getElementById('retry').addEventListener('click', function() {
  $elements.game_over.classList.remove("active");
  board.draw(level);
});

document.body.addEventListener('touchmove', function(e){ e.preventDefault(); });
