function Scoreboard(options) {
  this.containers = {
    best: options.best,
    score: options.score
  };
  this.storage_key = 'memchimp.personal_best'

  try {
    this.best = localStorage.getItem(this.storage_key) || 0;
  } catch (e) {
    this.best = 0;
  }

  this.score = 0;
  this.render();
};

Scoreboard.prototype.add = function(points) {
  this.score += points;
  if (this.best < this.score) {
    this.best = this.score;

    try {
      localStorage.setItem(this.storage_key, this.best);
    } catch (e) {
      // let's fail silently
    }
  }
  this.render();
};

Scoreboard.prototype.render = function() {
  this.containers.score.innerHTML = this.score;
  this.containers.best.innerHTML = this.best;
}