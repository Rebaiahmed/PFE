
angular
    .module('adminApp').controller('loginCtrl', function($scope,$location,Authentication){

// get the controller with this

    $scope.submitted = false ;
    $scope.error = false ;

    // initialize the
    $scope.data={

        email :"",
        password :""
    }

    // define teh functions

    $scope.onSubmit = function()
    {
        $scope.submitted = true;

        if($scope.adminForm.$valid) {
            Authentication.login($scope.data)
                .error(function (err) {
                    $scope.error=true;
                })
                .then(function (result) {


                    $location.path('/auth/admin/admin'); // redirect him to the profile page
                })


        }//end if

    }


})


