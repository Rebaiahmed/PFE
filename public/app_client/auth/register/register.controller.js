
/*
define our controlller
 */

angular
    .module('meanApp')
    .controller('registerCtrl', function($scope,$location,Authentication,ReservationService,
                                         $state,notify,$window){


        $scope.show = false ;
        $scope.submitted = false ;



           //pour vailde rune expression Réguliére !
        $scope.ph_numbr = '/^[0-9]{8}$/';
        console.log('ph number' + $scope.ph_numbr  );

        $scope.newClient = {};

        // define teh functions

        $scope.onSubmit = function() {
            $scope.submitted = true;


            if ($scope.registerForm.$valid) {
                Authentication.register($scope.newClient)
                    .error(function (err) {
                        console.log('err :' + JSON.stringify(err));
                    })
                    .then(function (data) {
                        console.log(JSON.stringify(data.data));
                        var obj = {"err_create": "CREATE_ALREADY_HAVE_ACCOUNT"};




                        if (JSON.stringify(data.data) === JSON.stringify(obj)) {

                            console.log('email exist !');

                            $scope.show = true;

                        }
                        else {

                            $scope.newClient = Authentication.currentUser();

                            // we must get the Reservation
                            $scope.newReservation = {};

                            // get the Reservation
                            $scope.newReservation = ReservationService.getReservation();
                            console.log('our reservation geted is :' + JSON.stringify($scope.newReservation))

                            console.log('current User will be ' + JSON.stringify( $scope.newClient))


                            if (angular.equals({}, $scope.newReservation)) {


                                $scope.newClient={};
                                notify('Merci Pour Votre inscription');

                                $location.path('/');
                                //$window.location.reload();

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
                                console.log("saved in the Regsiter CTrl ctrl :" + ReservationService.getReservation());

                                console.log("succces d'authentication !");

                                $state.go('Confirm');
                            }


                        }//end of else


                    })//end of then
            }


        }//end of else form validation

    })