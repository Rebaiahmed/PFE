/*

--_-_-_-_-__-_-_-_-_-_We will Define the controllers-_-_-_-_-_-_-_-_-_-_-__-


 */



var App = angular.module('App.Controllers',['ngAnimate', 'ngSanitize','mgcrea.ngStrap','ngAnimate']);


App.config(function($modalProvider){
    angular.extend($modalProvider.defaults, {
        html: true
    });
})



/*

 //-_-_-_-__-_-_-_-_-__--___-_-_-_-_-_
 //-_-_-_-_-_-__Controlleur pour les voitures -_-_-_-__-_-_-_-_-_-
 //-_-_-_-__-_-_-_-_-__--___-_-_-_-_-_
 */
















/*

//-_-_-_-__-_-_-_-_-__--___-_-_-_-_-_
//-_-_-_-_-_-__Controlleur pour les voitures -_-_-_-__-_-_-_-_-_-
 //-_-_-_-__-_-_-_-_-__--___-_-_-_-_-_
 */


App.controller('voituresController', function($scope,$routeParams,DataService) {
/*
     initializer le paramétre de trier pour les voitures
     */

    $scope.orderCar = "modele";

    /*
     initializer la liste des voitures
     */

    $scope.voitures = [];


    $scope.voiture ={}

    var init = function()
    {
        DataService.getVoitures().success(function(data){


            $scope.voitures= data;

            // récupérer l'indice du client
            console.log( $scope.voitures.length);

        })

    }



    /*
     faire l'appel du fonction
     */

    init();

});




/*
 (_(_(__(_(_(_(
 (_-_-_-_-_-__-
 _-_-_-__-_-
 '-'-'--'-'-'--'-
 '('('(('('(

 */




App.controller('voitureDetailsCtrl', function($scope,$routeParams, DataService,$modal,$location){

    //initialize our modal
    $scope.modal = {
        title :"Ajouter la voiture",
        content :'<button class="btn btn-danger"> Vous etes sur ?</button>'
    }


    /*
     define the controller of the modal
     */
    function MyModalCtrl($scope)
    {
        $scope.title = 'title';
        $scope.content = '<h1>The conten </h1>';
    }



    //inject the scope into teh controller Modal

    MyModalCtrl.$inject =['$scope'];

    /*
     define our modal
     */
    var myModal = $modal({
        controller  :'MyModalCtrl',
        templateUrl :'../../../modal/AjouterVoiture.html',
        show :false
    })



    /*
     define the show and the hide methods
     */

    $scope.showModal = function()
    {
        myModal.$promise.then(myModal.show);

    }

    $scope.hideModal = function()
    {
        myModal.$promise.then(myModal.hide);

    }



    $scope.voiture ={};
    $scope.voitures =[];
    $scope.newVoiture ={};


    DataService.getVoitures().success(function(data){


        $scope.voitures= data;
  for(var i=0;i<$scope.voitures.length;i++)
  {
      if($scope.voitures[i].id=$routeParams.voitureId)
      {
          $scope.voiture =   $scope.voitures[i];
      }
  }


    })





    /*--__--__-_-_-_-_-_--__-_-_-_-_-_-_-_-_
     // Ajouter voiture-_-_-_-__-_-_-_-_-_
     */



    $scope.addVoiture = function()
    {
        console.log('new voiture !')
        //add teh new voiture to the list
        $scope.voitures.push($scope.newVoiture);
        console.log($scope.voitures.length);
        $location.path('/voitures');



    }






    /*--__--__-_-_-_-_-_--__-_-_-_-_-_-_-_-_
     // Editer UNe Voiture-_-_-_-__-_-_-_-_-_
     */

    $scope.editVoiture = function(id)
    {
        // we will push the new car in the list


    }

    /*--__--__-_-_-_-_-_--__-_-_-_-_-_-_-_-_
     // Supprimer une voiture_-_-_-__-_-_-_-_-_
     */

    $scope.deleteVoiture = function(id)
    {
        console.log('teh id to be deleted is :' + id);
        console.log($scope.voitures.length);
        $location.path('/voitures');

    }







})


