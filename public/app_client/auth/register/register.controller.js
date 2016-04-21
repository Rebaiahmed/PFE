
/*
define our controlller
 */

angular
    .module('meanApp')
    .controller('registerCtrl', function($scope,$location,Authentication,ReservationService,
                                         $state){


        $scope.show = false ;

        $scope.newClient = {};

        // define teh functions

        $scope.onSubmit = function()
        {


            Authentication.register( $scope.newClient)
                .error(function(err){
                   console.log('err :' + JSON.stringify(err));
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

                        $scope.newClient = Authentication.currentUser() ;

                        // we must get the Reservation
                        $scope.newReservation ={};

                        // get the Reservation
                        $scope.newReservation = ReservationService.getReservation();
                        console.log('our reservation geted is :' +  JSON.stringify($scope.newReservation))



                        if(angular.equals({}, $scope.newReservation))
                        {

                            console.log('juste authentication et no pour termiern la réservation !')
                            alert('we will login to profile !');

                            $location.path('Profile');

                        }

                        else {


                            //transform it
                            //$scope.newReservation = JSON.parse($scope.newReservation);
                            //console.log('parse it to be  :' +  $scope.newReservation)
                            //modify it

                            console.log('the new Client is ' + JSON.stringify($scope.newClient));
                            $scope.newReservation.Client_idClient = $scope.newClient.id;
                            //console.log('modify it to be ::' +  $scope.newReservation)
                            //saved it
                            ReservationService.saveReservation(JSON.stringify($scope.newReservation));
                            //display it
                            console.log("saved in the login ctrl :" + ReservationService.getReservation());

                            console.log("succces d'authentication !");

                            $state.go('Confirm');
                        }














                    }




                })
        }


    })