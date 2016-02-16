(function (){

  var VolleyDefend = window.VolleyDefend = window.VolleyDefend || {};
    var Util = VolleyDefend.Util = {};

    Util.inherits = function (ChildClass, ParentClass) {
      var Surrogate = function() {};
      Surrogate.prototype = ParentClass.prototype;
      ChildClass.prototype = new Surrogate();
    };


  Util.randomVec = function (length) {
    var vec = [];
    var direction = [1, -1];
    vec.push(Math.random() * length * direction[Math.floor(Math.random()*2)]);
    vec.push(Math.sqrt((length * length) - (vec[0] * vec[0])));
    return vec;
  };


})();
