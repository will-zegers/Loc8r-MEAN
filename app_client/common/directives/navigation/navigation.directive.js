(function() {
  function navigation() {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/navigation/navigation.template.html'
    };
  };

  angular
    .module('loc8rApp')
    .directive('navigation', navigation);
})();