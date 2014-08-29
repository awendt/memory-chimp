// http://www.colourlovers.com/palette/3459622/Flowering_Tiles

var canvas = SVG('canvas').size(window.innerWidth, window.innerHeight);
var board = new Board(canvas);
var level = 4;
board.draw(level);
board.on('done', function() {
  var level_banana = document.getElementById("level"+level);
  level_banana.className = level_banana.className + " done";
  level += 1;
  board.draw(level);
});
board.on('fail', function() {
  alert("YOU LOSE!");
});

// Responsibilities:
// 1. Drawing
// 2. User input (correct move, wrong move)
// 3. Gameplay (levels, notifications)
// 4. Stopwatch
