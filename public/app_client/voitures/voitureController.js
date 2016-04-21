

angular
    .module('meanApp')
    .controller('voituresCtrl', function($scope,$location,ReservationService,$http){



        $scope.user = {};
        $scope.voitures = [];
        $scope.voiture = {};
        $scope.newReservation ={};

       // console.log(ReservationService.getReservation());






        // get the cars

         function getCars()
         {
             ReservationService.getCars().then(function(data){

                 $scope.voitures = data.data ;



             }, function(err){
                 console.log('err in geting cars :' + err)
             })
         }

        getCars();





        /*
         first function
         */

        $scope.SetCar = function(id)
        {
            for(var i=0;i<$scope.voitures.length;i++)
            {
                if($scope.voitures[i].idVoiture==id)
                {
                    $scope.voiture = $scope.voitures[i];
                    break ;
                }
            }

            return $scope.voiture;
        }












        $scope.Create2 = function(id)
        {


            for(var i=0;i<$scope.voitures.length;i++)
            {
                if($scope.voitures[i].idVoiture==id)
                {
                    $scope.voiture = $scope.voitures[i];
                    break ;
                }
            }

           console.log('our car is ' + JSON.stringify($scope.voiture));






            // get the Reservation
            $scope.newReservation = ReservationService.getReservation();




            //$scope.newReservation = JSON.parse($scope.newReservation);



            $scope.newReservation.Voiture_idVoiture =$scope.voiture.idVoiture;
            $scope.newReservation.Voiture_Modele_idModele=$scope.voiture.Modele_idModele ;


            console.log('new Res will be :' +   JSON.stringify($scope.newReservation));

            ReservationService.saveReservation(JSON.stringify($scope.newReservation));

            $location.path('Options');

        }




    })