
/*
 define our controlller
 */

angular
    .module('meanApp')
    .controller('loginCtrl', function($location,Authentication){

// get the controller with this
        var vm = this;
        // initialize the
        vm.credentials={
            name :"",
            email :"",
            password :""
        }

        // define teh functions

        vm.onSubmit = function()
        {
            Authentication.login(vm.credentials)
                .error(function(err){
                    alert(err);
                })
                .then(function(){
                    $location.path('/profile'); // redirect him to the profile page
                })
        }


    })