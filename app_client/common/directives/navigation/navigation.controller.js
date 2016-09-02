(function() {
  navigationCtrl.$inject = ['$location', 'authentication'];
  function navigationCtrl($location, authentication) {
    var vm = this;

    vm.currentPath = $location.path();
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentUser = authentication.currentUser();

    vm.logout = function() {
      authentication.logout();
      window.location.href = '/#';
    };
  };

  angular
    .module('loc8rApp')
    .controller('navigationCtrl', navigationCtrl);
})();