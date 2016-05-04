var app = angular.module('meanApp',['ui.router','ui.materialize','angularMoment','cgNotify','ngAnimate','anim-in-out'
,'uiGmapgoogle-maps']);

/*
define the config function
 */

/*
 the config for touing
 */

function config($stateProvider, $urlRouterProvider) {



    $urlRouterProvider.otherwise('/');

    $stateProvider

        //  ========================================


        //  =================================

        .state('index', {
            url: '/',
            templateUrl: '/app_client/home/home.html',

        })


        .state('Tarifs', {
            url: '/Tarifs',
            templateUrl: '/app_client/partials/Tarifs.html',


        })

        .state('Reservation', {
            url: '/Reservation',
            templateUrl: '/app_client/partials/Réservation.html',

        })



        .state('login_Profile', {
            url :'/login_Profile',
            templateUrl: '/app_client/profile/profile.view.html',


        })

        .state('Profile', {
            url :'/Profile',
            templateUrl: '/app_client/profile/profile.view.html',


        })


        .state('login', {
            url :'/login',
            templateUrl: '/app_client/auth/login/login.view.html',



        })

        .state('Register', {
            url :'/Register',
            templateUrl: '/app_client/auth/register/register.view.html',



        })

        .state('Voitures', {
            url :'/Voitures',
            templateUrl: '/app_client/voitures/voitures.html',



        })

        .state('Confirm', {
            url :'/Confirmer_Reservation',
            templateUrl: '/app_client/confirm/confirm.html',


        })

        .state('Nous', {
            url :'/Conditions&Infos',
            templateUrl: '/app_client/partials/qui_sommes_nous.html',


        })

        .state('Contact', {
            url :'/Contact',
            templateUrl: '/app_client/partials/Contact.html',


        })

        .state('Options', {
            url :'/Options',
            templateUrl: '/app_client/voitures/Options.html',


        })











}
function run($rootScope,$location,Authentication)
{
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        console.log('logged or not logged ' + Authentication.isloggedIn());
        if ($location.path() === '/profile' && !Authentication.isloggedIn()) {
            $location.path('/');
        }
    });


}



app.config(['$stateProvider', '$urlRouterProvider',config]);
app.run(['$rootScope','$location','Authentication',run]);