(function(){
"use strict";

  var VolleyDefend = window.VolleyDefend = window.VolleyDefend || {};
  var RADIUS = 5;
  var COLOR = "red";
  var Explosion = VolleyDefend.Explosion = function(obj){
    this.pos = obj.pos;
    this.radius = RADIUS;
    this.color = COLOR;
    this.index = 0;
    this.game = obj.game;
    this.interceptor = obj.interceptor;
  };

  Explosion.prototype.isCollidedWith = function (otherObject) {

    distance = Math.sqrt((Math.pow((this.pos[0] - otherObject.pos[0]), 2)) + (Math.pow((this.pos[1] - otherObject.pos[1]), 2)));
    if (distance < (this.radius + otherObject.radius))
      return true;
    else
      return false;
  };

  Explosion.prototype.collideWith = function(otherObject){
    if (otherObject instanceof VolleyDefend.Missile){
        this.game.remove(otherObject);

      }
  };

  Explosion.prototype.move = function() {

  };

  Explosion.sprite = new Image();
  Explosion.prototype.draw = function(ctx) {


    ctx.save();
    if (this.index > 81) {
      this.game.remove(this);
    }
    if (this.index < 40){
      this.radius += 0.8;
    }
    else {
      this.radius -= 1;
    }
    ctx.translate(this.pos[0], this.pos[1]);


    var rows = 9;
    var cols = 9;
    var width = 100;
    var height = 100;
    var x = this.index % (cols - 1) * width;
    var y = Math.floor(this.index / (rows - 1)) * height;
    Explosion.sprite.src = './assets/explosion-sheet.png';
    ctx.drawImage(Explosion.sprite, x, y, 100, 100, -30, -30, 64, 64);
    this.index += 1;
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "rgba(255, 0, 20, 0.2)";
      ctx.beginPath();
      ctx.arc(
        this.pos[0],
        this.pos[1],
        this.radius + 10,
        0,
        2 * Math.PI,
        true
      );
      ctx.fill();
  };

})();
