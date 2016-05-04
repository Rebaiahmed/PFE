

/*
 define our controlller
 */

angular
    .module('meanApp')
    .controller('loginProfileCtrl', function($scope,$location,Authentication){



        $scope.user = {};


        $scope.login = function()
        {
            alert('we will login to the profile !');

            Authentication.login($scope.user )
                .error(function(err){
                    console.log('err :' + JSON.stringify(err));
                    $scope.error = true;
                })
                .then(function(data) {
                    // get the Reservation

                    console.log('-------we are in the login method---')

                    $scope.client = Authentication.currentUser();

                    console.log('th client returene dis ' + JSON.stringify($scope.client));
                    $location.path('Profile');


                })
        }



    })