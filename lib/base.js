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
