
/*
 define our controlller
 */

angular
    .module('meanApp')
    .controller('navigationCtrl', function($scope,$location,Authentication,$http, $window,notify,$state
    ,$q,$rootScope){






        function testlogged ()
        {
            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams){
                    $scope.isloggedIn = Authentication.isloggedIn();
                })
        }

        testlogged ();




$scope.logout = function()
{

    Authentication.logout();
    $window.location.reload();
    $location.path('/');
}



    })