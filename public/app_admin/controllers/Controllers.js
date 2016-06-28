/*
 _-_-_-_-__--_-_-_-_-_-_-_-_-_-_-_-_-
Define our controlllers
_-_-_-_-__--_-_-_-_-_-_-_-_-_-_-_-_-
 */




angular//'Socket'  //'ngAudio'
    .module('adminApp')
    .controller('AdminCtrl',['$scope','Authentication','$location','$state','notify','Socket','ngAudio', function($scope,Authentication,$location,$state,notify,
                                                                                                                                   Socket,ngAudio
   ){




   $scope.audio = ngAudio.load("http://static1.grsites.com/archive/sounds/birds/birds007.wav");





        $scope.go = function(){
            console.log('ok ok')
            $state.go('clients');
        }



    Socket.on('new_client', function(){
        notify('une Réservation effectuée!');

        $scope.audio.play();
    })


    //Pour les Noivelles réservations

    Socket.on('new_reservation', function(){

        notify('une Réservation effectuée!');
        $scope.audio.play();
    })



    $scope.user = Authentication.isloggedIn();


    //inclure le variable $state dans uiRouterStatepour utiliser dans le routing pour pouvoir afficher le calendar
    $scope.uiRouterState = $state;







    $scope.logOut = function()
    {

        Authentication.logout();

        $location.path('admin');

    }




    $scope.profile = function()
    {

        $state.go('Profile');
    }
    $scope.Parametre = function()
    {

        $state.go('Paramétres');

    }



}])



/*
Calendrier Controller
 */
.controller('calendrierCtrl',['$scope','locationService','$compile', function($scope,locationService,$compile){

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        /* alert on eventClick */
        $scope.alertOnEventClick = function( date, jsEvent, view){


            console.log('' +date.title)
            Materialize.toast(date.title, 4000)

        };
        /* alert on Drop */
        $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
            $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
        };
        /* alert on Resize */
        $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
            $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };
        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function(sources,source) {
            var canAdd = 0;
            angular.forEach(sources,function(value, key){
                if(sources[key] === source){
                    sources.splice(key,1);
                    canAdd = 1;
                }
            });
            if(canAdd === 0){
                sources.push(source);
            }
        };










        $scope.eventRender = function( event, element, view ) {

            element.attr({'tooltip': event.title,
                'tooltip-append-to-body': true});
            $compile(element)($scope);

        }






        /* config object */
        $scope.uiConfig = {
            calendar:{
                height: "100%",
                editable: true,
                header:{
                    left: 'month basicWeek basicDay agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender

            }
        };






        $scope.eventSources = [
            [

            ]
        ];




            var i = 0
            var event1,event2;

var locations = [];

        locationService.getByEtat('En_Cours')
            .then(function(data){


                locations = data.data.rows ;
                console.log('locations' + locations.length)
                for(var i=0;i<locations.length;i++) {


                    event1 = {
                        "title": locations[i].Client.Nom + '_' + locations[i].Client.prenom + '\n' +
                        locations[i].Modele.nom_modele + ' ' + locations[i].Modele.marque + '\n' +
                        'Nb Jours :' + locations[i].Nbr_Jours + '\n' +
                        '17:00-17:00',
                        "start": locations[i].dateDebut,
                        "end": locations[i].dateDebut,
                        "description": locations[i].Client.Nom + " " + locations[i].Client.prenom,
                        eventColor: '#378006',
                        backgroundColor: '#008000',
                    }


                    event2 = {
                        "title": locations[i].Client.Nom + '_' + locations[i].Client.prenom + '\n' +
                        locations[i].Modele.nom_modele + ' ' + locations[i].Modele.marque + '\n' +
                        'Nb Jours :' + locations[i].Nbr_Jours + '\n' +
                        '17:00-17:00',
                        "start": locations[i].dateFin,
                        "end": locations[i].dateFin,
                        "description": "nom_client",
                        eventColor: '#37006',
                        backgroundColor: '#DC143C',
                    }


                    //pour la peristant des evenemtns
                    event1.stick = true;
                    event2.stick = true;
                    //event1.className = ['highPriority'];

                    //ajouter l'event au eventSources
                    $scope.eventSources[0].push(event1);
                    $scope.eventSources[0].push(event2);

                }//end of for

            }).catch(function(err){

            })



//convertir les dates
                /*locations[i].dateDebut = new Date(locations[i].dateDebut);
                locations[i].dateFin = new Date(locations[i].dateFin);
                //
                locations[i].dateDebut.setHours(Number(locations[i].heureDebut));
                locations[i].dateFin.setHours(Number(locations[i].heureFin));*/

///*locations[i].Client.nom*/ + ' ' +locations[i].Client.prenom











    }])










