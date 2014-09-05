// implementation based on http://stackoverflow.com/a/20319035/473467

function StopWatch(options) {
  this.delay = options.delay;
  this.timer = options.timer;
};

StopWatch.prototype.stop = function() {
  if (this.interval) {
    clearInterval(this.interval);
    this.interval = null;
  }
};

StopWatch.prototype.start = function() {
  if (!this.interval) {
    this.offset = Date.now();
    this.interval = setInterval(stopwatch.update.bind(this), this.delay);
  }
};

StopWatch.prototype.reset = function() {
  this.clock = 0;
  this.render();
};

StopWatch.prototype.update = function() {
  this.clock += this.delta();
  this.render();
};

StopWatch.prototype.delta = function() {
  var now = Date.now(),
      d   = now - this.offset;

  this.offset = now;
  return d;
};

StopWatch.prototype.render = function() {
  this.timer.innerHTML = this.clock/1000;
}