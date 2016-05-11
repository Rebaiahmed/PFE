var app = angular.module('meanApp',['ui.router','ui.materialize','angularMoment','cgNotify','ngAnimate','anim-in-out'
,'uiGmapgoogle-maps','ngAnimate','djds4rce.angular-socialshare']);

/*
define the config function
 */

/*
 the config for touing
 */

function config($stateProvider, $urlRouterProvider,$locationProvider) {



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
            templateUrl: '/app_client/tarifs/Tarifs.html',


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
            resolve: {
                app: function ($q, $rootScope, $location,Authentication) {
                    var defer = $q.defer();


                    console.log('User undefined !' + angular.isUndefined(Authentication.currentUser()));

                    if (angular.isUndefined(Authentication.currentUser())) {


                        $location.path('/');

                        deferred.reject();
                    }

                    defer.resolve();
                    return defer.promise;
                }
            }


        })


        .state('login', {
            url :'/login',
            templateUrl: '/app_client/auth/login/login.view.html',
            resolve: {
                app: function ($q, $rootScope, $location,Authentication) {
                    var defer = $q.defer();


                    //si le client est déja authentifié alors il ne peut pas acceder au login

                    if (!angular.isUndefined(Authentication.currentUser())) {


                        $location.path('/');

                        deferred.reject();
                    }

                    defer.resolve();
                    return defer.promise;
                }
            }






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
            templateUrl: '/app_client/contact/Contact.html',


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





/*
Socila Share
 */
app.run(function($FB){
    $FB.init('231684367202361');
});






app.config(function($locationProvider){
    $locationProvider.html5Mode(true).hashPrefix('!');
    /*$locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });*/
    $locationProvider.html5Mode(false);
});

app.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: "AIzaSyBYRaa7QZ30PCCo_BJ6OR_g8dpxkld9E7M", //Clé pour utiliser l'API
        v: '3.17', //Par défaut la version la plus récente disponible
        libraries: 'geometry,visualization' //Librairies supplémentaires
    });
}]) ;