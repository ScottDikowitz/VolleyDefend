(function () {
  "use strict";
  var VolleyDefend = window.VolleyDefend = window.VolleyDefend || {};

  var GameView = VolleyDefend.GameView = function(canvasEl, obj) {
    this.dims = obj;
    this.canvas = canvasEl;
    this.game = new VolleyDefend.Game(this.dims);
    this.ctx = canvasEl.getContext("2d");
    this.ctx.fillStyle = "white";
  };

  GameView.prototype.start = function(){
  this.bindKeyHandlers(this.canvas);
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this));
};

  GameView.prototype.bindKeyHandlers = function(canvas){
    var gv = this;
    $(document).on('keydown', function (e) {
      var char = String.fromCharCode(e.keyCode);
      if (char === "f"){
        // fire bullet
      }

    });
    canvas.addEventListener('click', function(evt) {
      var mouse = gv.getMousePos(canvas, evt);
      gv.game.friendlyMissiles.push(new VolleyDefend.Interceptor({pos: [500, 550], game: gv.game, vel: [mouse.x - 500,  mouse.y - 550], mouse: mouse}));
    });
  };

  GameView.prototype.getMousePos = function(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  };


  GameView.prototype.animate = function(time){

    var delta = time - this.lastTime;
      requestAnimationFrame(this.animate.bind(this));

      this.game.step(delta);
      this.game.draw(this.ctx);

      this.lastTime = time;

};



})();