/*
Conducteur Controller
 */

.controller('conducteursController',['$scope','ConducteursFactory','$state','notify', function($scope,ConducteursFactory,$state,notify){





        //la liste des chauffeurs
        $scope.drivers=[];
        //objet vide pour un chauffeur
        $scope.driver ={};

        //objet vide pour le nouveua chauffeur
        $scope.newDriver = {};

        $scope.showAdd= false ;

        //variable pour valider la form

        $scope.submitted = false ;



        $scope.change = function()
        {
            $scope.showAdd = !$scope.showAdd;
        }






        /*
         -_-_-_-_-_-__-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-
         -__-_-_-_-_-_RÉCUPERER TOUS LES CHAUFFEURS-_-_-_-_-_-_-__-
         */



      function getDrivers()
        {
            ConducteursFactory.getDrivers()
                .then(function(data){
                    $scope.drivers =data.data ;

                }, function(err){
                    console.log('err' + err);
                })
        }


        getDrivers(); //

        /*
         -_-_-_-_-_-__-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-
         -__-_-_-_-_-_MODIFIER CHAUFFEUR_-_-_-_-_-_-__-
         */



        $scope.updateDriver = function(id,driver)
        {

            $scope.submitted=true;

           ConducteursFactory.updateDriver(id,driver)
                .then(function(data){



                }, function(err){
                    console.log('err  !' + err);
                })



        }



        /*
         -_-_-_-_-_-__-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-
         -__-_-_-_-_-_Ajouter CHAUFFEUR_-_-_-_-_-_-__-
         */


        $scope.addDriver = function()
        {

            $scope.submitted = true;
            //check if idDriver not null !
            if($scope.newDriver.idConducteur!=null)
            {

                if($scope.driverForm.$valid) {
                    $scope.updateDriver($scope.newDriver.idConducteur, $scope.newDriver);
                    notify("Succés de modification !");
                    $state.go('conducteurs');
                }
            }
            else {

                if($scope.driverForm.$valid) {

                   ConducteursFactory.postDriver($scope.newDriver)
                        .then(function (response) {
                            $scope.change();
                            notify("Succés d'ajout");
                            getDrivers();


                        }, function (err) {
                            console.log('err !' + err);
                        })

                }//end if valid form
            }


        }



        /*
         -_-_-_-_-_-__-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-
         -__-_-_-_-_-_SUPPRIMER CHAUFFEUR_-_-_-_-_-_-__-
         */

        $scope.deleteDriver = function(id)
        {


           ConducteursFactory.deleteDriver(id)
                .then(function(){
                    notify('Succés de suppresion');




                },function(err){
                    console.log('err !' +err);
                })
        }

        /*
         -_-_-_-_-_-__-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-
         -__-_-_-_-_-_EDITER CHAUFFEUR_-_-_-_-_-_-__-
         */



        $scope.editDriver = function(id)
        {
            for(var i=0;i<$scope.drivers.length;i++)
            {
                if($scope.drivers[i].idConducteur==id)
                {
                    $scope.newDriver = $scope.drivers[i];
                    $scope.newDriver.datePermis = new Date($scope.newDriver.datePermis);
                    break;
                }
            }

            $state.go('.add');



        }





    }])



/*
Contrat Controller

 */


.controller('CreateContratsController', ['$scope','$http','$filter','$stateParams','$state','ContratService','moment','Reservation_Contrat_Service','notify' ,function($scope,$http,
                                                                                                                                                                                              $filter,$stateParams,$state,
                                                                                                                                                                                              ContratService,
                                                                                                                                                                                              moment,Reservation_Contrat_Service,
                                                                                                                                                                                              notify){


// c une variable pour affciher un message de succes d'authentfication
        $scope.success = false ;





        $scope.Reservation ={}

        console.log('contrat service' + JSON.stringify(Reservation_Contrat_Service.getReservation()));

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





//test si les autres attributs sont nulls$


            ContratService.createContrat($scope.newContrat)
                .success(function(){

                    /* notify('le Contrat est cére avec succes !');
                     $state.go('contrats');*/
                    window.print();
                    Reservation_Contrat_Service.removeReservation();
                    $state.go('contrats');

                })
                .error(function(err){
                    console.log('err' + err);

                })



        }










    }])




/*
Contra controller
 */

.controller('ContratsController', ['$scope','$http','$filter','$stateParams','$state','ContratService','moment','notify','locationsFactory' ,function($scope,$http, $filter,$stateParams,$state,
                                                                                                                                                                                              ContratService,
                                                                                                                                                                                              moment,notify,locationsFactory){


        $scope.contrats = [];
        $scope.clients =[];
        $scope.contrat ={};
        $scope.detailsshow = false;

        $scope.edit = false ;
        $scope.location ={};





//on doit pour chaque réservation aficher le client , et la voiture donc on va récuperer toutes lec clients









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

        $scope.facture ={};


        $scope.GenereFacture = function(ctrl)
        {

            //attahcer tous ses attributs



            $state.go('Create_Facture',{contrat:ctrl})

        }






    }])


