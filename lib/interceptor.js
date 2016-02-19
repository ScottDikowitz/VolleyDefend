(function () {
  var VolleyDefend = window.VolleyDefend = window.VolleyDefend || {};

  var COLOR = "grey";
  var Interceptor = VolleyDefend.Interceptor = function(obj){
    this.durability = obj.durability;
    this.initialPos = [];
    this.finalPos = obj.mouse;
    this.initialPos.push(obj.pos[0]);
    this.initialPos.push(obj.pos[1]);
    this.pos = obj.pos;
    this.color = COLOR;
    this.speed = obj.speed || 1;
    this.radius = 2;
    this.vel = obj.vel;
    this.game = obj.game;
    this.removed = false;
    this.distance = Math.sqrt( Math.pow((this.pos[0]-this.finalPos.x), 2) + Math.pow((this.pos[1]-this.finalPos.y), 2) );


  };
  VolleyDefend.Util.inherits(VolleyDefend.Interceptor, VolleyDefend.MovingObject);

  Interceptor.prototype.isCollidedWith = function(obj) {

  };

  Interceptor.prototype.collideWith = function(otherObject){
  // if (otherObject instanceof VolleyDefend.Ship){
  //   if (!otherObject.invulnerable){
  //     this.game.removeLife();
  //     }
  //
  //   }
};

Interceptor.prototype.move = function(delta){
  var d = Math.sqrt( Math.pow((this.pos[0]-this.initialPos[0]), 2) + Math.pow((this.pos[1]-this.initialPos[1]), 2) );
  if (d < this.distance){
    this.pos[0] += this.vel[0] * delta / 3000;
    this.pos[1] += this.vel[1] * delta / 3000;
  }
  else {
    this.game.explosions.push(new VolleyDefend.Explosion({pos: this.pos, game: this.game}));
    this.game.remove(this);
  }
};

Interceptor.prototype.draw = function(ctx){
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
