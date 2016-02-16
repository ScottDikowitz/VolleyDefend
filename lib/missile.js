(function () {
  var VolleyDefend = window.VolleyDefend = window.VolleyDefend || {};

  var COLOR = "grey";
  var Missile = VolleyDefend.Missile = function(obj){
    this.durability = obj.durability;
    this.pos = obj.pos;
    this.color = COLOR;
    this.speed = obj.speed || 1;
    this.radius = 5;
    this.vel = VolleyDefend.Util.randomVec(this.speed);
    this.game = obj.game;
    // this.angle = Math.random()*360;
    // this.rotate();
    // this.spin = Math.random() * 2.5;
    this.removed = false;

  };
  VolleyDefend.Util.inherits(VolleyDefend.Missile, VolleyDefend.MovingObject);

  Missile.prototype.collideWith = function(otherObject){
  // if (otherObject instanceof VolleyDefend.Ship){
  //   if (!otherObject.invulnerable){
  //     this.game.removeLife();
  //     }
  //
  //   }
};

Missile.prototype.draw = function(ctx){

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
