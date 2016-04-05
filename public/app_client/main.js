var app = angular.module('meanApp',['ngRoute']);

/*
define the config function
 */

function config($routeProvider,$locationProvider)
{

    $routeProvider

        .when('/', {
            templateUrl: '/app_client/home/home.html',
            controller: 'registerCtrl',
            controllerAs: 'vm'
        })
    .when('/register', {
        templateUrl: '/app_client/auth/register/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
    })
    .when('/login', {
        templateUrl: '/app_client/auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
    })
    .when('/profile', {
        templateUrl: '/app_client/profile/profile.view.html',
        controller: 'profileCtrl',
        controllerAs: 'vm'
    })



    .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

}

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



app.config(['$routeProvider','$locationProvider',config]);
app.run(['$rootScope','$location','Authentication',run]);