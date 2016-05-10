
angular
    .module('adminApp').controller('locationsController', function($scope,$http,locationsFactory,ClientsFactory,
                                               VoitureFactory,$state,$location
    ,Reservation_Contrat_Service){







    $scope.clients = []
    $scope.cars = [];
    $scope.locations =[];
    $scope.location ={}
    $scope.newReservation ={};
    $scope.value = false;

    //tableua pour les valuers du Prix Totale
    $scope.Table_Prix_Totale = [];

    $scope.etat = "" ;
    $scope.shwoCloture = false ; // une variable pour rendre le button rendre cloture une réservation disabeld





    ClientsFactory.getClients()
        .success(function(res){
            $scope.clients = res ;

        })

    VoitureFactory.getCars()
        .success(function(res){
            $scope.cars = res[0] ;

        })


    //get ALl the locations

    function init() {
        var locations = locationsFactory.query(function () {
            $scope.locations = locations;


            $scope.Table_Prix_Totale = locations[1] ;


            for (var i = 0; i < $scope.locations.length; i++) {
                $scope.locations[i].dateDebut = new Date($scope.locations[i].dateDebut);
                $scope.locations[i].dateFin = new Date($scope.locations[i].dateFin);
                //
                $scope.locations[i].dateDebut.setHours(Number($scope.locations[i].heureDebut));
                $scope.locations[i].dateFin.setHours(Number($scope.locations[i].heureFin));


            }


        });


    }//end of init


    init();

    /*

     */


    $scope.detailslocation =function(id)
    {
        $scope.location=locationsFactory.get({
            idReservation:id

        }, function() {



            //trasnfrom the date of begin adn the end

            $scope.location.dateDebut = new Date($scope.location.dateDebut);
            $scope.location.dateFin = new Date($scope.location.dateFin);

            var idVoiture = $scope.location.Voiture_idVoiture;
            //search the idModele
            for (var i = 0; i < $scope.cars.length; i++) {
                if ($scope.cars[i].idVoiture == idVoiture) {
                    $scope.location.idModele = $scope.cars[i].Modele_idModele;
                    break;
                }
            }

        })

        $state.go('.details')

    }














    $scope.evaluate = function(loc)
    {
        if( !loc.cloture && loc.dateFin<new Date())
        {
            return false;
        }
        else{
            return true;
        }

    }



    /*
     function to set Reservation is ended !
     */

    $scope.cloture = function(loc)
    {

        loc.cloture = !  loc.cloture ;
        $scope.shwoCloture =! $scope.shwoCloture;
        loc.$update(function(){
            console.log('data updated succesfuly !');
        });



        $state.go('locations');
        init();

    }




    $scope.supprimlocation = function(id)
    {
        $scope.location=locationsFactory.get({
            idReservation:id

        }, function(){
            $scope.location.$delete(function(){
                console.log('deleted !');
                // we must refresh
                init();
            })

        })




    }

    /*

     */



    $scope.editlocation = function(id)
    {

        $scope.location=locationsFactory.get({
            idReservation:id

        }, function(){



            //trasnfrom the date of begin adn the end

            $scope.location.dateDebut = new Date($scope.location.dateDebut);
            $scope.location.dateFin = new Date($scope.location.dateFin);

            $scope.newReservation = $scope.location;
            $scope.selected = $scope.location.Client_idClient;

        })

        $state.go('locations.add');





    }



    /*

     */


    $scope.addReservation = function()
    {

        var idVoiture = $scope.newReservation.Voiture_idVoiture;


        //search the idModele
        for (var i = 0; i < $scope.cars.length; i++) {
            if ($scope.cars[i].idVoiture == idVoiture) {
                $scope.newReservation.idModele = $scope.cars[i].Modele_idModele;

                break;
            }
        }

        if($scope.newReservation.idReservation!=null)
        {




            $scope.newReservation.$update(function(){
                console.log('data updated succesfuly !');
                //initialize les valuers
                $scope.newReservation ={};
            });

            init();
            $state.go('locations');

        }
        else {





            locationsFactory.save($scope.newReservation, function () {
                console.log("saved in the database !");


                //initializer les valeurs
                $scope.newReservation ={};
                init();

                $state.go('locations');


            })

        }

    }




    /*
     uen fonction pour faire la redirection vers une autre page
     */

    $scope.contrat = function(id)
    {
        // we mus  get this Reservation
        $scope.location=locationsFactory.get({
            idReservation:id

        }, function(){



            //trasnfrom the date of begin adn the end

            $scope.location.dateDebut = new Date($scope.location.dateDebut);
            $scope.location.dateFin = new Date($scope.location.dateFin);
            Reservation_Contrat_Service.saveReservation( $scope.location);


        })

        $state.go('CreateContrat');
    }





})
