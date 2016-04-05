


angular
    .module('meanApp')
    .controller('navigationCtrl', function($location,Authentication){

   var vm = this ;
        vm.isloggedIn = Authentication.isloggedIn();
        vm.currentUser = Authentication.currentUser();


    })