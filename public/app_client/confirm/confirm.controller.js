

angular
    .module('meanApp')
    .controller('confirmCtrl', function($scope,$location,ReservationService,$http,Authentication){

        $scope.newReservation ={};

        $scope.client ={};

console.log('_________----------_____________-------------____________------------____________');

//variable pour l'affichage de merci de réservation
$scope.clicked = false ;


        //$scope.newReservation = JSON.parse($scope.newReservation);


        // get the Reservation
        var Reservation = ReservationService.getReservation();

  console.log('la réservation est ' + JSON.stringify(ReservationService.getReservation()));

            var dDebut = Reservation.dateDebut.split('/').join('-');
            var dFin = Reservation.dateFin.split('/').join('-');
            console.log('date debut dDebut ' + dDebut + ' ' + dFin + 'type ' + typeof  dDebut);

            var from1 = dDebut.split("-");
            var from2 = dFin.split("-");
            Reservation.dateDebut = new Date(from1[2], from1[1] - 1, from1[0]);
            Reservation.dateFin = new Date(from2[2], from2[1] - 1, from2[0]);


        $scope.newReservation = Reservation;




        console.log('the scope;newreSERVATION' + JSON.stringify(Reservation ));

        //get the client
        $scope.client = Authentication.currentUser();


        $scope.Create3 = function() {


            $scope.clicked = true;


           /*
            if (!angular.equals($scope.newReservation, {})) {
             */
                //saved it
                ReservationService.savePreReservation($scope.newReservation)
                    .then(function (data) {
                        console.log('added succesfuly !' + JSON.stringify(data));

                    }, function (err) {
                        console.log('err' + err);
                    })


            }

      //  }//end if




    })