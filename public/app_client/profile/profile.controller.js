
/*
 define our controlller
 */

angular
    .module('meanApp')
    .controller('profileCtrl', function($scope,$location,Authentication){



        $scope.user = {};

        Authentication.getProfile()
            .success(function(data) {
                console.log('data is' + data);
                $scope.user = data;
            })
            .error(function (e) {
                console.log('error in profile ' + e);
            });


    })