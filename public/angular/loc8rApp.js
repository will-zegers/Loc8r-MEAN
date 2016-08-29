var isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var formatDistance = function() {
  return function(distance) {
    var numDistance, unit;
    if (distance && isNumeric(distance)) {
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

var ratingStars = function() {
  return {
    scope: {
      thisRating : '=rating'
    },
    templateUrl : '/angular/rating-stars.html'
  };
};

var loc8rData = function($http) {
  var locationByCoordinates = function(lat, lng) {
    return $http.get('/api/locations?lat=' + lat + '&lng=' + lng + '&maxDistance=10');
  };
  return {
    locationByCoordinates : locationByCoordinates
  };
};

var geolocation = function() {
  var getPosition = function(cbSuccess, cbError, cbNoGeo) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    } else {
      cbNoGeo();
    }
  };
  return { getPosition : getPosition };
};

var locationListCtrl = function ($scope, loc8rData, geolocation) {

  $scope.message = "Checking your location...";
  $scope.getData = function(position) {
    var lat = position.coords.latitude,
        lng = position.coords.longitude;
    $scope.message = "Searching for nearby places";
    loc8rData.locationByCoordinates(lat, lng)
      .success(function(data) {
        $scope.message = data.length > 0 ? "" : "No locations found";
        $scope.data = { locations : data };
      })
      .error(function (e) {
        $scope.message = "Sorry, something's gone wrong";
      });
  }

  $scope.showError = function(error) {
    $scope.$apply(function() {
      $scope.message = error.message;
    });
  };

  $scope.noGeo = function() {
    $scope.$apply(function() {
      $scope.message = "Geolocation not supported by this browser.";
    });
  };

  geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
};

angular
  .module('loc8rApp', [])
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance', formatDistance)
  .directive('ratingStars', ratingStars)
  .service('loc8rData', loc8rData)
  .service('geolocation', geolocation);