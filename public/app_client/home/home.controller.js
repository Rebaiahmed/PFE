


angular
    .module('meanApp')
    .controller('homeCtrl', function($location,Authentication){

        var vm = this ;
        vm.isloggedIn = Authentication.isloggedIn();
        vm.currentUser = Authentication.currentUser();


    })