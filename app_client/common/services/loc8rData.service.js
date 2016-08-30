(function() {
  loc8rData.$inject = ['$http'];
  function loc8rData ($http) {
    var locationByCoordinates = function(lat, lng) {
      return $http.get('/api/locations?lat=' + lat + '&lng=' + lng + '&maxDistance=200');
    };
    return {
      locationByCoordinates : locationByCoordinates
    };
  };

  angular
    .module('loc8rApp')
    .service('loc8rData', loc8rData);
})();