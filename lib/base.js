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

  };

  Base.prototype.collideWith = function(otherObject) {

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
