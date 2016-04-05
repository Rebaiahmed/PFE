
var App = angular.module('adminApp',['ui.router','ngResource']);

/*
the config for touing
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

        .state('Profile', {
            url :'/Profile',
            templateUrl: '/app_admin/pages/Profile.html',
            parent: "admin_access",

        })

        .state('Messages', {
            url :'/Messages',
            templateUrl: '/app_admin/pages/Messages.html',
            parent: "admin_access",

        })

        .state('locations', {
               url :'/locations',
            templateUrl: '/app_admin/pages/locations2.html',
            parent: "admin_access",

        })

        .state('locations.add', {
            url :'/addReservation',
            templateUrl: '/app_admin/pages/Creer_location.html',
            parent: "locations",

        })

        .state('Reservations', {
            url :'/reservations',
            templateUrl: '/app_admin/pages/Reservations.html',
            parent: "admin_access",

        })

        .state('voitures', {
            url :'/voitures',
            templateUrl: '/app_admin/pages/voitures2.html',
            parent: "admin_access",

        })

        .state('voitures.add', {
            url :'/addCar',
            templateUrl: '/app_admin/pages/Creer_Voiture.html',
            parent: "voitures",

        })

        .state('voitures.add.add2', {
            url :'/addModele',
            templateUrl: '/app_admin/pages/Creer_Modele.html',
            parent: "voitures",

        })




        .state('entretients', {
            url :'/entretients',
            templateUrl: '/app_admin/pages/entretients2.html',
            parent: "admin_access",

        })

        .state('contrats', {
            url :'/contrats',
            templateUrl: '/app_admin/pages/contrats2.html',
            parent: "admin_access",

        })

        .state('factures', {
            url :'/factures',
            templateUrl: '/app_admin/pages/factures2.html',
            parent: "admin_access",

        })

        .state('clients', {
            url :'/clients',
            templateUrl: '/app_admin/pages/clients2.html',
            parent: "admin_access",

        })



        .state('clients.edit', {
            url :'/addClient',
            templateUrl: '/app_admin/pages/Editer_Client.html',
            parent: "clients",

        })


        .state('clients.details', {
            url :'/detailsClient',
            templateUrl: '/app_admin/pages/Details_Client.html',
            parent: "clients",

        })

        .state('clients.details.edit', {
            url :'/addClient',
            templateUrl: '/app_admin/pages/Editer_Client.html',
            parent: "clients",

        })

        .state('clients.edit.details', {
            url :'/addClient',
            templateUrl: '/app_admin/pages/Details_Client.html',
            parent: "clients",

        })

        .state('clients.mail', {
            url :'/sendMail',
            templateUrl: '/app_admin/pages/Envoyer_email.html',
            parent: "clients",

        })


        .state('conducteurs', {
            url :'/conducteurs',
            templateUrl: '/app_admin/pages/conducteurs2.html',
            parent: "admin_access",

        })


        .state('conducteurs.mail', {
            url :'/conducteursMail',
            templateUrl: '/app_admin/pages/Envoyer_email.html',
            parent: "conducteurs",

        })

        .state('conducteurs.add', {
            url :'/conducteursAdd',
            templateUrl: '/app_admin/pages/Creer_Conducteur.html',
            parent: "conducteurs",

        })



        .state('statistiques', {
            url :'/statistiques',
            templateUrl: '/app_admin/pages/statistiques.html',
            parent: "admin_access",

        })



}



function run($rootScope,$location,Authentication)
{
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        console.log('logged or not logged ' + Authentication.isloggedIn());
        if ($location.path() === '/auth/admin/admin' && !Authentication.isloggedIn()) {
            $location.path('/');
        }
        if ($location.path() === '/auth/admin/admin/locations' && !Authentication.isloggedIn()) {
            $location.path('/');
        }
    });


}



App.config(['$stateProvider', '$urlRouterProvider',config]);
App .run(['$rootScope','$location','Authentication',run]);
/*
-_-_-_-__-_-_-_-_-_-_-_-_
-_-_-__-_-_-__-_-_-_-_-_-_-_-_
_-_-_-_-_-__-_-_-_-__-
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

                console.log((payload.exp >Date.now() /1000))
                //return payload.exp >Date.now() /10000;  // a expliquer
                return true;

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
                payload =$window.atob(payload);
                payload = JSON.parse(payload);
                console.log('currentUser the payload is :' +payload);

                // we will return an object
                return{
                    email : payload.email,
                    name : payload.name
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






//-_-_-__-_-_--_-_les services
App.factory('locationsFactory',['$resource', function($resource){

    return $resource('/auth/admin/admin/locations/:idReservation'
     ,{idReservation: '@idReservation'},{
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
    );

}]);





//-_-_-__-_-_--_-_les services
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




//-_-_-__-_-_--_-_les services
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





//-_-_-__-_-_--_-_les services
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

    entretientFactory.updateEntretient = function(entretient)
    {
        return $http.put(urlbase+'/' + entretient.id,entretient)//a vérfier !!
    }
    entretientFactory.deleteEntretient = function(id)
    {
        return $http.delete(urlbase +'/' + id);
    }


    return entretientFactory ;

}]);






//-_-_-__-_-_--_-_les services
App.factory('EntretientCarFactory',['$http', function($http){

    var urlbase = "/auth/admin/admin/entretientCar";
    var entretientCar ={} ;


    entretientCar.getEntretients = function(id)
    {
        return $http.get(urlbase + '/' + id);
    }



    return entretientCar ;

}]);




//-_-_-__-_-_--_-_les services-__-_-_-_-_-_-__-_
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






//-_-_-__-_-_--_-_les services
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


//-_-_-__-_-_--_-_les services-_-__-_-_-_-_-_-_-__-


App.factory('GenerateContrat', ['$http', function($http){

    generateContrat = {};

    generateContrat.createContrat = function(idReservation,contrat)
    {
        return $http.post('/auth/admin/admin/contrats/' + idReservation,contrat);

    }

    return generateContrat;
}])







//-_-_-__-_-_--_-_les services-_-__-_-_-_-_-_-_-__-
App.factory('Contrastfactory',['$resource', function($resource){

    return $resource('/auth/admin/admin/contrats'
    );

}]);







//-_-_-__-_-_--_-_les services
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
 define our controlllers
 */