/*
Entretients Controller
 */
.controller('EntretientsCtrl',['$scope','EntretientService','VoitureService','$state','notify', function($scope,EntretientService, VoitureService,$state,notify){



        $scope.cars = [];
        $scope.newEntretient = {};
        $scope.show = false ;
        $scope.entretien ={};
        $scope.showupdate = false;

        $scope.shwoUpdate = false ;
        $scope.submitted = false;



        function getCars()
        {
            VoitureService.getCars()
                .then(function(data){


                    $scope.cars=data.data ;
                    for (var i = 0; i < $scope.cars.length; i++) {
                        $scope.cars[i].date_assurance = new Date($scope.cars[i].date_assurance);
                        $scope.cars[i].date_visite_tecknique = new Date($scope.cars[i].date_visite_tecknique);
                        $scope.cars[i].date_vignette = new Date($scope.cars[i].date_vignette);


                    }



                }, function(err){
                    console.log('err' + err);
                })
        }


        getCars();







        $scope.update = function(entretient)
        {


            $scope.submitted = true ;

            EntretientService.updateEntretient(entretient.idEntretien,entretient)
                .then(function(result)
                {

                    $scope.shwoUpdate=true;
                    $state.reload();


                }, function(err){
                    console.log('enable to update data !' + err);
                })
        }




        /*
         delete entretient
         */

        $scope.delete = function(idEntretien)
        {


            EntretientService.deleteEntretient(idEntretien)
                .then(function(result)
                {
                    console.log('deleted succesfuly !');
                    $state.reload();


                }, function(err){
                    console.log('err!' + err);
                })
        }


        /*

         */



        $scope.addEntretient = function(Voiture)
        {

            $scope.submitted = true;
            $scope.newEntretient.Voiture_idVoiture = Voiture.idVoiture;
            $scope.newEntretient.Voiture_Modele_idModele = Voiture.Modele_idModele;
            //save it !

            $scope.show=false;



            EntretientService.postEntretient($scope.newEntretient)
                .then(function (res) {

                    $state.show = false;
                    notify('Ajouté avec succés !');
                    $state.reload();



                }, function (err) {
                    console.log('err !' + JSON.stringify(err));
                })


            $scope.newEntretient={};



        }

        /*

         */







        $scope.save = function(car)
        {
            //update the car

            VoitureService.updateCar_dates(car.idVoiture,car)
                .then(function(data){
                    console.log('we will update this data')
                    notify('les dates sont bien mise a jour !')
$state.reload();

                }, function(err){
                    console.log('err ' + err);
                })

        }


        $scope.editerEntretient = function(id){

            EntretientService.getEntretient(id)
                .then(function(data){


                    $scope.showupdate = true ;

                    $scope.entretien = data.data ;

                }).catch(function(err){
                    console.log('err' + JSON.stringify(err));
                })
        }


    }])







/*
Facture Controller
 */


.controller('FacturesController',['$scope','factureFactory','$stateParams','locationsFactory','notify','$window', function($scope,factureFactory,$stateParams,locationsFactory,notify,$window){

        $scope.factures = [];
        $scope.facture ={} ;
        $scope.location ;


        $scope.dateDay = new Date();





        if($stateParams.contrat) {
            $scope.facture.tva = $stateParams.contrat.tva;
            $scope.facture.prixHt = $stateParams.contrat.prixHt;
            $scope.facture.prixTT = $stateParams.contrat.prixTT;
            $scope.facture.Contrat_idContrat = $stateParams.contrat.idContrat;

        }



        if( !angular.isUndefined($stateParams.contrat)) {
            $scope.location = locationsFactory.get({
                idReservation: $stateParams.contrat.Reservation_idReservation

            }, function () {
                console.log('ok done !');

            })


        }///end of if




        $scope.save = function(facture)
        {


            factureFactory.postFacture(facture).then(function(result){

                console.log('sauvgardé avec succées !');
                window.print();
            }, function(err){
                console.log('err' + err);
                throw  err;
            })

        }





        getFactures = function()
        {
            factureFactory.getFactures()
                .then(function(data){
                    $scope.factures =data.data ;

                }, function(err){
                    console.log('err' + err);
                })


        }

        getFactures();




        updateFacture = function(id)
        {


            var facture ={};

            for(var i=0;i<$scope.factures.length;i++)
            {
                if($scope.factures[i].id==id)
                {
                    facture = $scope.factures[i];
                    break ;
                }

            }

            //update the bill

            factureFactory.updateFacture(facture)
                .then(function(data){
                    $scope.status ="200 ok !";
                    console.log($scope.status);

                }, function(err){
                    console.log('err !'+ err);
                })

        }



        $scope.deleteFacture = function(id)
        {
            console.log('the id is' + id);
            factureFactory.deleteFacture(id)
                .then(function(result){

                    notify('supprimée !');
                    getFactures();
                    // $window.location.reload();
                }, function(err){
                    console.log('err' + err);
                })

        }




    }])







