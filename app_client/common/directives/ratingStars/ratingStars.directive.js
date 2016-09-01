(function() {
  function ratingStars() {
    return {
      restrict: 'EA',
      scope: {
        thisRating : '=rating'
      },
      templateUrl: '/common/directives/ratingStars/ratingStars.template.html'
    };
  };

  angular
    .module('loc8rApp')
    .directive('ratingStars', ratingStars);
})();