/*
//-_-_-_-__-_-_-_-_-__--___-_-_-_-_-_
//-_-_-_-_-_-__Controlleur pour les Entretients -_-_-_-__-_-_-_-_-_-
//-_-_-_-__-_-_-_-_-__--___-_-_-_-_-_
*/

App.controller('EntretientsCtrl', function($scope,$routeParams, DataService,$modal,$location){

    //initialize our modal
    $scope.modal = {
        title :"Ajouter un nouveau entretien pour cette voiture",
        content :''
    }


    /*
     define the controller of the modal
     */
    function MyModalCtrl($scope)
    {
        $scope.title = 'title';
        $scope.content = '<h1>The conten </h1>';
    }



    //inject the scope into teh controller Modal

    MyModalCtrl.$inject =['$scope'];

    /*
     define our modal
     */
    var myModal = $modal({
        controller  :'MyModalCtrl',
        templateUrl :'../../../modal/AjouterEntretient.html',
        show :false
    })



    /*
     define the show and the hide methods
     */

    $scope.showModal = function()
    {
        myModal.$promise.then(myModal.show);

    }

    $scope.hideModal = function()
    {
        myModal.$promise.then(myModal.hide);

    }



    $scope.entretien ={
        "id" :"1",
        "nom" : "carburant",
        "type" :"type",
        "caution" :"123",
        "date":"22/25/56",
        "description" :"descirption"
    };
    $scope.entretiens =[];
    $scope.newEntretien ={};


    /*DataService.getVoitures().success(function(data){


        $scope.voitures= data;
        for(var i=0;i<$scope.voitures.length;i++)
        {
            if($scope.voitures[i].id=$routeParams.voitureId)
            {
                $scope.voiture =   $scope.voitures[i];
            }
        }


    })*/





    /*--__--__-_-_-_-_-_--__-_-_-_-_-_-_-_-_
     // Ajouter un entretien_-_-_-__-_-_-_-_-_
     */



    $scope.addEntretien = function()
    {
        /*console.log('new voiture !')
        //add teh new voiture to the list
        $scope.voitures.push($scope.newVoiture);
        console.log($scope.voitures.length);
        $location.path('/voitures');*/
        console.log('new added !');



    }






    /*--__--__-_-_-_-_-_--__-_-_-_-_-_-_-_-_
     // Editer Un entretien-_-_-_-__-_-_-_-_-_
     */

    $scope.editerEntretien = function(id)
    {
        // we will push the new car in the list
        $location.path('/modifierEntretien')


    }

    /*--__--__-_-_-_-_-_--__-_-_-_-_-_-_-_-_
     // Supprimer un Entretien_-_-_-__-_-_-_-_-_
     */

    $scope.supprimEntretient = function(id)
    {
       $scope.entretien ={};

        //$location.path('/voitures');

    }







})







/*
 (_(_(__(_(_(_(
 (_-_-_-_-_-__-
 _-_-_-__-_-
 '-'-'--'-'-'--'-
 '('('(('('(

 */




