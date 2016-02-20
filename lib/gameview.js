(function () {
  "use strict";
  var VolleyDefend = window.VolleyDefend = window.VolleyDefend || {};

  var GameView = VolleyDefend.GameView = function(canvasEl, obj) {
    this.dims = obj;
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext("2d");
    this.ctx.fillStyle = "white";
    this.game = new VolleyDefend.Game(this.dims, this.ctx);

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
      if (char === "n" || char === "N" || char === "a" || char === "A"){
        gv.game.changeActive(-1);
        // fire bullet
      }
      else if(char === "m" || char == "M" || char === "d" || char === "D"){
        gv.game.changeActive(1);
      }

    });
    canvas.addEventListener('click', function(evt) {
      evt.preventDefault();
      var mouse = gv.getMousePos(canvas, evt);
      gv.game.mouse = mouse;
      if (!gv.game.clickedBases()){
        var marker = gv.game.createMarker();
        gv.game.fireMissile(this.ctx, marker);
      }

    });

    canvas.addEventListener('mousemove', function (e){
      var mouse = gv.getMousePos(canvas, e);
      gv.game.mouse = mouse;


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
