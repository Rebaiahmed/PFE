
var App = angular.module('adminApp',['ui.router','ngResource','ngMessages','ui.materialize','cgNotify','angularMoment','googlechart'
,'ui.calendar','ngStorage']);




/*
define our factory interceptor
 */



App.service('authInterceptor', function($q) {
    var service = this;

    service.responseError = function(response) {
        if (response.status == 401){
            window.location = "/login";
        }
        return $q.reject(response);
    };
})


















    App.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }])



















/*
directive
 */


App.directive('onReadFile', function ($parse) {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);

            element.on('change', function(onChangeEvent) {
                var reader = new FileReader();

                reader.onload = function(onLoadEvent) {
                    scope.$apply(function() {
                        fn(scope, {$fileContent:onLoadEvent.target.result});
                    });
                };

                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
});













/*
the config for the ROUTING
 */

function config($stateProvider, $urlRouterProvider) {



    $urlRouterProvider.otherwise('/');

    $stateProvider

        //  ========================================
        .state('admin', {
            url: '/',
            templateUrl: 'app_admin/auth/login/form_login.html',
            controller: 'loginCtrl',
        })

        //  =================================
        .state('admin_access', {
            url: '/auth/admin/admin',
            templateUrl: '/app_admin/Admin.html',

        })





        .state('Calendrier', {
            url :'/Profile',
            templateUrl: '/app_admin/pages/calendrier.html',
            parent: "admin_access"


        })


        //  =================================
        .state('Profile', {
            url :'/Profile',
            templateUrl: '/app_admin/pages/Profile.html',
            parent: "admin_access",

        })


        //  =================================
        .state('Paramétres', {
            url :'/Paramétres',
            templateUrl: '/app_admin/pages/Paramétres.html',
            parent: "admin_access"


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
            templateUrl: '/app_admin/pages/locations2.html',
            parent: "admin_access",

        })

        //  =================================

        .state('locations.add', {
            url :'/addReservation',
            templateUrl: '/app_admin/pages/Creer_location.html',
            parent: "locations",

        })

        //  =================================

        .state('locations.details', {
            url :'/locationDetails',
            templateUrl: '/app_admin/pages/Details_location.html',
            parent: "locations",

        })

        //  =================================

        .state('Reservations', {
            url :'/reservations',
            templateUrl: '/app_admin/pages/Reservations.html',
            parent: "admin_access",

        })

        //  =================================

        .state('voitures', {
            url :'/voitures',
            templateUrl: '/app_admin/pages/voitures2.html',
            parent: "admin_access",

        })

        //  =================================

        .state('voitures.add', {
            url :'/addCar',
            templateUrl: '/app_admin/pages/Creer_Voiture.html',
            parent: "voitures",

        })

        //  =================================

        .state('voitures.add.add', {
            url :'/addCar',
            templateUrl: '/app_admin/pages/Creer_Voiture.html',
            parent: "voitures.add",

        })
        //  =================================

        .state('voitures.add.add2', {
            url :'/addModele',
            templateUrl: '/app_admin/pages/Creer_Modele.html',
            parent: "voitures",

        })

        //  =================================

        .state('entretients', {
            url :'/entretients',
            templateUrl: '/app_admin/pages/entretients2.html',
            parent: "admin_access",

        })


        //  =================================
        .state('contrats', {
            url :'/contrats',
            templateUrl: '/app_admin/pages/contrats2.html',
            parent: "admin_access",

        })


        //  =================================
        .state('factures', {
            url :'/factures',
            templateUrl: '/app_admin/pages/factures2.html',
            parent: "admin_access",

        })

        //  =================================

        .state('clients', {
            url :'/clients',
            templateUrl: '/app_admin/pages/clients2.html',
            parent: "admin_access",

        })

        //  =================================
        .state('clients.edit', {
            url :'/addClient',
            templateUrl: '/app_admin/pages/Editer_Client.html',
            parent: "clients",

        })


        //  =================================
        .state('clients.details', {
            url :'/detailsClient',
            templateUrl: '/app_admin/pages/Details_Client.html',
            parent: "clients",

        })

        //  =================================
        .state('clients.details.edit', {
            url :'/addClient',
            templateUrl: '/app_admin/pages/Editer_Client.html',
            parent: "clients",

        })

        //  =================================
        .state('clients.edit.details', {
            url :'/addClient',
            templateUrl: '/app_admin/pages/Details_Client.html',
            parent: "clients",

        })
        //  =================================

        .state('clients.mail', {
            url :'/sendMail',
            templateUrl: '/app_admin/pages/Envoyer_Email_2.html',
            parent: "clients",

        })

        //  =================================


        .state('conducteurs', {
            url :'/conducteurs',
            templateUrl: '/app_admin/pages/conducteurs2.html',
            parent: "admin_access",

        })

        //  =================================
        .state('conducteurs.mail', {
            url :'/conducteursMail',
            templateUrl: '/app_admin/pages/Envoyer_email.html',
            parent: "conducteurs",

        })
        //  =================================

        .state('conducteurs.add', {
            url :'/conducteursAdd',
            templateUrl: '/app_admin/pages/Creer_Conducteur.html',
            parent: "conducteurs",

        })


        //  =================================

        .state('CreateContrat',{
            url :'/Create_Contrat',
            templateUrl: '/app_admin/pages/Create_Contrat.html',
            params:{
                'Reservation' :new Object()

            }


        })

        .state('Create_Facture',{
            url :'/Creer_Facture',
            templateUrl: '/app_admin/pages/Create_Facture.html',
            params:{
                'contrat' :null

            }


        })




        //  =================================

        .state('statistiques', {
            url :'/statistiques',
            templateUrl: '/app_admin/pages/statistiques.html',
            parent: "admin_access",

        })



}



//function run to check routing

function run($rootScope,$location,Authentication)
{
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        console.log('logged or not logged ' + Authentication.isloggedIn());
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


App.config(['$httpProvider', function($httpProvider){


    $httpProvider.interceptors.push('AuthInterceptor');

}]);



/*
_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FACTORU FOR -_-_-_-__-_-_-_-_-_-_-_-_-_
_--__-_-_-_-_-_-___-__-__________________________--------------
 */


















/*
-_-_-_-_-_-_-_-_-_--__-_-_-_-_-_-_-_-_-_-_-_-_-_--_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_--__-_-_-__--_-__-_-
---------------------DEFINE OUR SERVICES------------------------------------------------
 -_-_-_-_-_-_-_-_-_--__-_-_-_-_-_-_-_-_-_-_-_-_-_--_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_--__-_-_-__--_-__-_-

 */




App.service('Parametres', function($q) {

    /*
    initializer les variables
     */

    //les locations

    /*
    les attributs
     */
    this.locationAdd = true;
    this.locationUpdate = true;
    this.locationDelete = true;
    /*
    les méthodes
     */

    this.SetlocationAdd = function(locationAdd )
    {
        this.locationAdd=locationAdd;

    }

    this.GetlocationAdd = function(locationAdd )
    {
        return this.locationAdd;

    }





    //les voitures
    this.voitureAdd = true;
    this.voitureUpdate = true;
    this.voitureDelete = true;

    //les entretients
    this.entretientAdd = true;
    this.entretientUpdate = true;
    this.entretientDelete = true;

    //les clients
    this.clientAdd = true;
    this.clientUpdate = true;
    this.clientDelete = true;

    //les conducteurs
    this.conducteurAdd = true;
    this.conducteurUpdate = true;
    this.conducteureDelete = true;

})




/*
_-_-_-_-_-_-_-_-_-_-_-SERVICE FOR AUTHENTICATION-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */

App.service('Authentication',['$http','$window', function($http,$window){


        /*
         define the function
         */
        var saveToken = function(token){
            $window.localStorage['admin-token']=token;
        }

        var getToken = function()
        {
            return  $window.localStorage['admin-token'];

        }

        var logout = function()
        {
            $window.localStorage.removeItem('admin-token');

        }
        var isloggedIn = function()
        {
            // get teh token and check it
            var token = getToken();

            var payload ; // the data is stored here

            if(token)
            {
                console.log('token exist ' + token);
                payload = token.split('.')[1];
                payload =$window.atob(payload);
                payload = JSON.parse(payload);

                console.log('exp :' +payload.exp  );

                console.log('resul is ' + (payload.exp > Date.now() / 1000));
                return payload.exp > Date.now() / 1000;
            }
            else{
                return false;
            }

        }


        var currentUser = function()
        {
            // we must chekf it


            if(isloggedIn())
            {

                var token = getToken();
                var payload = token.split('.')[1] // !!!!!!
                payload =$window.atob(payload);
                payload = JSON.parse(payload);
                console.log('currentUser the payload is :' + JSON.stringify(payload));

                // we will return an objectangular-permission
                return{
                    email : payload.email,
                    nom : payload.nom
                }
            }


        }






        // the login method

        var login = function(user)
        {
            return $http.post('/auth/admin/admin', user)
                .success(function(data){
                    saveToken(data.token);
                })
                .error(function(){
                    console.log('error in login !')
                })

        }


        // get data for user
        /*var getProfile = function () {
            return $http.get('/auth/profile', {
                headers: {
                    Authorization: 'Bearer '+ getToken()
                }//end of headers
            }); // end of return


        }; // end of function*/




        return {
            saveToken: saveToken,
            getToken : getToken,
            logout :logout,
            isloggedIn :isloggedIn,
            currentUser :currentUser,
            //register :register,
            login :login,
            //getProfile :getProfile



        }


    }//end of function of service



    ])//end of service





















/*
_-_-_-_-_-__-__-_-_-_-_--_-__-_-_-_-_service pour les locations et les clanedriers-__-_-_-_-_-_

 */

App.service('CalendrierService',['$http','$localStorage','$window','$sessionStorage' ,function($http,$localStorage,$window
,$sessionStorage){


    this.Save = function () {

        $http.get('/auth/admin/admin/locations')
            .then(function(result){

                $localStorage.LOCATIONS= result.data;

            })

    }



    this.Get = function () {
        return  $localStorage.LOCATIONS ;
    }


}])




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


/*
-_-_-_-_-_-__-_--_-__SERVICES POUR LES MANAGERS-_-_-_-_-__-_-_--__--_-__-_-_-_-_-_-_-_-_
 */





App.factory('ManagerFactory',['$http', function($http){

    var urlbase = "/auth/admin/admin/Managers";

    var ManagerFactory ={} ;



    ManagerFactory.getManagers = function()
    {
        return $http.get(urlbase)
    }

    ManagerFactory.updateManager = function(id,Manager)
    {
        return $http.put(urlbase+'/'+id,Manager);

    }

    ManagerFactory.addManager = function(manager)
    {
        return $http.post(urlbase,manager);
    }

    ManagerFactory.deleteManager = function(id)
    {
        console.log('th id ' + id)
        return $http.delete(urlbase + '/' +id)
    }

    return ManagerFactory






}]);




/*
 _-_-_-_-_-_-_-_-_-_-_-SERVICE FOR PRERESERVATIONS-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */



App.factory('PreReservationFactory',['$http', function($http){

    var urlbase = "/auth/admin/admin/PreReservations";
    var url2 = "/auth/admin/admin/Prelocations";
    var PreReservationFactory ={} ;




    PreReservationFactory.getPreReservations = function()
    {
        return $http.get(urlbase);

    }


    PreReservationFactory.deletePrereservation = function(id)
    {
        return $http.delete(urlbase + '/' + id);
    }

    PreReservationFactory.saveReservation = function(data)
    {
        return $http.post(url2, data);
    }



    return PreReservationFactory ;


}]);



/*
 _-_-_-_-_-_-_-_-_-_-_-SERVICE FOR RESERVATIONS-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */


App.factory('locationsFactory',['$resource', function($resource){

    return $resource('/auth/admin/admin/locations/:idReservation'
     ,{idReservation: '@idReservation'},{
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
    );

}]);





/*
 _-_-_-_-_-_-_-_-_-_-_-SERVICE FOR CARS-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */



App.factory('VoitureFactory',['$http', function($http){

    var urlbase = "/auth/admin/admin/voitures";
    var carsFactory ={} ;


    carsFactory.getCars= function()
    {
        return $http.get(urlbase);
    }



    carsFactory.getCar= function(id)
    {
        return $http.get(urlbase+'/' + id);
    }


    carsFactory.postCar = function(car)
    {
        return $http.post(urlbase,car);
    }

    carsFactory.updateCar = function(id,car)
    {
        console.log('the car is' + JSON.stringify(id));
        return $http.put(urlbase+'/' + id,car)//a vérfier !!
    }
    carsFactory.deleteCar = function(id)
    {
        return $http.delete(urlbase +'/' + id);
    }


    return carsFactory ;


}]);




/*
 _-_-_-_-_-_-_-_-_-_-_-SERVICE FOR models-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */



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



App.factory('EntretientFactory',['$http', function($http){

    var urlbase = "/auth/admin/admin/entretients";
    var entretientFactory ={} ;


    entretientFactory.getEntretients = function()
    {
        return $http.get(urlbase);
    }



    entretientFactory.getEntretient= function(id)
    {
        return $http.get(urlbase+'/' + id);
    }


    entretientFactory.postEntretient = function(entretient)
    {
        return $http.post(urlbase,entretient);
    }

    entretientFactory.updateEntretient = function(id,entretient)
    {
        return $http.put(urlbase+'/' + id,entretient)//a vérfier !!
    }
    entretientFactory.deleteEntretient = function(id)
    {
        return $http.delete(urlbase +'/' + id);
    }


    return entretientFactory ;

}]);






/*
 _-_-_-_-_-_-_-_-_-_-_-SERVICE FOR MAINTENANCE OPERATIONS-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */




App.factory('EntretientCarFactory',['$http', function($http){

    var urlbase = "/auth/admin/admin/entretientCar";
    var entretientCar ={} ;


    entretientCar.getEntretients = function(id)
    {
        return $http.get(urlbase + '/' + id);
    }



    return entretientCar ;

}]);





/*
 _-_-_-_-_-_-_-_-_-_-_-SERVICE FOR CLIENTS -_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */



App.factory('ClientsFactory',['$http', function($http){
    var urlbase = "/auth/admin/admin/clients";
    var clientFactory ={} ;


    clientFactory.getClients = function()
    {
        return $http.get(urlbase);
    }



    clientFactory.getClient = function(id)
    {
        return $http.get(urlbase+'/' + id);
    }


    clientFactory.postClient = function(client)
    {
        return $http.post(urlbase,client,password);
    }

    clientFactory.updateClient = function(id,client)
    {
        return $http.put(urlbase+'/' + id,client)//a vérfier !!
    }

    clientFactory.deleteClient = function(id)
    {
        return $http.delete(urlbase +'/' + id);
    }


return clientFactory;

}]);






/*
 _-_-_-_-_-_-_-_-_-_-_-SERVICE FOR DRIVERS-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */








App.factory('ConducteursFactory',['$http', function($http){


    var urlbase = "/auth/admin/admin/conducteurs";
    var conducteurFactory ={} ;


    conducteurFactory.getDrivers = function()
    {
        return $http.get(urlbase);
    }



    conducteurFactory.getDriver= function(id)
    {
        return $http.get(urlbase+'/' + id);
    }


    conducteurFactory.postDriver = function(driver)
    {
        return $http.post(urlbase,driver);
    }

    conducteurFactory.updateDriver = function(id,driver)
    {
        return $http.put(urlbase+'/' + id,driver)//a vérfier !!
    }
    conducteurFactory.deleteDriver = function(id)
    {
        return $http.delete(urlbase +'/' + id);
    }


    return conducteurFactory ;

}]);










/*
 _-_-_-_-_-_-_-_-_-_-_-SERVICE FOR contrats-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */




App.factory('ContratService', ['$http', function($http){

ContratService = {};

    ContratService.createContrat = function(contrat)
    {
        return $http.post('/auth/admin/admin/contrats' , contrat);

    }


    ContratService.getContrats = function()
    {
        return $http.get('/auth/admin/admin/contrats');
    }

    ContratService.getContrat = function(id)
    {
        return $http.get('/auth/admin/admin/contrats/'+ id);
    }


    ContratService.updateContrat = function(id,contrat)
    {
        return $http.put('/auth/admin/admin/contrats/'+ id,contrat);
    }

    return ContratService ;
}])





    /*
     _-_-_-_-_-_-_-_-_-_-_-SERVICE FOR MAINTENANCE OPERATIONS-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
     */
















/*
 _-_-_-_-_-_-_-_-_-_-_-SERVICE FOR BILLS-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */




App.factory('factureFactory',['$http', function($http){

    var urlbase = "/auth/admin/admin/Factures";
    var factureFactory ={} ;


    factureFactory.getFactures= function()
    {
        return $http.get(urlbase);
    }




   /* factureFactory.postFacture = function(car)
    {
        return $http.post(urlbase,car);
    }*/

    factureFactory.updateFacture = function(car)
    {
        return $http.put(urlbase+'/' + car.id,car)//a vérfier !!
    }


    return factureFactory ;

}]);












/*
-_-_-_-_-_-__-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-__--_-__-_-
------------DEFINE OUR CONTROLLERS-_-_-_-_-_--_-_-_-_-_-_-__-_-_-
--_-_-_-__-_----------__-_-_-_-_-_-_-_-__-_--_-__-_-_-_-_-_-_-__-_-_-


 */





/*
_-_-_--_-_-_-_-_-_-_-_-__-_-_-_-_-_ADMIN CTRL-_-_-_-_-__-_-_--_-_-_
 */


App.controller('AdminCtrl', function($scope,PreReservationFactory,Authentication,$location,$state){



    console.log(JSON.stringify(Authentication.currentUser()));


    $scope.user = Authentication.isloggedIn();


    //inclure le variable $state dans uiRouterStatepour utiliser dans le routing pour pouvoir afficher le calendar
    $scope.uiRouterState = $state;







    $scope.logOut = function()
    {
        alert('we will dsiconenct');
        console.log('token before deleted :' + JSON.stringify(Authentication.getToken()));
        Authentication.logout();

        console.log('not token found' + JSON.stringify(Authentication.getToken()));
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


/*
 _-_-_-_-_-_-_-_-_-_-_-LOGIN CTRL-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */



App.controller('loginCtrl', function($scope,$location,Authentication){

// get the controller with this

        // initialize the
    $scope.credentials={

            email :"",
            password :""
        }

        // define teh functions

    $scope.onSubmit = function()
        {
            Authentication.login( $scope.credentials)
                .error(function(err){
                    alert(err);
                })
                .then(function(result){

                    console.log('' + JSON.stringify(result));
                    $location.path('/auth/admin/admin'); // redirect him to the profile page
                })


        }


    })





/*
 _-_-_-_-_-_-_-_-_-_-_-CAR CTRL-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */


App.controller('voituresController', function($scope,VoitureFactory,modeleFactory,$state) {

    $scope.cars=[];
    $scope.car ={};
    $scope.newCar = {};

    $scope.show = false ;

    $scope.newModele = {};
    $scope.newModele.prixGPS = 25;
    $scope.newModele.prixChaisse =25;
    $scope.newModele.prixChauffeur = 25;
    $scope.models = [];
    $scope.chiffreAffaire =[];





    $scope.change = function()
    {
        console.log('change is' + $scope.show);
        $scope.show = ! $scope.show;
        console.log('change will be' + $scope.show);
    }




        modeleFactory.getModeles()
            .success(function(data){
                $scope.models = data;

            })







    function getCars()
    {
        VoitureFactory.getCars()
            .then(function(data){
               console.log(JSON.stringify((data.data[1])));
                $scope.cars=data.data[0] ;
                $scope.chiffreAffaire=data.data[1];



            }, function(err){
                $scope.message ="enable to load data !" + err;
            })
    }






    getCars(); // load the cars





    /*
     _-_-_-_-_-_-_-_-_-_-_-__--_-_
     */

    $scope.updateCar = function(id,car)
    {

        //update the car

        VoitureFactory.updateCar(id,car)
            .then(function(data){
                console.log('we will update this data')


            }, function(err){
                console.log('err in updating data !');
            })



    }


    /*
     _-_-_-_-_-_-_-_-_-_-_-__--_-_
     */


    $scope.addCar = function()
    {





        if($scope.newCar.idVoiture!=null)
        {
            console.log('we will update this car !' + $scope.newCar.idVoiture );
            alert('cafr will be updated!');
            console.log(JSON.stringify($scope.newCar));
           $scope.updateCar($scope.newCar.idVoiture,$scope.newCar);
              getCars();
            $state.go('voitures');
        }
        else {


            console.log('our new car is ' + JSON.stringify($scope.newCar));
            console.log('the')

            VoitureFactory.postCar($scope.newCar)
                .then(function (response) {
                    $scope.status = "200 ok !";

                    getCars();
                    $state.go('voitures');


                }, function (err) {
                    console.log('err !' + err);
                })

        }
    }


    /*
     _-_-_-_-_-_-_-_-_-_-_-add MODELE-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
     */



    $scope.addModele = function()
    {

        console.log('we will add this modele' + JSON.stringify($scope.newModele) );

        modeleFactory.postModele($scope.newModele)
            .then(function(response){

                console.log('addes modle success !');

                $scope.newModele ={};

                $state.go('voitures');


            },function(err){
                console.log('err !' +err);
            })

    }


    /*
     _-_-_-_-_-_-_-_-_-_-_-__--_-_
     */


    $scope.deleteCar = function(id)
    {

        console.log('we will delete this car !');
        alert('we will delete thsi car !');
        VoitureFactory.deleteCar(id)
            .then(function(){
                $scope.status ="deleted client!";
                // we msut refresh the list
                getCars();



            },function(err){
                console.log('err !' +err);
            })
    }

    /*
     _-_-_-_-_-_-_-_-_-_-_-__--_-_
     */


    $scope.editCar = function(id)
    {
        VoitureFactory.getCar(id)
            .then(function(data){

                console.log(JSON.stringify(data.data[1]));

               $scope.car = data.data[0];


                //trasnfrom the date

                  $scope.car.date_assurance = new Date($scope.car.date_assurance );
                  $scope.car.date_vignette = new Date($scope.car.date_vignette);
                $scope.car.date_visite_tecknique = new Date($scope.car.date_visite_tecknique);


                $scope.newCar = $scope.car;




            },function(err){
                console.log('err !' +err);
            })

        $state.go('.add');
    }



    $scope.Reservation_En_Cours = function(car)
    {
        for(var i=0;i<car.Reservations.length;i++)
        {

        }
    }

})






/*
 _-_-_-_-_-_-_-_-_-_-_-ENTRETIENSTS CTRL-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */


App.controller('EntretientsCtrl', function($scope,EntretientFactory, VoitureFactory,$state,notify){



    $scope.cars = [];
    $scope.newEntretient = {};
    $scope.show = false ;

    $scope.shwoUpdate = false ;



    function getCars()
    {
        VoitureFactory.getCars()
            .then(function(data){


                $scope.cars=data.data[0] ;
                for (var i = 0; i < $scope.cars.length; i++) {
                    $scope.cars[i].date_assurance = new Date($scope.cars[i].date_assurance);
                    $scope.cars[i].date_visite_tecknique = new Date($scope.cars[i].date_visite_tecknique);
                    $scope.cars[i].date_vignette = new Date($scope.cars[i].date_vignette);


                }



            }, function(err){
                $scope.message ="enable to load data !" + err;
            })
    }


               getCars();







    $scope.update = function(idEntretient,entretient)
    {


        EntretientFactory.updateEntretient(idEntretient,entretient)
            .then(function(result)
            {
                console.log('updated suuccesfuly !');
                $scope.shwoUpdate=true;
                getCars();

            }, function(err){
                console.log('enable to update data !' + err);
            })
    }

/*
delee entretient
 */

    $scope.delete = function(idEntretient,entretient)
    {
        console.log(JSON.stringify(entretient));

        EntretientFactory.deleteEntretient(idEntretient)
            .then(function(result)
            {
                console.log('deleted succesfuly !');
                getCars();

            }, function(err){
                console.log('enable to delete data !' + err);
            })
    }


    /*

     */



    $scope.addEntretient = function(idVoiture)
    {
       $scope.newEntretient.Voiture_idVoiture = idVoiture;
        //save it !

        $scope.show=false;
        EntretientFactory.postEntretient($scope.newEntretient)
            .then(function(res){

                $state.show=false;



            }, function(err){
                console.log('err !'+err);
            })

        $scope.newEntretient={};
        getCars();


    }

    /*

     */


    $scope.voirNotifcations = function(c)
    {

        //faire notification avant 1 jour
        var msgAssurance = "Vous avez demain Assurance du voiture";
        var msgVisitetecknique = "Vous avez demain visite tecknique";
            var msgVignette = "Vous avez demain visitte Pour la vignette";
        var msgBougie = "";

var test = new Date()

        console.log(typeof c.date_assurance );
        console.log(c.date_assurance.getDate()-1);

        console.log(test.getDate())
        if(c.date_assurance.getDate()-1===test.getDate())
        {
            notify(msgAssurance);

        }

        if(c.date_visite_tecknique.getDay()-1===test.getDay())
        {
            notify(msgVisitetecknique);

        }

        if(c.date_vignette.getDay()-1===test.getDay())
        {
            notify(msgVignette);

        }

        notify("Vous n'avez pour le moment aucun notifcation");

        /*notify(msgAssurance);
        notify(msgAssurance);*/

        //il reste notfication pour le kilometrage

    }




    $scope.save = function(car)
    {
        //update the car

        VoitureFactory.updateCar(car.idVoiture,car)
            .then(function(data){
                console.log('we will update this data')


            }, function(err){
                console.log('err in updating data !');
            })

    }

})



/*
 _-_-_-_-_-_-_-_-_-_-_-CAR CTRL-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */


App.controller('PreReservationCtrl', function($scope,$state,PreReservationFactory, locationsFactory){


    //méthode pour récuprer toutes les Preservations
    $scope.prereservations =[];

    $scope.prereservation ={};
    $scope.nbr = 0;

    $scope.getPreReservations = function()
    {
        PreReservationFactory.getPreReservations()
            .then(function(result){
                console.log(result.data.length);
                $scope.nbr = result.data.length ;

                $scope.prereservations = result.data;

            }, function(err){
                console.log('err' + err);
            })
    }


    $scope.getPreReservations();


    $scope.delete = function(id)
    {
        PreReservationFactory.deletePrereservation(id)
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

  PreReservationFactory.saveReservation($scope.prereservation)
      .then(function(status){
          console.log('saved sucuesfuly !' + status);


          $scope.delete($scope.prereservation.idReservation);
          $scope.getPreReservations();
          $state.go('locations');
      }, function(err){
          console.log('err :' + err);
      })


    }


});




/*
 _-_-_-_-_-_-_-_-_-_-_-CAR CTRL-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */


App.controller('clientsController', function($scope,ClientsFactory,$state,locationsFactory){



    $scope.clients=[];
    $scope.client ={};

    $scope.predicate = 'numCin';
    $scope.reverse = true;
    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    };



    function getClients()
    {
        ClientsFactory.getClients()
            .then(function(data){
                $scope.clients =data.data ;

            }, function(err){
                $scope.message ="enable to load data !" + err;
            })
    }


    getClients(); // load the clients

    /*

     */


    $scope.updateClient = function()
    {

        //update the client
        console.log('we will update this client ' + JSON.stringify($scope.client));

        ClientsFactory.updateClient($scope.client.idClient,$scope.client)
            .then(function(data){
                $scope.status ="200 ok !";
                console.log($scope.status);

            }, function(err){
                console.log('err in updating data !');
            })

        getClients();
        $state.go('clients');



    }



    /*

     */
       $scope.deleteClient = function(id)
       {

  console.log(id);

           ClientsFactory.deleteClient(id)
               .then(function(){
                   $scope.status ="deleted client!";
                   console.log($scope.status);
                   // we msut refresh the list
                   getClients();



               },function(err){
                   console.log('err !' +err);
               })
       }

    /*

     */


          $scope.editClient = function(id)
          {

              // serahc the client
              for(var i=0;i<$scope.clients.length;i++)
              {
                  if($scope.clients[i].idClient==id)
                  {
                      $scope.client = $scope.clients[i];
                      $scope.client.datePermis = new Date( $scope.client.datePermis);



                      break;
                  }
              }

              $state.go('.edit')

          }

    /*


     */

    $scope.detailsClient =function(id)
    {
        // serahc the client
        for(var i=0;i<$scope.clients.length;i++)
        {
            if($scope.clients[i].idClient==id)
            {
                $scope.client = $scope.clients[i];
                $scope.client.datePermis = new Date( $scope.client.datePermis);

                break;
            }
        }

        console.log(JSON.stringify($scope.client));

        $state.go('.details')

    }











    /*

     */




  $scope.Reservation_En_Cours = function(client)
  {
      var result = {};
      for(var i=0;i<client.Reservations.length;i++)
      {

          console.log("date fin " +  JSON.stringify(client.Reservations[i].dateFin));
          console.log("date now " +  JSON.stringify(new Date()));
          console.log("result :" + (new Date(client.Reservations[i].dateFin)>new Date()) );

          if(   (new Date(client.Reservations[i].dateFin)>new Date()) )
          {

              result = client.Reservations[i] ;
              console.log(result);
              break ;
          }
          else{
              console.log('not found !');
          }

      }

      if(result=={})
      {
          return "nothing"
      }

      return result;


  }






})


/*
 _-_-_-_-_-_-_-_-_-_-_-CAR CTRL-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */


App.controller('locationsController', function($scope,$http,locationsFactory,ClientsFactory,
                                               VoitureFactory,$state,$location
,Reservation_Contrat_Service,Parametres){



    console.log('paramtres :' + JSON.stringify(Parametres.GetlocationAdd()))




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

            console.log('table chiffre affire' + JSON.stringify(locations[1]));
            $scope.Table_Prix_Totale = locations[1] ;
            console.log('value 0 :' +  $scope.Table_Prix_Totale[0] );

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


            console.log('before trasnforming' +
                typeof $scope.newReservation.dateDebut );
            $scope.newReservation.dateDebut = new Date($scope.newReservation.dateDebut);
            $scope.newReservation.dateFin = new Date($scope.newReservation.dateFin);


            console.log('we transform the date from a string to date' +
            typeof $scope.newReservation.dateDebut );


          $scope.newReservation.$update(function(){
              console.log('data updated succesfuly !');
              //initialize les valuers
              $scope.newReservation ={};
          });

            init();
            $state.go('locations');

        }
        else {




            console.log( typeof $scope.newReservation.dateDebut)

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













/*
 _-_-_-_-_-_-_-_-_-_-_-CAR CTRL-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */



App.controller('FacturesController', function($scope,factureFactory){

    $scope.factures = [];
    $scope.facture ={} ;


      getFactures = function()
      {
          factureFactory.getFactures()
              .then(function(data){
                  $scope.factures =data.data ;

              }, function(err){
                  $scope.message ="enable to load data !" + err;
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
                   console.log('err in updating data !');
               })

       }




})



/*
 _-_-_-_-_-_-_-_-_-_-_-CAR CTRL-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */






/*
 _-_-_-_-_-_-_-_-_-_-_-Contrat Create CTRL-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */



App.controller('CreateContratsController', ['$scope','$http','$filter','$stateParams','$state','ContratService','moment','Reservation_Contrat_Service' ,function($scope,$http,
                                                                                                                                                           $filter,$stateParams,$state,
                                                                                                                                                           ContratService,
                                                                                                                                                           moment,Reservation_Contrat_Service){


// c une variable pour affciher un message de succes d'authentfication
    $scope.success = false ;





    $scope.Reservation ={}


    $scope.Reservation  =Reservation_Contrat_Service.getReservation();
    console.log(JSON.stringify($scope.Reservation ));



    $scope.newContrat ={};
    $scope.contrats = [];
    $scope.contrat ={};








    if($scope.Reservation !=null) {
        //appliquer filter pour chnager la date
        $scope.$watch('Reservation.Client.datePermis ', function () {

            $scope.Reservation.Client.datePermis = $filter('date')($scope.Reservation.Client.datePermis, 'dd-MM-yyyy');
            $scope.Reservation.dateDebut = $filter('date')($scope.Reservation.dateDebut, 'dd-MM-yyyy');
            $scope.Reservation.dateFin = $filter('date')($scope.Reservation.dateFin, 'dd-MM-yyyy');

        });

    }//end if








    $scope.Nbr_Jours=parseInt(
        moment.duration(
            moment( $scope.Reservation.dateFin).diff(
                moment( $scope.Reservation.dateDebut)
            )
        ).asDays()
    );

    console.log('ddd ' + $scope.Nbr_Jours);










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
                console.log('addes succesfuly !');
                $scope.success=true;
                $state.go('contrats');

            })
            .error(function(err){
                console.log('err' + err);

            })



    }










}]);








/*
_-_--__-_--__-_-_-_CONTRAT GET ALL_-_-_-_-_-_-_-_-_-_-_-_-__-_--_-__-_-_-
 */



App.controller('ContratsController', ['$scope','$http','$filter','$stateParams','$state','ContratService','moment' ,function($scope,$http,
                                                                                                                    $filter,$stateParams,$state,
                                                                                                          ContratService,
moment){


    $scope.contrats = [];
    $scope.contrat ={};
    $scope.detailsshow = false;

    $scope.edit = false ;






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


    $scope.editerContrat = function(ctrl)
    {
        alert('we will update this contrat !');
        $scope.edit=true;
        $scope.contrat = ctrl;

    }



    $scope.update = function(contrat)
    {

        ContratService.updateContrat(contrat.idContrat,contrat)
            .then(function(result)
            {
                console.log('updated succesfuly ' + result);
            },function(err){
                console.log('err in updateing ' + err);
            })
    }







    //Create_Facture

    $scope.go_Facture = function(idContrat)
    {
        ContratService.getContrat(idContrat)
            .success(function(result){
                console.log('the result is ' + JSON.stringify(result));
                $scope.contrat = result;
            })

        $state.go('Create_Facture',{'contrat':$scope.contrat});

    }







}]);







/*
 _-_-_-_-_-_-_-_-_-_-_-CAR CTRL-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */





App.controller('conducteursController', function($scope,ConducteursFactory,$state){
    $scope.drivers=[];
    $scope.driver ={};
    $scope.newDriver = {};

    console.log($state);



    function getDrivers()
    {
        ConducteursFactory.getDrivers()
            .then(function(data){
                $scope.drivers =data.data ;

            }, function(err){
                $scope.message ="enable to load data !" + err;
            })
    }


    getDrivers(); // load the clients

    /*

     */


    $scope.updateDriver = function(id,driver)
    {

        //update the client

        ConducteursFactory.updateDriver(id,driver)
            .then(function(data){
                $scope.status ="200 ok !";
                console.log($scope.status);

            }, function(err){
                console.log('err in updating data !');
            })



    }



    /*

     */

    $scope.addDriver = function()
    {

        //check if idDriver not null !
        if($scope.newDriver.idConducteur!=null)
        {

            $scope.updateDriver($scope.newDriver.idConducteur,$scope.newDriver);
            $state.go('conducteurs');
        }
        else {

            ConducteursFactory.postDriver($scope.newDriver)
                .then(function (response) {

                    $state.go('conducteurs');
                }, function (err) {
                    console.log('err !' + err);
                })
        }


    }



    /*

     */
    $scope.deleteDriver = function(id)
    {


        ConducteursFactory.deleteDriver(id)
            .then(function(){
                $scope.status ="deleted driver!";
                // we msut refresh the list
               getDrivers();



            },function(err){
                console.log('err !' +err);
            })
    }

    /*

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





})




/*
-__-_-_-_-_-_-_-_-_-_-_-_-_-THE CONTROLLER FOR THE MAIL-_-_-_-_-_-_-_-_-__--_-_-_ Reservation.findById(id_reservation)
        .then(function(reservation){
            //get the data from the reservation table

            var Reservation_Voiture_Modele_idModele = reservation.Voiture_Modele_idModele;
            var Reservation_Client_idClient = reservation.Reservation_Client_idClient ;


        })

 */

App.controller('emailConducteursController', function($scope,$http, $state){
    $scope.show = true ;

    $scope.data ={};

    $scope.sendMail = function()
    {

        console.log(JSON.stringify($scope.data));

        $http.post('/auth/admin/sendMail',$scope.data)
            .then(function(res){
                console.log('success !' + JSON.stringify(res));
               $state.go('conducteurs');


            }, function(err){
                console.log('err' + err);
            })

    }


})





/*
 -__-_-_-_-_-_-_-_-_-_-_-_-_-THE CONTROLLER FOR THE MAIL
 */

App.controller('emailClientsController', function($scope,$http, $state){
    $scope.show = true ;

    $scope.data ={};

    $scope.sendMail = function()
    {

        console.log(JSON.stringify($scope.data));

        $http.post('/auth/admin/sendMail',$scope.data)
            .then(function(res){
                console.log('success !' + JSON.stringify(res));
                $state.go('clients');


            }, function(err){
                console.log('err' + err);
            })

    }


})


App.controller('ManagerController', function($scope,Authentication,ManagerFactory){

    $scope.show = false ;
    $scope.show2 = false ;
    $scope.show3  = true;

    $scope.newManager ={};
    $scope.Manager ={};
    $scope.managers =[];


    console.log('the current User is :' + JSON.stringify(Authentication.currentUser()));

    $scope.user = Authentication.currentUser();



    getManagers = function()
    {
        ManagerFactory.getManagers().then(function(result){
            console.log('esult of managers are :' + JSON.stringify(result.data));
            $scope.managers = result.data;
        })

    }

    getManagers();


    $scope.addManager = function()
    {
        ManagerFactory.addManager($scope.newManager)
            .then(function(result){
              getManagers();
                $scope.show = false;
                $scope.show2= true;
            }, function(err){

            })



    }

    $scope.updateManager = function()
    {

        console.log('we ill upda this user')
        ManagerFactory.updateManager( $scope.user.idManager, $scope.user)
            .then(function(result){
                console.log('update succcesfuly :' + result);
                $scope.show3= true;

            }, function(err){
                console.log('err :' + err);
            })

    }

    $scope.deleteManager = function(id)
    {
        ManagerFactory.deleteManager(id)
            .then(function(result){
                console.log('deletd succes');
                getManagers();
            })

    }




})



/*
_-_--__-_--__-_-_-_-_-_-_-_-_-_-_-_
_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-
_-_-_-_-_-_-__-_-_-_-_-_-_-_-__-_-_-
 */

App.controller('statistciCtrl', function ($scope,$http,Parametres) {

$scope.carsChiffreAffairs = [];
    $scope.clientsStatus =[];


    console.log('location add :' +Parametres.GetlocationAdd());



    $scope.myChartObject = {};


    $scope.myChartObject.type = "ColumnChart";


   $scope.data = [1500,1500,4500,2600]


    //service1 for cars
    $http.get('/auth/admin/statiscCars')
        .then(function(data){
            console.log(JSON.stringify(data.data));
            $scope.carsChiffreAffairs = data.data;

console.log('modele nom :' +JSON.stringify($scope.carsChiffreAffairs.length))
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







            console.log(rows);


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






});


App.controller('ParametresController', function ($scope,$rootScope,Parametres) {



    $scope.Access = {};


    $scope.save = function()
    {
        console.log('saved ' +JSON.stringify($scope.Access) );
        alert('saved ' + $scope.Access);
    }







})





App.controller('calendrierCtrl', function($scope,locationsFactory,CalendrierService){



    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /* config object */
    $scope.uiConfig = {
        calendar:{
            height: 450,
            editable: true,
            header:{
                left: 'month basicWeek basicDay agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            dayClick: $scope.alertEventOnClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
        }
    };




    $scope.locations =[];



    //get ALl the locations



    $scope.eventSources = [
        [

        ]
    ];





    var locations = locationsFactory.query(function(){
        console.log("locatison are :"  +JSON.stringify(locations));

        for (var i = 0; i < locations.length; i++) {

            console.log('dat debut' +  locations[i].dateDebut)
            locations[i].dateDebut = new Date(locations[i].dateDebut);
            locations[i].dateFin = new Date(locations[i].dateFin);
            //
            locations[i].dateDebut.setHours(Number(locations[i].heureDebut));
            locations[i].dateFin.setHours(Number(locations[i].heureFin));


            var event = {
             "title": locations[i].Client.nom + ' ' +locations[i].Client.prenom,
             "start": locations[i].dateFin,
             "end":  new Date(y, m, d)
             }
            //pour la peristant des evenemtns
            event.stick = true;


            $scope.eventSources[0].push(event);
            console.log('event length' + $scope.eventSources[0].length );
        }
    })





















})










