var App = angular.module('App',['ngRoute','App.Controllers','App.Services','mwl.calendar','ui.bootstrap','ngAnimate','angularMoment',
    'mwl.calendar.docs,','pageslide-directive'
]);















    /*
     define the route function
     */

    function run($rootScope,$location,Authentication)
    {
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
            console.log('logged or not logged ' + Authentication.isloggedIn());
            if ($location.path() === '/profile' && !Authentication.isloggedIn()) {
                $location.path('/');
            }
        });


    }

    /*
     define the config function
     */

    function config($routeProvider,$locationProvider)
    {

        $routeProvider

            // route for the home page
            .when('/admin', {
                templateUrl : 'pages/locations.html',

            })

            .when('/voitures', {
                templateUrl : 'pages/voitures.html',
                controller  : 'voituresController'
            })
            .when('/voitures/:voitureId', {
                templateUrl : 'pages/partials/voiture-detail.html',
                controller  : 'voituresController'
            })

            .when('/AjouterVoiture',{
                templateUrl :'pages/partials/Ajouter_Voiture.html'
            })


            .when('/modifierEntretien',{
                templateUrl :'../../modal/ModifierEntretien.html'
            })

            .when('/clients', {
                templateUrl : 'pages/clients.html',
                controller  : 'clientsController'
            })

            .when('/conducteurs', {
                templateUrl : 'pages/conducteurs.html',
                controller  : 'conducteursController'
            })
            .when('/contrats', {
                templateUrl : 'pages/contrats.html',
                controller  : 'conducteursController'
            })

            .when('/factures', {
                templateUrl : 'pages/factures.html',
                controller  : 'conducteursController'
            })
            .otherwise({
                redirectTo: '/'
            });

        // use the HTML5 History API
        $locationProvider.html5Mode(true);

    }



/*
 the configuration !!!!!!
 */

    App.run(['$rootScope','$location','Authentication',run]);
    App.config(['$routeProvider','$locationProvider',config]);
    App.config(function($modalProvider){
        angular.extend($modalProvider.defaults, {
            html: true
        });
    })