/*
location Controller
 */


.controller('locationsController',['$scope','$http','locationService','ClientsService','VoitureService','$state','$location','Reservation_Contrat_Service', function($scope,$http,locationService,ClientsService,
                                                                                                                                                                     VoitureService,$state,$location
        ,Reservation_Contrat_Service){





        //déclarer toutes les variables nécessairs des locations

        $scope.location_encours =[];
        $scope.locations_retard =[];
        $scope.locations_cloture =[];
        $scope.locations_attente =[];

        //defénir les 4 méthodes d'appéles


        function getlocations_en_cours(){

            locationService.getByEtat("En_Cours")
                .then(function(data){

                    console.log('data' + JSON.stringify(data));
                    $scope.location_encours = data.rows ;

                })
                .catch(function(err){
                    console.log('err' + JSON.stringify(err))
                })
        }



          function getlocations_retard(){

              locationService.getlocations_retard()
                  .then(function(data){
                      $scope.locations_retard = data.rows;

                  })
                  .catch(function(err){

                      console.log('err' + JSON.stringify(err));

                  })


          }




        function getlocations_cloture(){

            locationService.getByEtat("cloturee")
                .then(function(data){

                    $scope.locations_cloture =data.rows ;

                })
                .catch(function(err){
                    console.log('err' + JSON.stringify(err))
                })


        }


        function getlocations_attente(){
            locationService.getByEtat("attente")
                .then(function(data){

                    $scope.locations_attente = data.rows ;

                })
                .catch(function(err){
                    console.log('err' + JSON.stringify(err))
                })

        }



        //faire l'appel des 4 méthodes

        getlocations_attente();
        getlocations_cloture();
        getlocations_en_cours();
        getlocations_retard();










        $scope.clients = []
        $scope.cars = [];

        $scope.location ={}
        $scope.newReservation ={};
        $scope.value = false;







        //detila slocation

        $scope.locationDetails = false ;


        //Por vérifier l'envoi du form
        $scope.submitted = false ;


        //variable pour voir les locations

        $scope.addOrEdit = false ;



        ClientsService.getClients()
            .success(function(res){


                $scope.clients =res[0] ;


            })

        VoitureService.getCars()
            .success(function(res){
                $scope.cars = res[0] ;

            })





        $scope.supprimlocation = function(id)
        {

            locationService.deletelocation(id)
                .then(function(data){

                    console.log('result' + JSON.stringify(data));

                }).catch(function(err){

                    console.log('err' + JSON.stringify(err));

                })

        }

        /*

         */



        $scope.editlocation = function(id)
        {


            //metree a true
            $scope.addOrEdit = true;

            locationService.getById(id)
                .then(function(data){
                    console.log('data' + JSON.stringify(data));
                    $scope.location = data

                }).catch(function(err){

                })


        }



        /*

         */


        $scope.addReservation = function()
        {

            $scope.submitted = true;

            if($scope.ResForm.$valid)
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

//iic update


                    locationService.updatelocation($scope.location.numReservation,$scope.newReservation)

                        .then(function(data){
                            console.log('data' + JSON.stringify(data));

                        }).catch(function(err){
                      console.log('err ' + JSON.stringify(err));
                })

                }
                else {

                    locationService.savelocation($scope.newReservation)

//ici save

                }




            }//end of if test !!!

        }




        /*
         uen fonction pour faire la redirection vers une autre page
         */

        $scope.contrat = function(id)
        {


        }


/*
une fonction pour colturer
 */

        $scope.cloture = function(id){

locationService.cloturelocation(id)
    .then(function(data){
        console.log('cloture' + JSON.stringify(data));
    }).catch(function(err){
        console.log('err' + JSON.stringify(err));
    })
        }


    }])



/*
login Controller
 */
.controller('loginCtrl',['$scope','$location','Authentication', function($scope,$location,Authentication){

// get the controller with this

        $scope.submitted = false ;
        $scope.error = false ;

        // initialize the
        $scope.data={

            email :"",
            password :""
        }

        // define teh functions

        $scope.onSubmit = function()
        {
            $scope.submitted = true;

            if($scope.adminForm.$valid) {
                Authentication.login($scope.data)
                    .error(function (err) {
                        $scope.error=true;
                    })
                    .then(function (result) {


                        $location.path('/auth/admin/admin'); // redirect him to the profile page
                    })


            }//end if

        }


    }])







