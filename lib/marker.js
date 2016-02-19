(function(){
"use strict";

  var VolleyDefend = window.VolleyDefend = window.VolleyDefend || {};
  var RADIUS = 15;
  var COLOR = "blue";
  var Marker = VolleyDefend.Marker = function(obj){
    this.pos = obj.pos;
    this.radius = RADIUS;
    this.color = COLOR;
    this.index = 0;
    this.game = obj.game;
  };

  Marker.prototype.isCollidedWith = function (otherObject) {
    //
    // distance = Math.sqrt((Math.pow((this.pos[0] - otherObject.pos[0]), 2)) + (Math.pow((this.pos[1] - otherObject.pos[1]), 2)));
    // if (distance < (this.radius + otherObject.radius))
    //   return true;
    // else
    //   return false;
  };

  Marker.prototype.collideWith = function(otherObject){
    // if (otherObject instanceof VolleyDefend.Missile){
    //   if (!otherObject.removed){
    //     otherObject.removed = true;
    //     this.game.remove(otherObject);
    //   }
    // }
  };

  Marker.prototype.move = function(delta) {

  };

  Marker.prototype.draw = function(ctx) {


    ctx.save();
    // ctx.translate(this.pos[0], this.pos[1]);
    ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
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
      ctx.restore();
  };

})();
