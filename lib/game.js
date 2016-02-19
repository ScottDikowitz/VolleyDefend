(function () {
  "use strict";
  var VolleyDefend = window.VolleyDefend = window.VolleyDefend || {};


  var NUM_MISSILES = 5;

var Game = VolleyDefend.Game = function(dims){
  this.DIM_X = dims.DIM_X;
  this.DIM_Y = dims.DIM_Y;
  this.foreignMissiles = [];
  this.friendlyMissiles = [];
  this.explosions = [];
  this.bases = [new VolleyDefend.Base({pos: [500,600], game: this})];
  this.numMissiles = NUM_MISSILES || 1;
  this.addMissiles(this.numMissiles);
  this.score = 0;
  this.gameOver = false;
  this.activeBase = this.bases[0];
  this.mouse = {x: 0, y: 0};
};

Game.prototype.step = function(delta){
  this.moveObjects(delta);
  this.checkCollisions();
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
    this.activeBase.drawTurret(this.mouse, ctx);
  this.allObjects().concat(this.explosions).forEach(function(obj){
    obj.draw(ctx);
  });
};

Game.prototype.fireMissile = function(ctx) {
  this.activeBase.fireMissile(ctx);

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

  Game.prototype.remove = function(mvgObj){
  var idx;

  if (mvgObj instanceof VolleyDefend.Missile){

     idx = this.foreignMissiles.indexOf(mvgObj);
     this.foreignMissiles.splice(idx, 1);
     if (this.foreignMissiles.length === 0){
       this.addMissiles(10);
     }
  }
  else if (mvgObj instanceof VolleyDefend.Explosion) {
    idx = this.explosions.indexOf(mvgObj);
    this.explosions.splice(idx, 1);
  }
  else if (mvgObj instanceof VolleyDefend.Interceptor) {
    idx = this.friendlyMissiles.indexOf(mvgObj);
    this.friendlyMissiles.splice(idx, 1);
  }
};

Game.prototype.allObjects = function(){
  var allObs = this.foreignMissiles.slice();
  allObs = allObs.concat(this.friendlyMissiles).concat(this.bases).concat(this.explosions);
  return allObs;

};




})();
