(function () {
  "use strict";
  var VolleyDefend = window.VolleyDefend = window.VolleyDefend || {};

  var GameView = VolleyDefend.GameView = function(canvasEl, obj) {
    this.dims = obj;
    this.game = new VolleyDefend.Game(this.dims);
    this.ctx = canvasEl.getContext("2d");
    this.ctx.fillStyle = "white";
    this.bindKeyHandlers();
  };

  GameView.prototype.bindKeyHandlers = function(){
    $(document).on('keydown', function (e) {
      var char = String.fromCharCode(e.keyCode);
      if (char === "f"){
        // fire bullet
      }

    });
  };



})();