App.controller('clientsController', function($scope,$http,DataService){




    /*
    initializer les paramétres pour la formulaire
     */

    $scope.edit = true;
    $scope.hideform = true;








    /*
    initializer la liste des cients
     */
    $scope.clients = [];
    $scope.client = {};

    /*
     -_-_-_-__--_method refresh pour récupere les donnes
     */

    var init = function()
    {
        DataService.getClients().success(function(data){

            $scope.clients = data;
        })

    }



    /*
    faire l'appel du fonction
     */

   init();

    /*--__--__-_-_-_-_-_--__-_-_-_-_-_-_-_-_
     // Ajouter UN Client-_-_-_-__-_-_-_-_-_
     */


    $scope.addClient = function()
    {


    }

    /*--__--__-_-_-_-_-_--__-_-_-_-_-_-_-_-_
     // Supprimer UN Client-_-_-_-__-_-_-_-_-_
     */

    $scope.deleteClient = function(cin)
    {

         // récupérer l'indice du client
        var indice = DataService.Recherche(cin,$scope.conducteurs);

        if(indice!=-1)
        {
            $scope.clients.splice(indice,1);
        }
        else
        {
            console.log('indice non trouvée ');
            init();
        }


    }

    /*--__--__-_-_-_-_-_--__-_-_-_-_-_-_-_-_
     // Editer un Client_-_-_-__-_-_-_-_-_
     */

    $scope.editClient = function(cin)
    {

        $scope.hideform = false;

        if(cin=='new')
        {
            $scope.edit = true;
            // ajouter le nouveau client a la base de donnes


        }
        else
        {
            $scope.edit = false;
            $scope.client = DataService.Recherche(cin,$scope.clients);;



        }

    }

})


/*
 //-_-_-_-__-_-_-_-_-__--___-_-_-_-_-_
 //-_-_-_-_-_-__Controlleur pour les locations -_-_-_-__-_-_-_-_-_-
 //-_-_-_-__-_-_-_-_-__--___-_-_-_-_-_
 */



/*
 (_(_(__(_(_(_(
 (_-_-_-_-_-__-
 _-_-_-__-_-
 '-'-'--'-'-'--'-
 '('('(('('(

 */



App.controller('locationsController', function($scope){
    $scope.message = 'Contact us! JK. This is just a demo.';
})





/*
(_(_(__(_(_(_(
(_-_-_-_-_-__-
_-_-_-__-_-
'-'-'--'-'-'--'-
'('('(('('(

 */






App.controller('conducteursController', function($scope,DataService){
    $scope.message = 'Contact us! JK. This is just a demo.';


    /*
     initializer les paramétres pour la formulaire
     */

    $scope.edit = true;
    $scope.hideform = true;

    /*
     initializer la liste des cients
     */
    $scope.conducteurs = [];
    $scope.conducteur = {};

    /*
     -_-_-_-__--_method refresh pour récupere les donnes
     */

    var init = function()
    {
        DataService.getConducteurs().success(function(data){

            $scope.conducteurs = data;
        })

    }



    /*
     faire l'appel du fonction
     */

    init();


    /*--__--__-_-_-_-_-_--__-_-_-_-_-_-_-_-_
     // Rechercher un Client-_-_-_-__-_-_-_-_-_
     */

    /*var Rerchercher = function(cin)
    {

        var indice = -1;

        for(var i=0;i<$scope.conducteurs.length;i++)
        {
            if($scope.conducteurs[i].cin===cin)
            {
                indice = i;

            }
        }

        return indice ;
    }*/








    /*--__--__-_-_-_-_-_--__-_-_-_-_-_-_-_-_
     // Ajouter UN Conducteur-_-_-_-__-_-_-_-_-_
     */


    $scope.addConducteur = function()
    {


    }



    /*--__--__-_-_-_-_-_--__-_-_-_-_-_-_-_-_
     // Supprimer UN Conducteur_-_-_-__-_-_-_-_-_
     */

    $scope.deleteConducteur = function(cin)
    {

        // récupérer l'indice du client
        var indice = DataService.Recherche(cin,$scope.conducteurs);

        if(indice!=-1)
        {
            $scope.conducteurs.splice(indice,1);
        }
        else
        {
            console.log('indice non trouvée ');
            init();
        }


    }



    /*--__--__-_-_-_-_-_--__-_-_-_-_-_-_-_-_
     // Editer un Conducteur_-_-_-__-_-_-_-_-_
     */

    $scope.editConducteur = function(cin)
    {

        $scope.hideform = false;

        if(cin=='new')
        {
            $scope.edit = true;
            // ajouter le nouveau client a la base de donnes


        }
        else
        {
            $scope.edit = false;
            $scope.conducteur =DataService.Recherche(cin,$scope.conducteurs);



        }

    }






})