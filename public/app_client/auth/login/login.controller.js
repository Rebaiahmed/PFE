
/*
 define our controlller
 */

angular
    .module('meanApp')
    .controller('loginCtrl', function($scope,$location,Authentication,ReservationService,$state){



  console.log(Authentication.isloggedIn());



        $scope.newReservation ={};

        $scope.client ={};
        $scope.error = false;

        // define teh functions

        $scope.onSubmit = function()
        {
            Authentication.login($scope.client)
                .error(function(err){
                    console.log('err :' + JSON.stringify(err));
                    $scope.error = true;
                })
                .then(function(data){
                    // get the Reservation

                    console.log('-------we are in the login method---')

                    $scope.client =Authentication.currentUser();

                    console.log('th client returene dis ' + JSON.stringify($scope.client));


                    // get the Reservation
                    $scope.newReservation = ReservationService.getReservation();
                    console.log('our reservation geted is :' +  JSON.stringify($scope.newReservation))

                    if(angular.equals({}, $scope.newReservation))
                    {
                        alert('we will login to profile !');

                        $location.path('Profile');

                    }

                    else {








                        //transform it
                        //$scope.newReservation = JSON.parse($scope.newReservation);
                        //console.log('parse it to be  :' +  $scope.newReservation)
                        //modify it
                        $scope.newReservation.Client_idClient = $scope.client.id;
                        //console.log('modify it to be ::' +  $scope.newReservation)
                        //saved it
                        ReservationService.saveReservation(JSON.stringify($scope.newReservation));
                        //display it
                        console.log("saved in the login ctrl :" + ReservationService.getReservation());

                        console.log("succces d'authentication !");

                        $state.go('Confirm');

                    }
                })
        }





    })