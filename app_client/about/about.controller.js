(function() {

  function aboutCtrl() {
    var vm = this;
    vm.pageHeader = {
      title: 'About'
    };
    vm.main = {
      content: 'Loc8r was created to help people find places to sit down and get a bit of work done.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus lacus, maximus ut sagittis et, porttitor a ipsum. Morbi at ullamcorper risus. Ut enim tortor, malesuada eget sagittis id, vulputate a sem. Curabitur ornare gravida neque. Proin sagittis faucibus porttitor. Nulla lorem dolor, tincidunt a dui ut, ultrices scelerisque sem. Morbi et nulla et elit scelerisque ultrices. Mauris leo turpis, luctus malesuada magna sed, maximus commodo urna.\n\nNam ut turpis at mi molestie elementum. Donec interdum nisl porttitor odio consectetur pharetra. Donec congue nibh a elit volutpat viverra. Sed lacinia, nunc convallis egestas vehicula, ex neque laoreet velit, vel ullamcorper ipsum risus nec dui. Nam molestie accumsan augue in pharetra. Suspendisse rutrum nisi velit, nec tincidunt ipsum auctor id. Etiam ac porta lorem. Morbi sit amet gravida odio. Sed tincidunt aliquam elementum. Integer dolor elit, laoreet eu sem at, scelerisque luctus velit. Duis nec lectus et velit blandit pulvinar sit amet at augue. Curabitur consectetur, nunc nec ultrices venenatis, purus justo cursus elit, vitae ultrices quam neque ultrices diam. Donec semper sem vitae sapien posuere, quis hendrerit arcu condimentum. Cras nec interdum ipsum.'
    };    
  };

  angular
    .module('loc8rApp')
    .controller('aboutCtrl', aboutCtrl);
})();