/*
Manager Controller
 */

.controller('ManagerController',['$scope','Authentication','ManagerFactory','$window', function($scope,Authentication,ManagerFactory,$window){

        $scope.show = false ;
        $scope.show2 = false ;
        $scope.show3  = true;

        $scope.newManager ={};
        $scope.Manager ={};
        $scope.managers =[];



        $scope.user = Authentication.currentUser();



        getManagers = function()
        {
            ManagerFactory.getManagers()
                .then(function(result){

                $scope.managers = result.data;
            }, function(err){
                    console.log('err' + err);
                })

        }

        getManagers();


        $scope.addManager = function()
        {

            console.log('newManger' + JSON.stringify($scope.newManager));

           ManagerFactory.addManager($scope.newManager)
                .then(function(result){

                    $scope.show = false;
                    $scope.show2= true;

                   $window.location.reload();
                }, function(err){
                       console.log('err' + JSON.stringify(err));
                })



        }

        $scope.updateManager = function()
        {


            console.log('User' + JSON.stringify($scope.user));

          ManagerFactory.updateManager( $scope.user._id, $scope.user)
                .then(function(result){

                  console.log('resul' + JSON.stringify(result));
                    $scope.show3= true;

                }, function(err){
                    console.log('err :' + err);
                })

        }

        $scope.deleteManager = function(id)
        {
            ManagerFactory.deleteManager(id)
                .then(function(result){


                    console.log('result' + JSON.stringify(result));
                    $window.location.reload();
                }, function(err){
                    throw err;
                })

        }




    }])

/*
Parametre controller
 */

.controller('ParametresController',['$scope','ParametresService','$location','$window', function ($scope,ParametresService,$location,$window) {





        /*
         Access[0] == location
         Access[1] == Voiture
         Access[2] == Entretients
         Access[3] == Contrats
         Access[4] == Factures
         Access[5] == Client

         Access[6] == Conductuer

         */


        $scope.Access = JSON.parse(ParametresService.getParams());






        $scope.save = function()
        {



            for(var i=0;i<6;i++)
            {

                if($scope.Access[i]!=true  )
                {
                    $scope.Access[i] =false;

                }
            }

            ParametresService.saveParams( $scope.Access );
            $window.location.reload();

        }







    }])








/*
Preservation Controller
 */


.controller('PreReservationCtrl',['$scope','$state','PreReservationService','locationsFactory', function($scope,$state,PreReservationService){


        //méthode pour récuprer toutes les Preservations
        /*$scope.prereservations =[];

        $scope.prereservation ={};
        $scope.nbr = 0;

        $scope.getPreReservations = function()
        {
            PreReservationService.getPreReservations()
                .then(function(result){

                    $scope.nbr = result.data.length ;

                    $scope.prereservations = result.data;

                }, function(err){
                    console.log('err' + err);
                })
        }


        $scope.getPreReservations();*/


        /*$scope.delete = function(id)
        {
            PreReservationService.deletePrereservation(id)
                .then(function(result){
                    $scope.status ="deleted preservation!";
                    alert('this preservation will be deletd !');
                    $scope.getPreReservations();
                    console.log($scope.status);
                }, function(err){
                    console.log('err' + err);
                })

            //$state.go('locations');

        }


        $scope.confirmer = function(id)
        {
            //get the Preservation
            for(var i=0;i<$scope.prereservations.length;i++)
            {
                if($scope.prereservations[i].idReservation==id)
                {
                    $scope.prereservation= $scope.prereservations[i] ;
                    break ;
                }
            }

            console.log('we willadd this to the database');

            PreReservationService.saveReservation($scope.prereservation)
                .then(function(status){
                    console.log('saved sucuesfuly !' + status);


                    $scope.delete($scope.prereservation.idReservation);
                    $scope.getPreReservations();
                    $state.go('locations');
                }, function(err){
                    console.log('err :' + err);
                })


        }



        $scope.archiver = function(){
            alert('cette réservation est archivée !');
        }*/


    }])





/*
Statistique Controller
 */
