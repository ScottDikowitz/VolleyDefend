(function () {
  "use strict";
  var VolleyDefend = window.VolleyDefend = window.VolleyDefend || {};

  var GameView = VolleyDefend.GameView = function(canvasEl, obj) {
    this.dims = obj;
    this.game = new VolleyDefend.Game(this.dims);
    this.ctx = canvasEl.getContext("2d");
    this.ctx.fillStyle = "white";
  };

  GameView.prototype.start = function(){
  this.bindKeyHandlers();
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this));
};

  GameView.prototype.bindKeyHandlers = function(){
    $(document).on('keydown', function (e) {
      var char = String.fromCharCode(e.keyCode);
      if (char === "f"){
        // fire bullet
      }

    });
  };

  GameView.prototype.animate = function(time){

    var delta = time - this.lastTime;
      requestAnimationFrame(this.animate.bind(this));

      this.game.step(delta);
      this.game.draw(this.ctx);

      this.lastTime = time;

};



})();
