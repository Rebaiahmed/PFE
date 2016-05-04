
/*
 define our controlller
 */

angular
    .module('meanApp')
    .controller('navigationCtrl', function($scope,$location,Authentication,$http, $window,notify){




$scope.message = "hello" ;

        $scope.isloggedIn =Authentication.isloggedIn();

        console.log('logged '  + $scope.isloggedIn);

$scope.logout = function()
{
    alert('we will disocnnect !');
    Authentication.logout();
}



    })