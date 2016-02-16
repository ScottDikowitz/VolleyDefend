(function () {
  var VolleyDefend = window.VolleyDefend = window.VolleyDefend || {};

  var COLOR = "grey";
  var Base = VolleyDefend.Base = function(obj){

    this.pos = obj.pos;
    this.color = COLOR;
    this.speed = 1;
    this.radius = 5;
    this.vel = VolleyDefend.Util.randomVec(this.speed);
    this.game = obj.game;
    this.removed = false;

  };

  Base.prototype.move = function() {

  };
})();
