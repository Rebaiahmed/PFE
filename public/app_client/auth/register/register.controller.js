
/*
define our controlller
 */

angular
    .module('meanApp')
    .controller('registerCtrl', function($location,Authentication){

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
            Authentication.register(vm.credentials)
                .error(function(err){
                    alert(err);
                })
                .then(function(){
                    console.log('redirect him to the prfile page !');
                    $location.path('/profile'); // redirect him to the profile page
                })
        }


    })