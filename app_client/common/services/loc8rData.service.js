(function() {
  loc8rData.$inject = ['$http'];
  function loc8rData ($http) {
    var locationByCoordinates = function(lat, lng) {
      return $http.get('/api/locations?lat=' + lat + '&lng=' + lng + '&maxDistance=200');
    };

    var locationById = function(locationid) {
      return $http.get('/api/locations/' + locationid);
    };

    var addReviewById = function(locationid, data) {
      return $http.post('/api/locations/' + locationid + '/reviews', data);
    }

    return {
      locationByCoordinates : locationByCoordinates,
      locationById : locationById,
      addReviewById : addReviewById
    };
  };

  angular
    .module('loc8rApp')
    .service('loc8rData', loc8rData);
})();