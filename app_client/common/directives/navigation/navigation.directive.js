(function() {
  function navigation() {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/navigation/navigation.template.html',
      controller: 'navigationCtrl as navvm'
    };
  };

  angular
    .module('loc8rApp')
    .directive('navigation', navigation);
})();