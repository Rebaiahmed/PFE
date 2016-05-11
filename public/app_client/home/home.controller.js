


angular
    .module('meanApp')
    .controller('homeCtrl', function($scope,$location,ReservationService,Authentication,$http, $state){




        $scope.goReservation = function()
        {

        }



//Initialisation des variables
        $scope.map = {center: {latitude: 46.5132, longitude: 0.1033}, zoom: 16 };

        $scope.markers = [{
            coord: {
                latitude: 44.93, //Coordonnées où placer le point
                longitude: 4.89
            },
            email: "netapsys@netapsys.fr", //Propriété métier, pour les afficher à l'utilisateur lorsqu'il sélectionne le point par exemple
            icon: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png", //Icone personnalisée
            id: 412
        },{
            coord: {
                latitude: 46.5132,
                longitude: 0.1033
            },
            email: "netapsys@netapsys.fr",
            icon: "//developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png", //Icone personnalisée
            id: 413
        }];

        $scope.clickMarker = function(marker) {
            alert(marker.email); //Affichera l'email du point sur lequel on a cliqué
        };






  $scope.submitted = false;




        //les lieux

        $scope.lieux = [{
            id: "Tn",
            value: "Tunis"
        }, {
            id: "Sf",
            value: "SFAX"
        },{
            id: "JR",
            value: "Jerba"
    }]




            var currentTime = new Date();
            $scope.currentTime = currentTime;
            $scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            $scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
            $scope.disable = [false, 1, 7];
            $scope.today = 'Today';
            $scope.clear = 'Clear';
            $scope.close = 'Close';
            var days = 15;
            $scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 * 24 * days ))).toISOString();
            $scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 * 24 * days ))).toISOString();
            $scope.onStart = function () {
                console.log('onStart');
            };
            $scope.onRender = function () {
                console.log('onRender');
            };
            $scope.onOpen = function () {
                console.log('onOpen');
            };
            $scope.onClose = function () {
                console.log('onClose');
            };
            $scope.onSet = function () {
                console.log('onSet');
            };
            $scope.onStop = function () {
                console.log('onStop');
            };


            $scope.newReservation = {};

            $scope.isloggedIn = Authentication.isloggedIn();
            console.log('is logged in ' + $scope.isloggedIn);
            $scope.currentUser = Authentication.currentUser();
            console.log('teh current User is :' + JSON.stringify($scope.currentUser));


        console.log('' + $scope.newReservation.heureFin );
            /*
             first function
             */

          $scope.Create = function () {



              $scope.submitted= true;




           if($scope.ReservationForm.$valid && ($scope.newReservation.dateDebut<=$scope.newReservation.dateFin)) {


               $scope.newReservation.Voiture_idVoiture = 0;
               $scope.newReservation.Voiture_Modele_idModele = 0;
               $scope.newReservation.Client_idClient = 0;

               if ($scope.currentUser != null) {
                   $scope.newReservation.Client_idClient = $scope.currentUser.id;

               }


               console.log('Our Reservation is :' + $scope.newReservation);

               ReservationService.saveReservation($scope.newReservation);

               console.log('the Reservation after saving it in the service is ' + JSON.stringify(ReservationService.getReservation()));
               $location.path('Voitures');


           }//edn of if*/

            }


            $scope.logOut = function () {


                Authentication.logout();
                $window.location.reload();
                $location.path('/');

            }



        $scope.sendEmail = function()
        {
            $scope.email ;
            alert('sedn email')

            $http.post('/auth/client/newsletter',$scope.email)
                .then(function(result){
                    console.log('the result is ' + JSON.stringify(result));
                }, function(err){
                    console.log('err' + JSON.stringify(err))
                })
        }



    })