

angular
    .module('meanApp')
    .controller('optionsCtrl', function($scope,$location,ReservationService,$http,moment,Authentication){

        $scope.voitures=[];
        $scope.voiture = {};



        // get the Reservation
        $scope.newReservation = ReservationService.getReservation();

        $scope.currentUser = Authentication.currentUser();

        console.log('we are in options  current User is :' + JSON.stringify($scope.currentUser) );

        console.log('type of Resevrtaion is ' + typeof $scope.newReservation);






        //we will convert it because they recoved it like a string


        $scope.newReservation = JSON.parse($scope.newReservation);


        var pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
        var arrayDate1 = $scope.newReservation.dateDebut.match(pattern);
        var arrayDate2 = $scope.newReservation.dateFin.match(pattern);
        var d1 = new Date(arrayDate1[3], arrayDate1[2] - 1, arrayDate1[1]);
        var d2 = new Date(arrayDate2[3], arrayDate2[2] - 1, arrayDate2[1]);

        console.log('d1 ' + d1 + '  d2 ' + d2 + ' ' );

        var differenceinDays=parseInt(
            moment.duration(
                moment(d2).diff(
                    moment(d1)
                )
            ).asDays()
        );

        console.log('ddd ' + differenceinDays);


















        function getCars()
        {
            ReservationService.getCars().then(function(data){

                $scope.voitures = data.data ;


                for(var i=0;i<$scope.voitures.length;i++)
                {
                    if($scope.voitures[i].idVoiture==$scope.newReservation.Voiture_idVoiture)
                    {
                        $scope.voiture = $scope.voitures[i];
                        console.log('the car is ' +$scope.voiture );
                        $scope.prixTotale = differenceinDays * $scope.voiture.prixLocation ;

                        $scope.newReservation.Voiture_idVoiture =$scope.voiture.idVoiture;
                        $scope.newReservation.Voiture_Modele_idModele=$scope.voiture.Modele_idModele ;
                        break;

                    }
                }



            }, function(err){
                console.log('err in geting cars :' + err)
            })
        }

        getCars();






        $scope.Create3 = function()
        {

            ReservationService.saveReservation($scope.newReservation);

            console.log('the Reservation after saving it in the service is ' +JSON.stringify( ReservationService.getReservation()));

            if($scope.currentUser)
            {
                console.log('currentUser exist ');
                $location.path('Confirm');
            }
            else{
                $location.path('login');
            }



        }




    })