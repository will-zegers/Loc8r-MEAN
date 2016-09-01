(function() {

  reviewModalCtrl.$inject = ['$uibModalInstance', 'locationData', 'loc8rData'];
  function reviewModalCtrl ($uibModalInstance, locationData, loc8rData) {
    var vm = this;
    vm.locationData = locationData;

    vm.onSubmit = function() {

      vm.formError = "";
      if (!vm.formData || !vm.formData.name || !vm.formData.rating) {
        vm.formError = "Name and rating fields required, please try again!";
        return false;
      } else {
        vm.doAddReview(locationData.locationid, vm.formData)
      }
    };

    vm.doAddReview = function(locationid, formData) {
      loc8rData.addReviewById(locationid, {
        author : formData.name,
        rating : formData.rating,
        reviewText : formData.reviewText
      })
      .success(function(data) {
        console.log(data);
        vm.modal.close(data);
      })
      .error(function(data) {
        vm.formError = "Your review has not been saved, try again";
      });
      return false;
    };

    vm.modal = {
      close : function(result) {
        console.log(result);
        $uibModalInstance.close(result);
      },
      cancel : function() {
        $uibModalInstance.dismiss('cancel');
      }
    };
  }

  angular
    .module('loc8rApp')
    .controller('reviewModalCtrl', reviewModalCtrl);
})();