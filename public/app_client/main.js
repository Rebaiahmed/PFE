var app = angular.module('meanApp',['ui.router','ui.materialize','angularMoment']);

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
        .state('login', {
            url: '/login',
            templateUrl: '/app_client/auth/login/login.view.html',

        })

        .state('Profile', {
            url :'/Profile',
            templateUrl: '/app_client/profile/profile.view.html',


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
            url :'/Qui_Sommes_Nous',
            templateUrl: '/app_client/partials/qui_sommes_nous.html',


        })

        .state('Contact', {
            url :'/Qui_Sommes_Nous',
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