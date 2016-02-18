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
  this.bases = [new VolleyDefend.Base({pos: [500,600]})];
  this.numMissiles = NUM_MISSILES || 1;
  this.addMissiles(this.numMissiles);
  this.score = 0;
  this.gameOver = false;
};

Game.prototype.step = function(delta){
  this.moveObjects(delta);
  // this.checkCollisions();
};

Game.prototype.moveObjects = function(delta){
    // debugger;
    this.allObjects().forEach(function(obj){
      obj.move(delta);
    });

  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
  this.allObjects().concat(this.explosions).forEach(function(obj){
    obj.draw(ctx);
  });
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

  if (mvgObj instanceof MissileDefend.Missile){

     idx = this.foreignMissiles.indexOf(mvgObj);
     this.foreignMissiles.splice(idx, 1);
  }
};

Game.prototype.allObjects = function(){
  var allObs = this.foreignMissiles.slice();
  allObs = allObs.concat(this.friendlyMissiles).concat(this.bases);
  return allObs;

};




})();
