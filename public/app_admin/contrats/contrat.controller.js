
angular
    .module('adminApp').controller('CreateContratsController', ['$scope','$http','$filter','$stateParams','$state','ContratService','moment','Reservation_Contrat_Service','notify' ,function($scope,$http,
                                                                                                                                                                          $filter,$stateParams,$state,
                                                                                                                                                                          ContratService,
                                                                                                                                                                          moment,Reservation_Contrat_Service,
                                                                                                                                                                          notify){


// c une variable pour affciher un message de succes d'authentfication
    $scope.success = false ;





    $scope.Reservation ={}


    $scope.Reservation  =Reservation_Contrat_Service.getReservation();




    $scope.newContrat ={};
    $scope.contrats = [];
    $scope.contrat ={};








    if($scope.Reservation !=null) {
        //appliquer filter pour changer la date
        $scope.$watch('Reservation.Client.datePermis ', function () {

            $scope.Reservation.Client.datePermis = $filter('date')($scope.Reservation.Client.datePermis, 'dd-MM-yyyy');
            $scope.Reservation.dateDebut = $filter('date')($scope.Reservation.dateDebut, 'dd-MM-yyyy');
            $scope.Reservation.dateFin = $filter('date')($scope.Reservation.dateFin, 'dd-MM-yyyy');

        });

    }//end if







//le nombre de jours de la réservation
    $scope.Nbr_Jours=parseInt(
        moment.duration(
            moment( $scope.Reservation.dateFin).diff(
                moment( $scope.Reservation.dateDebut)
            )
        ).asDays()
    );












    $scope.newContrat.totaleRetard ;
    $scope.newContrat.kilometrageDebut =$scope.Reservation.Voiture.kilometrage;
    $scope.newContrat.kilometrageRetour=0;


    $scope.newContrat.Nbr_Jours = $scope.Nbr_Jours;



    $scope.newContrat.tva = 18;
    $scope.newContrat.prixTT =  $scope.Reservation.PrixTotale ;
    $scope.newContrat.prixHt =  $scope.newContrat.prixTT -( $scope.newContrat.tva/100)* $scope.newContrat.prixTT ;




    $scope.newContrat.Reservation_Client_idClient = $scope.Reservation.Client_idClient;
    $scope.newContrat.Reservation_Voiture_Modele_idModele = $scope.Reservation.Voiture_Modele_idModele
    $scope.newContrat.Reservation_idReservation = $scope.Reservation.idReservation ;



    $scope.generateContrat = function()
    {
        // we will ge the data from tehj form
        // and save it in the database !


        alert('we willa add ths is to databe' + JSON.stringify($scope.newContrat));


//test si les autres attributs sont nulls$


        ContratService.createContrat($scope.newContrat)
            .success(function(){

                notify('le Contrat est cére avec succes !');
                $state.go('contrats');

            })
            .error(function(err){
                console.log('err' + err);

            })



    }










}]);






angular
    .module('adminApp').controller('ContratsController', ['$scope','$http','$filter','$stateParams','$state','ContratService','moment','ClientsFactory','notify','locationsFactory' ,function($scope,$http,
                                                                                                                                                                          $filter,$stateParams,$state,
                                                                                                                                                                          ContratService,
                                                                                                                                                                          moment,ClientsFactory,notify,locationsFactory){


    $scope.contrats = [];
    $scope.clients =[];
    $scope.contrat ={};
    $scope.detailsshow = false;

    $scope.edit = false ;
    $scope.location ={};





//on doit pour chaque réservation aficher le client , et la voiture donc on va récuperer toutes lec clients


    function getClients()
    {
        ClientsFactory.getClients()
            .then(function(data){
                $scope.clients =data.data ;

            }, function(err){
                console.log('err in clients' + err);
            })
    }


    getClients(); // load the clients






    function getContrast()
    {
        ContratService.getContrats().then(function(result){

            $scope.contrats = result.data ;
        }, function(err){
            console.log('err' + err);
        })
    }


    getContrast();



    //fonction DétailsContrat

    $scope.detailsContrat = function(ctrl)
    {
        alert('we will hsow the details !');
        $scope.detailsshow = true;
        $scope.contrat = ctrl;

    }


    /* $scope.editerContrat = function(ctrl)
     {
     alert('we will update this contrat !');
     $scope.edit=true;
     $scope.contrat = ctrl;
     $scope.location=locationsFactory.get({
     idReservation:ctrl.Reservation_idReservation

     }, function() {

     console.log('lcation is ' + JSON.stringify( $scope.location));
     console.log('contra will be ' + JSON.stringify($scope.contrat));

     })

     }*/







    $scope.editerContrat = function(ctrl)
    {
        $scope.contrat = ctrl;
        $scope.edit = true ;
        $scope.location=locationsFactory.get({
            idReservation:ctrl.Reservation_idReservation

        }, function() {

            console.log('lcation is ' + JSON.stringify( $scope.location));
            console.log('contra will be ' + JSON.stringify($scope.contrat));

        })



    }

    //modifier le contrat
    $scope.update = function(contrat)
    {

        ContratService.updateContrat(contrat.idContrat,contrat)
            .then(function(result)
            {
                notify('contrat bien mise a jour');
                $scope.edit = false;

            },function(err){
                console.log('err  ' + err);
            })
    }







    //Create_Facture

    $scope.go_Facture = function(idContrat)
    {
        ContratService.getContrat(idContrat)
            .success(function(result){
                console.log('the result is ');
                $scope.contrat = result;
            })

        $state.go('Create_Facture',{'contrat':$scope.contrat});

    }




    //supprimer le contrat

    $scope.deleteContrat = function(id)
    {

        alert('we will delete contrat')
        //ici on va suprimer le contrat !!!!
        ContratService.deleteContrat(id)
            .then(function(result){
                getContrast();
                notify('Contrat supprimée !');


            }, function(err){
                console.log('err' + err);
            });
    }


    $scope.GenereFacture = function(ctrl)
    {
        $state.go('Create_Facture',{contrat:ctrl})

    }


}]);

