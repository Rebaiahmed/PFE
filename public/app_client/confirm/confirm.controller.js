

angular
    .module('meanApp')
    .controller('confirmCtrl', function($scope,$location,ReservationService,$http){

        $scope.newReservation ={};

console.log('_________----------_____________-------------____________------------____________');

        $scope.Create3 = function()
        {



            // get the Reservation
            $scope.newReservation = ReservationService.getReservation();



            console.log('we get ' + typeof $scope.newReservation);
            $scope.newReservation = JSON.parse($scope.newReservation);
            console.log('we get 2 ' + typeof $scope.newReservation);

            //saved it
            ReservationService.savePreReservation($scope.newReservation)
                .then(function(data){
                    console.log('added succesfuly !' + JSON.stringify(data));

                }, function(err){
                    console.log('err' + err);
                })



        }




    })