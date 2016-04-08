


angular
    .module('meanApp')
    .controller('homeCtrl', function($scope,$location,ReservationService,Authentication){



        $scope.user = {};

        $scope.newReservation = {};

        Authentication.getProfile()
            .success(function(data) {
                console.log('data is' + data);
                $scope.user = data;
            })
            .error(function (e) {
                console.log('error in profile ' + e);
            });
        $scope.isloggedIn = Authentication.isloggedIn();
        $scope.currentUser = Authentication.currentUser();
        console.log($scope.currentUser);

        /*
        first function
         */

        $scope.Create = function()
        {


            $scope.newReservation.Voiture_idVoiture = 0;
            $scope.newReservation.Voiture_Modele_idModele = 0;
            $scope.newReservation.Client_idClient = 0 ;

            ReservationService.saveReservation($scope.newReservation);

            console.log('the Reservation after saving it in the service is ' +JSON.stringify( ReservationService.getReservation()));
            $location.path('Voitures');


        }


    })