.controller('statistciCtrl',['$scope','$http', function ($scope,$http) {

        $scope.carsChiffreAffairs = [];
        $scope.clientsStatus =[];





        $scope.myChartObject = {};


        $scope.myChartObject.type = "ColumnChart";


        $scope.data = [1500,1500,4500,2600]


        //service1 for cars
        $http.get('/auth/admin/statiscCars')
            .then(function(data){

                $scope.carsChiffreAffairs = data.data;


                var rowsCar =[];

                //remplir les ligne sici



                var rows1 =[];





                rows= [

                    {c: [
                        {v: $scope.carsChiffreAffairs[0].car.Modele.nom + " " + $scope.carsChiffreAffairs[0].car.Modele.marque },
                        {v:  $scope.carsChiffreAffairs[0].chiffre_affaire},
                    ]},

                    {c: [
                        {v: $scope.carsChiffreAffairs[1].car.Modele.nom + " " + $scope.carsChiffreAffairs[1].car.Modele.marque},
                        {v: $scope.carsChiffreAffairs[1].chiffre_affaire}
                    ]},
                    {c: [
                        {v: $scope.carsChiffreAffairs[2].car.Modele.nom + " " + $scope.carsChiffreAffairs[2].car.Modele.marque},
                        {v: $scope.carsChiffreAffairs[2].chiffre_affaire},
                    ]},
                    {c: [
                        {v: $scope.carsChiffreAffairs[3].car.Modele.nom + " " + $scope.carsChiffreAffairs[3].car.Modele.marque},
                        {v: $scope.carsChiffreAffairs[3].chiffre_affaire},
                    ]},
                    {c: [
                        {v: $scope.carsChiffreAffairs[4].car.Modele.nom + " " + $scope.carsChiffreAffairs[4].car.Modele.marque},
                        {v: $scope.carsChiffreAffairs[4].chiffre_affaire},
                    ]},
                    {c: [
                        {v: $scope.carsChiffreAffairs[5].car.Modele.nom + " " + $scope.carsChiffreAffairs[5].car.Modele.marque},
                        {v: $scope.carsChiffreAffairs[5].chiffre_affaire},
                    ]},
                    {c: [
                        {v: $scope.carsChiffreAffairs[6].car.Modele.nom + " " + $scope.carsChiffreAffairs[6].car.Modele.marque},
                        {v: $scope.carsChiffreAffairs[6].chiffre_affaire},
                    ]},
                    {c: [
                        {v: $scope.carsChiffreAffairs[7].car.Modele.nom + " " + $scope.carsChiffreAffairs[7].car.Modele.marque},
                        {v: $scope.carsChiffreAffairs[7].chiffre_affaire},
                    ]},
                    {c: [
                        {v:$scope.carsChiffreAffairs[8].car.Modele.nom + " " + $scope.carsChiffreAffairs[8].car.Modele.marque},
                        {v: $scope.carsChiffreAffairs[8].chiffre_affaire},
                    ]},
                    {c: [
                        {v: $scope.carsChiffreAffairs[9].car.Modele.nom + " " + $scope.carsChiffreAffairs[9].car.Modele.marque},
                        {v: $scope.carsChiffreAffairs[9].chiffre_affaire},
                    ]},

                    {c: [
                        {v: $scope.carsChiffreAffairs[10].car.Modele.nom + " " + $scope.carsChiffreAffairs[10].car.Modele.marque},
                        {v: $scope.carsChiffreAffairs[10].chiffre_affaire},
                    ]},
                ]










                $scope.myChartObject.data = {"cols": [
                    {id: "t", label: "Topping", type: "string"},
                    {id: "s", label: "Recette", type: "number"}
                ], "rows": rows
                };




                //function err

            }, function(err){
                console.log('err' + err);
            })

        $scope.myChartObject.options = {
            'title': "Chiffre d'affaires"
        };


        //-__--_-_-_-_-__-_--_-_-_-_-_--_-_-_-_-_-_-__
        /*
         _-_-_-_-_-_-_-_-_-_--__-_-_-_-_-_-_
         _-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-
         _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
         */





        $scope.myChartObject2 = {};

        $scope.myChartObject2.type = "ColumnChart";

        $http.get('/auth/admin/statiscClient')
            .then(function (data) {

                $scope.clientsStatus = data.data



                /*
                 get the data
                 */
                $scope.myChartObject2.data = {"cols": [
                    {id: "t", label: "Topping", type: "string"},
                    {id: "s", label: "Professionnel", type: "number"},
                    {id: "s", label: "Particulier", type: "number"}
                ], "rows": [
                    {c: [
                        {v: "Particuiler"},
                        {v:  0},
                        {v: $scope.clientsStatus["particulier"]},

                    ]},

                    {c: [
                        {v: "Professionnel"},
                        {v:  $scope.clientsStatus["professionel"]},
                        {v: 0}
                    ]},









                ]};

                $scope.myChartObject2.options = {
                    'title': "Clients"
                };




            }, function (err) {
                console.log('err' + err);
            })






    }])









/*
 _-_-_-_-_-_-_-_-_-_-_-Voiture CTRL-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */


