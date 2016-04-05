
/*
 define our controlller
 */

angular
    .module('meanApp')
    .controller('profileCtrl', function($location,Authentication){

        var vm = this;

        vm.user = {};

        Authentication.getProfile()
            .success(function(data) {
                console.log('data is' + data);
                vm.user = data;
            })
            .error(function (e) {
                console.log('error in profile ' + e);
            });


    })