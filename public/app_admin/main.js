
var App = angular.module('adminApp',['ui.router','ngResource','ngMessages','ui.materialize','cgNotify','angularMoment','googlechart'
,'ui.calendar','ngStorage','btford.socket-io','ngAudio','ngFileUpload']);


//'btford.socket-io','ngAudio','atomic-notify'

/*
define our factory interceptor
 */



/*
the config for the ROUTING
 */

function config($stateProvider, $urlRouterProvider) {



    $urlRouterProvider.otherwise('/');

    $stateProvider

        //  ========================================
        .state('admin', {
            url: '/',
            templateUrl: 'app_admin/form_login.html',
            controller: 'loginCtrl',
        })

        //  =================================
        .state('admin_access', {
            url: '/auth/admin/admin',
            templateUrl: '/app_admin/Admin.html',
            controller :'AdminCtrl',
            resolve: {
                app: function ($q, $rootScope, $location,ParametresService,Authentication,notify) {
                    var defer = $q.defer();


                    if (angular.isUndefined(Authentication.currentUser())) {


                        $location.path('/');

                        deferred.reject();
                    }
                    ;
                    defer.resolve();
                    return defer.promise;
                }
            }

        })





        .state('Calendrier', {
            url :'/Calednrier',
            templateUrl: '/app_admin/partials/Calendrier/calendrier.html',
            parent: "admin_access",
            controller :'calendrierCtrl'



        })


        //  =================================
        .state('Profile', {
            url :'/Profile',
            templateUrl: '/app_admin/partials/Managers/Profile.html',
            parent: "admin_access",
            controller :'ManagerController',

           resolve: {
                app: function ($q, $rootScope, $location,ParametresService,Authentication,notify) {
                    var defer = $q.defer();


                    if (Authentication.currentUser().role !=true) {
                        notify("Vous n'ets pas authorizé d'accéder ici !");

                        deferred.reject();
                    }
                    ;
                    defer.resolve();
                    return defer.promise;
                }
            }

        })


        //  =================================
        .state('Paramétres', {
            url :'/Paramétres',
            templateUrl: '/app_admin/partials/parametres/Paramétres.html',
            parent: "admin_access",
            controller :'ParametresController',
           resolve: {
                app: function ($q, $rootScope, $location,ParametresService,Authentication,notify) {
                    var defer = $q.defer();


                    if (Authentication.currentUser().role !=true) {
                        notify("Vous n'ets pas authorizé d'accéder ici !");

                        deferred.reject();
                    }
                    ;
                    defer.resolve();
                    return defer.promise;
                }
            }





        })



        //  =================================
        .state('Messages', {
            url :'/Messages',
            templateUrl: '/app_admin/partials/pages/Messages.html',
            parent: "admin_access",

        })

        //  =================================

        .state('locations', {
               url :'/locations',
            templateUrl: '/app_admin/partials/locations/locations2.html',
            parent: "admin_access",
            controller :'locationsController',

           resolve: {
                app: function ($q, $rootScope, $location,Authentication,ParametresService,notify) {
                    var defer = $q.defer();
                  var tab = JSON.parse(ParametresService.getParams());




                    if ( (Authentication.currentUser().role==false) && (tab[0]==false) ) {
                        notify("Vous n'ets pas authorizé d'accéder ici !");
                        deferred.reject();
                    }

                    defer.resolve();
                    return defer.promise;
                }
            }

        })

        //  =================================

        .state('locations.add', {
            url :'/addReservation',
            templateUrl: '/app_admin/partials/locations/Creer_location.html',
            parent: "locations",
            controller :'locationsController'

        })

        //  =================================

        .state('locations.details', {
            url :'/locationDetails',
            templateUrl: '/app_admin/partials/locations/Details_location.html',
            parent: "locations",
            controller :'locationsController'

        })

        //  =================================





        .state('Reservations', {
            url :'/reservations',
            templateUrl: '/app_admin/partials/Réservations/Reservations.html',
            parent: "admin_access",
            controller :'locationsController',

           resolve: {
                app: function ($q, $rootScope, $location,ParametresService,Authentication,notify) {
                    var defer = $q.defer();


                    if (( (Authentication.currentUser().role==false) && (tab[1]==false) ) ) {
                        notify("Vous n'ets pas authorizé d'accéder ici !");

                        deferred.reject();
                    }

                    defer.resolve();
                    return defer.promise;
                }
            }

        })

        //  =================================


        .state('locationsRetard', {
            url :'/locationRetard',
            templateUrl: '/app_admin/partials/locations/locations_Retard.html',
            parent: "admin_access",
            controller :'locationsController'

        })


        //  =================================


        .state('locationsCloturee', {
            url :'/locationCloturee',
            templateUrl: '/app_admin/partials/locations/locations_cloturee.html',
            parent: "admin_access",
            controller :'locationsController'

        })


        //  =================================

        .state('voitures', {
            url :'/voitures',
            templateUrl: '/app_admin/partials/voitures/voitures2.html',
            parent: "admin_access",
            controller :'voituresController',
            resolve: {
                app: function ($q, $rootScope, $location,Authentication,ParametresService,notify) {
                    var defer = $q.defer();
                    var tab = JSON.parse(ParametresService.getParams());






                    if ( (Authentication.currentUser().role==false) && (tab[2]==false) )  {
                        notify("Vous n'ets pas authorizé d'accéder ici !");
                        deferred.reject();
                    }

                    defer.resolve();
                    return defer.promise;
                }
            }

        })

        //_-_-_-_-_-_-_--_-_-_-_-_-_-_-_-_-_
        .state('VoitureDetails', {
            url :'/VoitureDetails/:idVoiture',
            templateUrl: '/app_admin/partials/voitures/VoitureDetails.html',
            parent: "admin_access",
            controller :'voituresController'

        })

        //  =================================

        .state('voitures.add', {
            url :'/addCar',
            templateUrl: '/app_admin/partials/voitures/Creer_Voiture.html',
            parent: "voitures",
            controller :'voituresController'

        })

        //  =================================

        .state('voitures.add.add', {
            url :'/addCar',
            templateUrl: '/app_admin/partials/voitures/Creer_Voiture.html',
            parent: "voitures.add",
            controller :'voituresController',

        })
        //  =================================

        .state('voitures.add.add2', {
            url :'/addModele',
            templateUrl: '/app_admin/partials/voitures/Creer_Voiture.html',
            parent: "voitures",
            controller :'voituresController',

        })


        .state('Alertes', {
            url :'/Alertes',
            templateUrl: '/app_admin/partials/Alerte/Alertes.html',
            parent: "admin_access",
            controller :'AlertesCtrl',
            resolve: {
                app: function ($q, $rootScope, $location,Authentication,ParametresService,notify) {
                    var defer = $q.defer();
                    var tab = JSON.parse(ParametresService.getParams());


//2

                    if ( (Authentication.currentUser().role==false) && (tab[4]==false) ) {
                        notify("Vous n'ets pas authorizé d'accéder ici !");
                        deferred.reject();
                    }

                    defer.resolve();
                    return defer.promise;
                }
            }



        })

        //  =================================

        .state('entretients', {
            url :'/entretients',
            templateUrl: '/app_admin/partials/entretients/entretients2.html',
            parent: "admin_access",
            controller :'EntretientsCtrl',
           resolve: {
                app: function ($q, $rootScope, $location,Authentication,ParametresService,notify) {
                    var defer = $q.defer();
                    var tab = JSON.parse(ParametresService.getParams());


//2

                    if ( (Authentication.currentUser().role==false) && (tab[3]==false) ) {
                        notify("Vous n'ets pas authorizé d'accéder ici !");
                        deferred.reject();
                    }

                    defer.resolve();
                    return defer.promise;
                }
            }

        })


        //  =================================
        .state('contrats', {
            url :'/contrats',
            templateUrl: '/app_admin/partials/contrats/contrats2.html',
            parent: "admin_access",
            controller :'ContratsController',

        })

        .state('contrats.edit', {
            url :'/EditerContrat',
            templateUrl: '/app_admin/partials/contrats/EditerContrat.html',
            parent: "admin_access",
            controller :'ContratsController'

        })


        //  =================================
        .state('factures', {
            url :'/factures',
            templateUrl: '/app_admin/partials/factures/factures2.html',
            parent: "admin_access",
            controller :'FacturesController',

        })

        //  =================================

        .state('clients', {
            url :'/clients',
            templateUrl: '/app_admin/partials/clients/clients2.html',
            parent: "admin_access",
            controller :'clientsController as CLIENT',


            resolve: {
                app: function ($q, $rootScope, $location,Authentication,ParametresService,notify) {
                    var defer = $q.defer();
                    var tab = JSON.parse(ParametresService.getParams());

                    //5
                    if ( (Authentication.currentUser().role==false) && (tab[5]==false) )  {
                        notify("Vous n'ets pas authorizé d'accéder ici !");
                        deferred.reject();
                    }

                    defer.resolve();
                    return defer.promise;
                }
            }
        })

        //  =================================
        .state('clients.edit', {
            url :'/addClient',
            templateUrl: '/app_admin/partials/clients/Editer_Client.html',
            parent: "clients",
            controller :'clientsController',

        })



        .state('clients.mail', {
            url :'/sendMail',
            templateUrl: '/app_admin/partials/clients/Envoyer_Email_2.html',
            parent: "clients",
            controller :'clientsController as CLIENT'

        })

        //  =================================


        .state('conducteurs', {
            url :'/conducteurs',
            templateUrl: '/app_admin/partials/conducteurs/conducteurs2.html',
            parent: "admin_access",
            controller :'conducteursController',

        })



        //  =================================

        .state('conducteurs.add', {
            url :'/conducteursAdd',
            templateUrl: '/app_admin/partials/conducteurs/Creer_Conducteur.html',
            parent: "conducteurs",
            controller :'conducteursController',

        })


        //  =================================

        .state('CreateContrat',{
            url :'/Create_Contrat',
            templateUrl: '/app_admin/partials/contrats/Create_Contrat.html',
            params:{
                'Reservation' :new Object()

            }


        })

        .state('Create_Facture',{
            url :'/Creer_Facture',
            templateUrl: '/app_admin/partials/factures/Create_Facture.html',
            params:{
                'contrat' :new Object()

            },



        })




        //  =================================

        .state('statistiques', {
            url :'/statistiques',
            templateUrl: '/app_admin/partials/statistique/statistiques.html',
            parent: "admin_access",
            controller :'statistciCtrl'


        })












}//end of function authorization
//function run to check routing

function run($rootScope,$location,Authentication)
{
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {

        if ($location.path() === 'admin_access' && !Authentication.isloggedIn()) {
            $location.path('/');
        }
        if ($location.path() === '/auth/admin/admin/locations' && !Authentication.isloggedIn()) {
            $location.path('/');
        }
    });


}



//call the functions
App.config(['$stateProvider', '$urlRouterProvider',config]);
App .run(['$rootScope','$location','Authentication',run]);

