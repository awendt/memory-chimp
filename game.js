// http://www.colourlovers.com/palette/3459622/Flowering_Tiles

var canvas = SVG('canvas').size(window.innerWidth, window.innerHeight-109);
var board = new Board(canvas);
var level = 4;
board.draw(level);
board.on('done', function() {
  var level_banana = document.getElementById("level"+level);
  level_banana.className = level_banana.className + " done";
  level += 1;
  setTimeout(function() {
    board.draw(level);
  }, 500);
});
board.on('fail', function() {
  document.getElementById('game_over').className = 'active';
});

document.getElementById('retry').addEventListener('click', function() {
  document.getElementById('game_over').className = '';
  board.draw(level);
});

document.body.addEventListener('touchmove', function(e){ e.preventDefault(); });

// Responsibilities:
// 1. Drawing
// 2. User input (correct move, wrong move)
// 3. Gameplay (levels, notifications)
// 4. Stopwatch
