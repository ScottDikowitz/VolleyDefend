(function () {
  var VolleyDefend = window.VolleyDefend = window.VolleyDefend || {};

  var COLOR = "grey";
  var Missile = VolleyDefend.Missile = function(obj){
    this.durability = obj.durability;
    this.initialPos = [];
    this.initialPos.push(obj.pos[0]);
    this.initialPos.push(obj.pos[1]);
    this.pos = obj.pos;
    this.color = COLOR;
    this.speed = obj.speed || 1;
    this.radius = 2;
    this.vel = VolleyDefend.Util.randomVec(this.speed);
    // this.vel = [500 - this.pos[0], 600 - this.pos[1]];
    this.game = obj.game;
    // this.angle = Math.random()*360;
    // this.rotate();
    // this.spin = Math.random() * 2.5;
    this.removed = false;

  };
  VolleyDefend.Util.inherits(VolleyDefend.Missile, VolleyDefend.MovingObject);

  Missile.prototype.collideWith = function(otherObject){
  if (otherObject instanceof VolleyDefend.Explosion){
      this.game.remove(this);

    }
};

Missile.prototype.move = function(delta){
  this.pos[0] += this.vel[0] * delta / 20;
  this.pos[1] += this.vel[1] * delta / 20;

  if (this.game.isOutOfBounds(this.pos)){
    this.game.remove(this);
  }
};

Missile.prototype.isCollidedWith = function(otherObject){
  distance = Math.sqrt((Math.pow((this.pos[0] - otherObject.pos[0]), 2)) + (Math.pow((this.pos[1] - otherObject.pos[1]), 2)));
  if (distance < (this.radius + otherObject.radius))
    return true;
  else
    return false;
};

Missile.prototype.draw = function(ctx){
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(this.initialPos[0], this.initialPos[1]);
  ctx.lineTo(this.pos[0], this.pos[1]);
  ctx.stroke();
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
