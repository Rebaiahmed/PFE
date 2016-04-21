

angular
    .module('meanApp')
    .controller('confirmCtrl', function($scope,$location,ReservationService,$http){

        $scope.newReservation ={};

console.log('_________----------_____________-------------____________------------____________');

        // get the Reservation
        $scope.newReservation = ReservationService.getReservation();



        console.log('we get ' + typeof $scope.newReservation);
        $scope.newReservation = JSON.parse($scope.newReservation);




        var dDebut =$scope.newReservation.dateDebut.split('/').join('-');
        var dFin =$scope.newReservation.dateFin.split('/').join('-');
        console.log('date debut dDebut ' + dDebut  + ' ' + dFin + 'type ' + typeof  dDebut);

        var from1 = dDebut.split("-");
        var from2 = dFin.split("-");
        $scope.newReservation.dateDebut = new Date(from1[2], from1[1] - 1, from1[0]);
        $scope.newReservation.dateFin = new Date(from2[2], from2[1] - 1, from2[0]);

    console.log('res date debut ' +  $scope.newReservation.dateDebut + '  ' +
        $scope.newReservation.dateFin );





        $scope.Create3 = function()
        {







            //saved it
            ReservationService.savePreReservation($scope.newReservation)
                .then(function(data){
                    console.log('added succesfuly !' + JSON.stringify(data));

                }, function(err){
                    console.log('err' + err);
                })



        }




    })