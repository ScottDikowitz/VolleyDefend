(function () {
  "use strict";
  var VolleyDefend = window.VolleyDefend = window.VolleyDefend || {};


  var NUM_MISSILES = 25;

var Game = VolleyDefend.Game = function(dims, ctx){
  this.DIM_X = dims.DIM_X;
  this.DIM_Y = dims.DIM_Y;
  this.foreignMissiles = [];
  this.friendlyMissiles = [];
  this.explosions = [];
  this.markers = [];
  this.bases = [new VolleyDefend.Base({pos: [(ctx.canvas.width / 2) / 2, this.DIM_Y], game: this})];
  this.bases.push(new VolleyDefend.Base({pos: [ctx.canvas.width / 2, this.DIM_Y], game: this}));
  this.bases.push(new VolleyDefend.Base({pos: [(ctx.canvas.width * 0.75), this.DIM_Y], game: this}));
  this.numMissiles = NUM_MISSILES || 1;
  this.addMissiles(this.numMissiles);
  this.score = 0;
  this.gameOver = false;
  // this.activeBase = this.bases[1];
  this.activeBaseIdx = 1;
  this.mouse = {x: 0, y: 0};
};

Game.prototype.step = function(delta){
  this.moveObjects(delta);
  this.checkCollisions();
};

Game.prototype.clickedBases = function(){
  for (var idx = 0; idx < this.bases.length; idx ++){
    var distancesquared = (this.mouse.x - this.bases[idx].pos[0]) * (this.mouse.x - this.bases[idx].pos[0]) + (this.mouse.y - this.bases[idx].pos[1]) * (this.mouse.y - this.bases[idx].pos[1]);
    if (distancesquared <= this.bases[idx].radius * this.bases[idx].radius){
      console.log("clicked!");
      this.activeBaseIdx = idx;
      return true;
    }
  }
  console.log("not clicked!");
  return false;
};

Game.prototype.changeActive = function(dir){
  this.activeBaseIdx += dir;
  if (this.activeBaseIdx < 0){
    this.activeBaseIdx = 0;
  }
  else if(this.activeBaseIdx > 2) {
    this.activeBaseIdx = 2;
  }
};
Game.prototype.moveObjects = function(delta){
    // debugger;
    this.allObjects().forEach(function(obj){
      obj.move(delta);
    });

  };

  Game.prototype.isOutOfBounds = function(pos){
    if ((pos[0] > this.DIM_X) || (pos[0] < 0)) {
      return true;
    }
    else if ((pos[1] < 0 || (pos[1] > this.DIM_Y))) {
      return true;
    }
    else{
      return false;
    }
  };

  Game.prototype.checkCollisions = function() {
    for(var i = 0; i < this.allObjects().length - 1; i++){
      for (var j = (i + 1); j < this.allObjects().length; j++){
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {

          this.allObjects()[i].collideWith(this.allObjects()[j]);
          if (this.allObjects()[j]){
          this.allObjects()[j].collideWith(this.allObjects()[i]);
        }
          // this.allObjects()[i].collideWith(this.allObjects()[j]);
        }
      }
    }
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
    this.bases[this.activeBaseIdx].drawTurret(this.mouse, ctx);
  this.allObjects().concat(this.explosions).forEach(function(obj){
    obj.draw(ctx);
  });
};

Game.prototype.fireMissile = function(ctx, marker) {
  this.bases[this.activeBaseIdx].fireMissile(ctx, marker);

};


Game.prototype.addMissiles = function(num){
    for (var i = 0; i < num; i++){
      this.foreignMissiles.push(
        new VolleyDefend.Missile({ pos: [(this.DIM_X * Math.random()),
                                      1],
                                game: this,
                                durability: this.durability
                                      }));
    }
  };

  Game.prototype.createMarker = function(pos) {
    var marker = new VolleyDefend.Marker({pos: [this.mouse.x, this.mouse.y], game: this});
    this.markers.push(marker);
    return marker;
  };

  Game.prototype.remove = function(mvgObj){
  var idx;

  if (mvgObj instanceof VolleyDefend.Missile){

     idx = this.foreignMissiles.indexOf(mvgObj);
     if (idx !== -1){
       this.foreignMissiles.splice(idx, 1);
     }
     if (this.foreignMissiles.length === 0){
       this.addMissiles(25);
     }
  }
  else if (mvgObj instanceof VolleyDefend.Explosion) {
    idx = this.explosions.indexOf(mvgObj);
    if (idx !== -1){
      this.explosions.splice(idx, 1);
    }
  }
  else if (mvgObj instanceof VolleyDefend.Interceptor) {
    idx = this.friendlyMissiles.indexOf(mvgObj);
    if (idx !== -1){
      this.friendlyMissiles.splice(idx, 1);
    }
  }
  else if (mvgObj instanceof VolleyDefend.Marker) {
    idx = this.markers.indexOf(mvgObj);
    if (idx !== -1){
      this.markers.splice(idx, 1);
    }
  }
};

Game.prototype.allObjects = function(){
  var allObs = this.foreignMissiles.slice();
  allObs = allObs.concat(this.friendlyMissiles).concat(this.bases).concat(this.explosions).concat(this.markers);
  return allObs;

};




})();
