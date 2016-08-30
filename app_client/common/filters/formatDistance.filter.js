(function() {
  var _isNumeric = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  var formatDistance = function() {
    return function(distance) {
      var numDistance, unit;
      if (distance && _isNumeric(distance)) {
        if (distance > 1) {
          numDistance = parseFloat(distance).toFixed(1);
          unit = " miles";
        } else {
          numDistance = parseInt(distance * 528,10) * 10;
          unit = ' feet';
        }
          return numDistance + unit;    
      } else {
        return '?';
      }
    }
  };

  angular
    .module('loc8rApp')
    .filter('formatDistance', formatDistance);
})();