
var App = angular.module('adminApp',['ui.router','ngResource','ngMessages','ui.materialize','cgNotify','angularMoment','googlechart'
,'ui.calendar','ngStorage','permission','permission.ng','btford.socket-io','ngAudio','atomic-notify']);




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
            templateUrl: '/app_admin/Calendrier/calendrier.html',
            parent: "admin_access",



        })


        //  =================================
        .state('Profile', {
            url :'/Profile',
            templateUrl: '/app_admin/Managers/Profile.html',
            parent: "admin_access",

            resolve: {
                app: function ($q, $rootScope, $location,ParametresService,Authentication,notify) {
                    var defer = $q.defer();


                    if (!angular.equals(Authentication.currentUser().role,"SuperUser")) {
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
            templateUrl: '/app_admin/parametres/Paramétres.html',
            parent: "admin_access",
            resolve: {
                app: function ($q, $rootScope, $location,ParametresService,Authentication,notify) {
                    var defer = $q.defer();


                    if (!angular.equals(Authentication.currentUser().role,"SuperUser")) {
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
            templateUrl: '/app_admin/pages/Messages.html',
            parent: "admin_access",

        })

        //  =================================

        .state('locations', {
               url :'/locations',
            templateUrl: '/app_admin/locations/locations2.html',
            parent: "admin_access",

            resolve: {
                app: function ($q, $rootScope, $location,Authentication,ParametresService,notify) {
                    var defer = $q.defer();
 var tab = JSON.parse(ParametresService.getParams());


                    console.log('it not authorized ' +
                        ( angular.equals(Authentication.currentUser().role,"User") && (tab[0]==false)  ));



                    if ( ( angular.equals(Authentication.currentUser().role,"User") && (tab[0]==false)  )) {
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
            templateUrl: '/app_admin/locations/Creer_location.html',
            parent: "locations",

        })

        //  =================================

        .state('locations.details', {
            url :'/locationDetails',
            templateUrl: '/app_admin/locations/Details_location.html',
            parent: "locations",

        })

        //  =================================

        .state('Reservations', {
            url :'/reservations',
            templateUrl: '/app_admin/Réservations/Reservations.html',
            parent: "admin_access",

            resolve: {
                app: function ($q, $rootScope, $location,ParametresService,Authentication,notify) {
                    var defer = $q.defer();


                    if (!angular.equals(Authentication.currentUser().role,"SuperUser")) {
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

        .state('voitures', {
            url :'/voitures',
            templateUrl: '/app_admin/voitures/voitures2.html',
            parent: "admin_access",
            resolve: {
                app: function ($q, $rootScope, $location,Authentication,ParametresService,notify) {
                    var defer = $q.defer();
                    var tab = JSON.parse(ParametresService.getParams());






                    if ( ( angular.equals(Authentication.currentUser().role,"User") && (tab[1]==false)  )) {
                        notify("Vous n'ets pas authorizé d'accéder ici !");
                        deferred.reject();
                    }

                    defer.resolve();
                    return defer.promise;
                }
            }

        })

        //  =================================

        .state('voitures.add', {
            url :'/addCar',
            templateUrl: '/app_admin/voitures/Creer_Voiture.html',
            parent: "voitures",

        })

        //  =================================

        .state('voitures.add.add', {
            url :'/addCar',
            templateUrl: '/app_admin/voitures/Creer_Voiture.html',
            parent: "voitures.add",

        })
        //  =================================

        .state('voitures.add.add2', {
            url :'/addModele',
            templateUrl: '/app_admin/voitures/Creer_Voiture.html',
            parent: "voitures",

        })

        //  =================================

        .state('entretients', {
            url :'/entretients',
            templateUrl: '/app_admin/entretients/entretients2.html',
            parent: "admin_access",
            resolve: {
                app: function ($q, $rootScope, $location,Authentication,ParametresService,notify) {
                    var defer = $q.defer();
                    var tab = JSON.parse(ParametresService.getParams());




                    if ( ( angular.equals(Authentication.currentUser().role,"User") && (tab[2]==false)  )) {
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
            templateUrl: '/app_admin/contrats/contrats2.html',
            parent: "admin_access",


            resolve: {
                app: function ($q, $rootScope, $location,Authentication,ParametresService,notify) {
                    var defer = $q.defer();
                    var tab = JSON.parse(ParametresService.getParams());




                    if ( ( angular.equals(Authentication.currentUser().role,"User") && (tab[3]==false)  )) {
                        notify("Vous n'ets pas authorizé d'accéder ici !");
                        deferred.reject();
                    }

                    defer.resolve();
                    return defer.promise;
                }
            }





        })

        .state('contrats.edit', {
            url :'/EditerContrat',
            templateUrl: '/app_admin/contrats/EditerContrat.html',
            parent: "admin_access",

        })


        //  =================================
        .state('factures', {
            url :'/factures',
            templateUrl: '/app_admin/factures/factures2.html',
            parent: "admin_access",

            resolve: {
                app: function ($q, $rootScope, $location,Authentication,ParametresService,notify) {
                    var defer = $q.defer();
                    var tab = JSON.parse(ParametresService.getParams());




                    if ( ( angular.equals(Authentication.currentUser().role,"User") && (tab[4]==false)  )) {
                        notify("Vous n'ets pas authorizé d'accéder ici !");
                        deferred.reject();
                    }

                    defer.resolve();
                    return defer.promise;
                }
            }



        })

        //  =================================

        .state('clients', {
            url :'/clients',
            templateUrl: '/app_admin/clients/clients2.html',
            parent: "admin_access",

            resolve: {
                app: function ($q, $rootScope, $location,Authentication,ParametresService,notify) {
                    var defer = $q.defer();
                    var tab = JSON.parse(ParametresService.getParams());



                    console.log('it not authorized ' +
                        ( angular.equals(Authentication.currentUser().role,"User") && (tab[5]==false)  ));



                    if ( ( angular.equals(Authentication.currentUser().role,"User") && (tab[5]==false)  )) {
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
            templateUrl: '/app_admin/clients/Editer_Client.html',
            parent: "clients",

        })


        //  =================================
        .state('clients.details', {
            url :'/detailsClient',
            templateUrl: '/app_admin/clients/Details_Client.html',
            parent: "clients",

        })

        //  =================================
        .state('clients.details.edit', {
            url :'/addClient',
            templateUrl: '/app_admin/clients/Editer_Client.html',
            parent: "clients",

        })

        //  =================================
        .state('clients.edit.details', {
            url :'/addClient',
            templateUrl: '/app_admin/clients/Details_Client.html',
            parent: "clients",

        })
        //  =================================

        .state('clients.mail', {
            url :'/sendMail',
            templateUrl: '/app_admin/clients/Envoyer_Email_2.html',
            parent: "clients",

        })

        //  =================================


        .state('conducteurs', {
            url :'/conducteurs',
            templateUrl: '/app_admin/conducteurs/conducteurs2.html',
            parent: "admin_access",
            resolve: {
                app: function ($q, $rootScope, $location,Authentication,ParametresService,notify) {
                    var defer = $q.defer();

                    var tab = JSON.parse(ParametresService.getParams());


                    if ( ( angular.equals(Authentication.currentUser().role,"User") && (tab[6]==false)  )) {
                        notify("Vous n'ets pas authorizé d'accéder ici !");
                        deferred.reject();
                    }

                    defer.resolve();
                    return defer.promise;
                }
            }

        })

        //  =================================
        .state('conducteurs.mail', {
            url :'/conducteursMail',
            templateUrl: '/app_admin/conducteurs/Envoyer_email.html',
            parent: "conducteurs",

        })
        //  =================================

        .state('conducteurs.add', {
            url :'/conducteursAdd',
            templateUrl: '/app_admin/conducteurs/Creer_Conducteur.html',
            parent: "conducteurs",

        })


        //  =================================

        .state('CreateContrat',{
            url :'/Create_Contrat',
            templateUrl: '/app_admin/contrats/Create_Contrat.html',
            params:{
                'Reservation' :new Object()

            }


        })

        .state('Create_Facture',{
            url :'/Creer_Facture',
            templateUrl: '/app_admin/factures/Create_Facture.html',
            params:{
                'contrat' :new Object()

            },



        })




        //  =================================

        .state('statistiques', {
            url :'/statistiques',
            templateUrl: '/app_admin/statistique/statistiques.html',
            parent: "admin_access",


        })

        .state('Archive', {
            url :'/Archive',
            templateUrl: '/app_admin/Réservations/Archive.html',
            parent: "admin_access",


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


App.factory('AuthInterceptor',['$q','$location','$injector', function($q,$location){
    return function (promise) {
        var success = function (response) {
            return response;
        };

        var error = function (response) {
            if (response.status === 401) {
                $location.path('/');
            }

            return $q.reject(response);
        };

        return promise.then(success, error);
    };


}]);



//call the functions
App.config(['$stateProvider', '$urlRouterProvider',config]);
App .run(['$rootScope','$location','Authentication',run]);

App.run(function (PermissionStore) {
    PermissionStore
        .definePermission('statistiques', function () {
            return false;
        });
});

App.config(['$httpProvider', function($httpProvider){


    $httpProvider.interceptors.push('AuthInterceptor');

}]);



App.config(['atomicNotifyProvider', function(atomicNotifyProvider){
    atomicNotifyProvider.setDefaultDelay(5000);
    atomicNotifyProvider.useIconOnNotification(true);
}])





/*
-_-_-_-_-_-_-_-_-_--__-_-_-_-_-_-_-_-_-_-_-_-_-_--_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_--__-_-_-__--_-__-_-
---------------------DEFINE OUR SERVICES------------------------------------------------
 -_-_-_-_-_-_-_-_-_--__-_-_-_-_-_-_-_-_-_-_-_-_-_--_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_--__-_-_-__--_-__-_-

 */





























/*
 -_-_-_-_-_-__-_--_-__SERVICES POUR PERSISTER UNE RÉSERVATION POR UN CONTRAT-_-_-_-_-__-_-_--__--_-__-_-_-_-_-_-_-_-_
 */



App.service('Reservation_Contrat_Service',['$http', function($http){


    this.Reservation ={};

    this.saveReservation = function(reservation)
    {
        this.Reservation = reservation;

    }

    this.getReservation = function()
    {
        return this.Reservation;
    }

    this.removeReservation = function()
    {
        this.Reservation ={};
    }





}]);






App.factory('modeleFactory',['$http', function($http){

    var urlbase = "/auth/admin/admin/modele";
    var modeleFactory ={} ;




     modeleFactory.getModeles = function()
     {
          return $http.get(urlbase);

     }


    modeleFactory.postModele =function(modele)
    {
        return $http.post(urlbase,modele)

    }

    return modeleFactory ;


}]);











    /*
     _-_-_-_-_-_-_-_-_-_-_-SERVICE FOR MAINTENANCE OPERATIONS-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
     */


























/*
_-_-_--_-_-_-_-_-_-_-_-__-_-_-_-_-_ADMIN CTRL-_-_-_-_-__-_-_--_-_-_
 */


App.controller('AdminCtrl', function($scope,PreReservationFactory,Authentication,$location,$state,Socket,notify,ngAudio
, atomicNotify){




    console.log('socket'+ JSON.stringify(Socket));


    $scope.audio = ngAudio.load("http://static1.grsites.com/archive/sounds/birds/birds007.wav");



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
        console.log('we ill got to the Profile')
        $state.go('Profile');
    }
  $scope.Parametre = function()
  {
      console.log('we ill got to the Paramétres')
      $state.go('Paramétres');

  }



})