.controller('voituresController',['$scope','VoitureService','modeleFactory','$state','notify','$stateParams','$rootScope','Upload','$window', function($scope,VoitureService,modeleFactory,$state,notify,$stateParams,$rootScope,Upload,$window) {









        // une variable pour vérfiier la formulaire lors de l'envoi
        $scope.submitted = false ;


        //une variable pour vérifier
        $scope.submitted2 = false ;




        //liste des voiture
        $scope.cars=[];

        //initializer l'object voiture
        $scope.car ={};

        //pour travailer avec une nouvelle voiture
        $scope.newCar = {};

        //pour afficher ou cacherle formulaire du modéle
        $scope.show = false ;


        //l'objet du nouveau modéle
        $scope.newModele = {};

        //initializer les prix GP, chauffeur , bébe
        $scope.newModele.prixGPS = 25;
        $scope.newModele.prixChaisse =25;
        $scope.newModele.prixChauffeur = 25;

        // la liste des modéles
        $scope.models = [];
        //pour récuper la liste des chiffres d'affires d'apres le serveur
        $scope.chiffreAffaire =[];


        //show hide la formulaire d'ajout ou d'edit d'une voiture
        $scope.carAdd = false;

        $scope.showEdit = false ;


        /*
         _-_-_-_-_-_-_-_-_-_-_-__--_-_
         -_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
         _--__-_-_-_-_-_-_-__-_---------------------_-_-__-_-_-_-_
         */


        $scope.getAdd = function()
        {
            //ici est une méthode pour afficher la formulaire a chaque clic

            $scope.carAdd = ! $scope.carAdd;
        }


        /*
         _-_-_-_-_-_-_-_-_-_-_-__--_-_
         -_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
         _--__-_-_-_-_-_-_-__-_---------------------_-_-__-_-_-_-_
         */


        //est une fonction pour afficher ou hide le formulaire d'ajout d 'un nouveau modéle
        $scope.change = function()
        {
            $scope.show = ! $scope.show;
        }




        //récuper les modeles
        modeleFactory.getModeles()
            .success(function(data){
                $scope.models = data;

            })




        /*
         _-_-_-_-_-_-_-_-_-_-_-__--_-_
         -_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
         _--__-_-_-_-_-_-_-__-_---------------------_-_-__-_-_-_-_
         */

//une fonction pour récuperrer toutess les voitures


        function getCars()
        {
            VoitureService.getCars()
                .then(function(data){

                    $scope.cars=data.data ;

                }, function(err){
                    console.log('err' + err);
                })
        }






        getCars(); // load the cars




        /*
         _-_-_-_-_-_-_-_-_-_-_-__--_-_
         -_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
         _--__-_-_-_-_-_-_-__-_---------------------_-_-__-_-_-_-_
         */




        /*
         _-_-_-_-_-_-_-_-_-_-_-__--_-_
         -_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
         _--__-_-_-_-_-_-_-__-_---------------------_-_-__-_-_-_-_
         */
        //Voiture Details

        /*$scope.voitureDetails = function(id){
            console.log('id voiture' + id)

            //on va récuper la voiture


        }*/


//voityure details

        $scope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams){


                id = toParams.idVoiture

                console.log('id' + id);
                VoitureService.getCar(id)
                    .then(function(data){


                        $scope.car = data.data.car ;
                        $scope.nbr = data.data.nbr ;
                        $scope.chiffre = data.data.chifre_affaire;





                            $scope.car.date_vignette =new Date(  $scope.car.date_vignette);
                            $scope.car.date_visite_tecknique =new Date( $scope.car.date_visite_tecknique);
                            $scope.car.date_assurance = new Date( $scope.car.date_assurance );

                        console.log('car' + JSON.stringify($scope.car));

                    }).catch(function(err){
                        console.log('err' + JSON.stringify(err));
                    })


            })






//pour le chnagement des dates lors de modification





        $scope.file2 ;

        $scope.editCar = function(){
            $scope.showEdit = true;
        }



        //ue fonction pour faire la mise a jour d 'une voiture

        $scope.updateCar = function()
        {



            $scope.submitted= true;



            $scope.car.photo = $scope.name2;

console.log('car' + JSON.stringify($scope.car) + 'name2' + $scope.name2);

            Upload.upload({
                url: 'http://localhost:3000/auth/admin/admin/voiture/'+ $scope.car.idVoiture, //webAPI exposed to upload the file
                data:{file:$scope.file2 , car:$scope.car} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise


                console.log('resp' + resp);
                if(resp.data.error_code === 0){ //validate success
                    //notfiy
                } else {
                    $window.alert('Erreur');
                }
            }, function (resp) { //catch error

            }, function (evt) {

                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress




            });







        }


        /*
         _-_-_-_-_-_-_-_-_-_-_-__--_-_
         -_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
         _--__-_-_-_-_-_-_-__-_---------------------_-_-__-_-_-_-_
         */


        $scope.file ;


        //ajouter uen nouvelle voiture

        $scope.addCar = function()
        {



            $scope.submitted= true;



            $scope.newCar.photo = $scope.name;



                    Upload.upload({
                        url: 'http://localhost:3000/auth/admin/admin/voitures', //webAPI exposed to upload the file
                        data:{file:$scope.file, car:$scope.newCar} //pass file as data, should be user ng-model
                    }).then(function (resp) { //upload function returns a promise

                        if(resp.data.error_code === 0){ //validate success
                            //notfiy
                        } else {
                            $window.alert('Erreuer');
                        }
                    }, function (resp) { //catch error

                    }, function (evt) {

                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress




                    });










            }





        /*
         _-_-_-_-_-_-_-_-_-_-_-__--_-_
         -_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
         _--__-_-_-_-_-_-_-__-_---------------------_-_-__-_-_-_-_
         */

        /*
         _-_-_-_-_-_-_-_-_-_-_-Ajouter un nouveau modéle-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
         */



        $scope.addModele = function()
        {

            $scope.submitted2= true;



            if($scope.ModeleForm.$valid) {

                modeleFactory.postModele($scope.newModele)
                    .then(function (response) {

                        console.log('addes modle success !');

                        $scope.newModele = {};
                        //refraishir la formulaire d'edit
                        $scope.getAdd();


                    }, function (err) {
                        console.log('err !' + err);
                    })


            }//end of ModeleForm $valid test

        }


        /*
         _-_-_-_-_-_-_-_-_-_-_-__--_-_
         -_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
         _--__-_-_-_-_-_-_-__-_---------------------_-_-__-_-_-_-_
         */


        //une fonction pour supprimer une voiture

        $scope.deleteCar = function(id)
        {


            alert('we will delete thsi car !');
            VoitureService.deleteCar(id)
                .then(function(){

                    getCars();
                    //refraishir la formulaire d'edit
                    $scope.getAdd();



                },function(err){
                    console.log('err !' +err);
                })
        }







    }])


    .controller('clientsController',['$scope','$http','ClientsService','$state','notify', function ($scope,$http,ClientsService,$state,notify) {

        var _this = this;


//initilizer les variables

        _this.ClientEdit = false ;
        _this.clients = [];
        _this.ClientDetails = false;
        _this.client ={};
        _this.submitted


        function getClients(){
            ClientsService.getClients()
                .success(function(clients){
                    console.log('clients' + JSON.stringify(clients))
                    _this.clients
                }).catch(function(err){
                    console.log('err' + JSON.stringify(err));
                })
        }


        getClients();



//editer

        _this.editClient = function(idClient){
            _this.ClientEdit= true;
            ClientsService.getClient(idClient)
                .success(function(result){

                    console.log('resul' + JSON.stringify(result));
                    _this.client = result
                })
                .error(function(err){
                    console.log('err' + err)
                })
        }


        //supprimer
        _this.deleteClient = function(idClient){

            _this.deleteClient(idClient)
                .success(function(result){
                    console.log('result' + result)
                }).error(function(err){
                    console.log('err' + err)
                })

        }

        _this.detailsClient = function(idClient){
            ClientsService.getClient()
                .success(function(result){

                    console.log('resul' + JSON.stringify(result));
                    _this.client = result
                })
                .error(function(err){
                    console.log('err' + err)
                })

        }


        _this.updateClient = function(){
            ClientsService.updateClient(_this.client.idClient,_this.client)
                .success(function(result){
                    console.log('result' + result)
                })
                .error(function(err){
                    console.log('err' + err)
                })
        }

        _this.show = true ;
        _this.submitted = false ;

        _this.data ={};

        _this.sendMail = function() {
            _this.submitted = true;
            if (_this.emailForm.$valid) {

                $http.post('/auth/admin/sendMail', _this.data)
                    .then(function (res) {

                        $state.go('clients');

                        notify('email envoyé avec succées !')


                    }, function (err) {
                        console.log('err' + err);
                    })


            }

        }//end if form valid

    }])













/*

 */


    .controller('AlertesCtrl',['$scope','$http','$state','notify','AlerteService', function ($scope,$http,$state,notify,AlerteService) {



         function getEntretients(){

             AlerteService.getALLAlertes()
                 .then(function(){

                 }).catch(function(err){

             })

         }



       getEntretients();



        $scope.deleteEntretient = function(id){
            AlerteService.deleteAlerte(id)
                .then(function(result){

                }).catch(function(err){
                    console.log('err' + err)
                })
        }

    }])