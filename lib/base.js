(function () {
  var VolleyDefend = window.VolleyDefend = window.VolleyDefend || {};

  var COLOR = "grey";
  var Base = VolleyDefend.Base = function(obj){

    this.pos = obj.pos;
    this.color = COLOR;
    this.speed = 1;
    this.radius = 60;
    this.vel = VolleyDefend.Util.randomVec(this.speed);
    this.game = obj.game;
    this.removed = false;
    this.end_x = 0;
    this.end_y = 0;
    this.health = 100;

  };

  Base.prototype.collideWith = function(otherObject) {

  };

  Base.prototype.changeColor = function(color) {
    this.color = color;
    var that = this;
    setTimeout(function(){that.color = "grey";}, 800);
  };

  Base.prototype.isCollidedWith = function (otherObject) {
    distance = Math.sqrt((Math.pow((this.pos[0] - otherObject.pos[0]), 2)) + (Math.pow((this.pos[1] - otherObject.pos[1]), 2)));
    if (distance < (this.radius + otherObject.radius))
      return true;
    else
      return false;
  };

  Base.prototype.move = function() {

  };

  Base.prototype.nosePos = function(ctx){
    var mouse = this.game.mouse;
    var dirx = mouse.x - this.pos[0];
    var diry = mouse.y - this.pos[1];
    var len = Math.sqrt( dirx*dirx + diry*diry);
    var dx = dirx / len;
    var dy = diry / len;

    this.end_x = this.pos[0] + 80 * dx;
    this.end_y = this.pos[1] + 80 * dy;
  };

  Base.prototype.fireMissile = function(ctx, marker) {
    var mouse = this.game.mouse;
    this.nosePos(ctx);
    this.game.friendlyMissiles.push(new VolleyDefend.Interceptor({pos: [this.end_x, this.end_y], game: this.game, vel: [mouse.x - this.pos[0],  mouse.y - this.pos[1]], mouse: mouse, marker: marker}));
  };

  Base.prototype.drawTurret = function(mouse, ctx) {
    this.nosePos(ctx);

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth="5";
    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.lineTo(this.end_x, this.end_y);
    ctx.stroke();
    ctx.restore();
  };

  Base.prototype.draw = function(ctx){
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      true
    );
    ctx.fill();
    ctx.restore();
  };
})();
