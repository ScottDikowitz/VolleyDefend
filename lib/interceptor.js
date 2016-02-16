(function () {
  var VolleyDefend = window.VolleyDefend = window.VolleyDefend || {};

  var COLOR = "grey";
  var Interceptor = VolleyDefend.Interceptor = function(obj){
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
  VolleyDefend.Util.inherits(VolleyDefend.Interceptor, VolleyDefend.MovingObject);

})();
