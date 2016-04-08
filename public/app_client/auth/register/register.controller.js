
/*
define our controlller
 */

angular
    .module('meanApp')
    .controller('registerCtrl', function($scope,$location,Authentication){


        $scope.show = false ;

        $scope.newClient = {};

        // define teh functions

        $scope.onSubmit = function()
        {


            Authentication.register( $scope.newClient)
                .error(function(err){
                    alert(err);
                })
                .then(function(data){
                    console.log(JSON.stringify(data.data));
                    var obj = {"err_create":"CREATE_ALREADY_HAVE_ACCOUNT"};


                    console.log(JSON.stringify(data.data)===JSON.stringify(obj));

                    if(JSON.stringify(data.data)===JSON.stringify(obj))

                    {

                        console.log('email exist !');

                        $scope.show= true;

                    }
                    else{
                        console.log('redirect him to the prfile page !');
                        $location.path('/Profile'); // redirect him to the profile page

                    }




                })
        }


    })