App.controller('loginCtrl', function($scope,$location,Authentication){

// get the controller with this

        // initialize the
    $scope.credentials={
            name :"",
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
                .then(function(){
                    $location.path('/auth/admin/admin'); // redirect him to the profile page
                })


        }


    })








App.controller('voituresController', function($scope,VoitureFactory,modeleFactory,$state) {

    $scope.cars=[];
    $scope.car ={};
    $scope.newCar = {};

    $scope.show = false ;

    $scope.newModele = {};
    $scope.newModele.prixGPS = 25;
    $scope.newModele.prixChaisse =25;
    $scope.newModele.prixChauffeur = 25;



    $scope.change = function()
    {
        console.log('change is' + $scope.show);
        $scope.show = ! $scope.show;
        console.log('change will be' + $scope.show);
    }

    $scope.models = [];


        modeleFactory.getModeles()
            .success(function(data){
                $scope.models = data;

            })



    function getCars()
    {
        VoitureFactory.getCars()
            .then(function(data){
                $scope.cars=data.data ;


            }, function(err){
                $scope.message ="enable to load data !" + err;
            })
    }


    getCars(); // load the cars

    /*

     */


    $scope.updateCar = function(id,car)
    {

        //update the client

        VoitureFactory.updateCar(id,car)
            .then(function(data){
                console.log('we will update this data')


            }, function(err){
                console.log('err in updating data !');
            })



    }



    /*

     */

    $scope.addCar = function()
    {
        // check if the new car having an id then will be updated

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

     */


    $scope.editCar = function(id)
    {
        VoitureFactory.getCar(id)
            .then(function(data){

               $scope.car = data.data;

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






})


/*
-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-
_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_
_-_-_-_-_-_-_-_-___-_-_-_-_-_-_-__--__-_-_-
_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-__--_
_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-__-
 */




App.controller('EntretientsCtrl', function($scope,EntretientFactory, VoitureFactory,EntretientCarFactory){
    $scope.entretients=[];
    $scope.entretient ={};


    $scope.cars = [];
    $scope.bougie = 85000;
    $scope.frein = 85000;

    //
    $scope.courroie = 100000
    $scope.vidange = 77980;




    function getEntretients()
    {
        EntretientFactory.getEntretients()
            .then(function(data){
                console.log(JSON.stringify(data.data));
                $scope.entretients = data.data;

            })


    }

    getEntretients();



    /*function getCars()
    {
        VoitureFactory.getCars()
            .then(function(data){
                $scope.cars=data.data ;



            }, function(err){
                $scope.message ="enable to load data !" + err;
            })
    }
               getCars();*/


































})





/*
 -_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-
 _-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_
 _-_-_-_-_-_-_-_-___-_-_-_-_-_-_-__--__-_-_-
 _-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-__--_
 _-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-__-
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




    $scope.Nbr_Reservations_Totale = function(client)
    {

 return client.Reservations.length ;
    }//end of NBr_Reservations




    $scope.chiffre_Affaires = function(client)
    {
        var somme = 0;
        for(var i=0;i<client.Reservations.length;i++)
        {

        }
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
-_-_-_-_-_-__-_-_-_-_-_-_-
_-_-_-_-_-_-_-_-__-_-_-_--_-
_-_-_-_-_-_-__-_-_-_-_-_-_-_
 */


App.controller('locationsController', function($scope,$http,locationsFactory,ClientsFactory,
                                               VoitureFactory,$state){




      $scope.clients = []
    $scope.cars = [];
$scope.locations =[];
    $scope.location ={}
    $scope.newReservation ={};
    $scope.value = false;

    $scope.etat = "" ;





    ClientsFactory.getClients()
        .success(function(res){
            $scope.clients = res ;

        })

    VoitureFactory.getCars()
        .success(function(res){
            $scope.cars = res ;

        })


    //get ALl the locations

    function init() {
        var locations = locationsFactory.query(function () {
            $scope.locations = locations;

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


    $scope.evaluate = function(loc)
    {
        if(loc.dateFin>new Date())
        {
            return true;
        }
        else{
            return false;
        }

    }




    $scope.supprimlocation = function(id)
    {
        console.log('the id will be deleted is :' + id);
        // we must serch this reservation

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
calcul prix totale
 */

    $scope.calculPrix = function(id)
    {

  var prixTotale =0;



        $scope.location=locationsFactory.get({
            idReservation:id

        }, function(){





            //trasnfrom the date of begin adn the end

            $scope.location.dateDebut = new Date($scope.location.dateDebut);
            $scope.location.dateFin = new Date($scope.location.dateFin);


          console.log('data1 ' + $scope.location.dateFin.getDate());
            console.log('date2' + $scope.location.dateDebut.getDate());

             prixTotale = ($scope.location.dateFin.getDate()- $scope.location.dateDebut.getDate());
            VoitureFactory.getCar($scope.location.Voiture_idVoiture)
                .then(function(res){

                    console.log('car is ' + JSON.stringify(res.data));
                    prixTotale=res.data.prixLocation*prixTotale;
                    console.log('prix totale est :' + prixTotale);

                    return prixTotale;
                })






        })







    }

















    /*

     */


    $scope.addReservation = function()
    {

        var idVoiture = $scope.newReservation.idVoiture;
        console.log(idVoiture + 'is');

        //search the idModele
        for (var i = 0; i < $scope.cars.length; i++) {
            if ($scope.cars[i].idVoiture == idVoiture) {
                $scope.newReservation.idModele = $scope.cars[i].Modele_idModele;
                console.log('the idModele is ' + $scope.newReservation.idModele);
                break;
            }
        }

         console.log("reservation before updating " +$scope.newReservation );

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
          });
            init();
            $state.go('locations');

        }
        else {




            console.log("we willa dd this reservation" + JSON.stringify($scope.newReservation));
            locationsFactory.save($scope.newReservation, function () {
                console.log("saved in the database !");
                $state.go('locations');


            })

        }

    }






})


/*
 -_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-
 _-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_
 _-_-_-_-_-_-_-_-___-_-_-_-_-_-_-__--__-_-_-
 _-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-__--_
 _-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-__-
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
 -_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-
 _-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_
 _-_-_-_-_-_-_-_-___-_-_-_-_-_-_-__--__-_-_-
 _-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-__--_
 _-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-__-
 */


App.controller('ContratsController', function($scope,Contrastfactory){


      $scope.contrats =[] ;
    $scope.contrat = {};
    Contrastfactory.query(function(data){
        $scope.contrats = data;
    });





})



/*
 -_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-
 _-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_
 _-_-_-_-_-_-_-_-___-_-_-_-_-_-_-__--__-_-_-
 _-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-__--_
 _-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-__-
 */



App.controller('CreateContrat', ['$scope','GenerateContrat', function($scope,GenerateContrat){


    var newContrat ={};

    $scope.generateContrat = function(idReservation)
    {
        // we will ge the data from tehj form
        // and save it in the database !
        GenerateContrat.generateContrat(idReservation,newContrat)
            .success(function(){

            })
            .error(function(err){

            })



    }



}]);







/*
 -_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-
 _-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_
 _-_-_-_-_-_-_-_-___-_-_-_-_-_-_-__--__-_-_-
 _-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-__--_
 _-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-__-
 */


App.controller('conducteursController', function($scope,ConducteursFactory,$state){
    $scope.drivers=[];
    $scope.driver ={};

    $scope.newDriver = {};


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











