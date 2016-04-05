/*

 --_-_-_-_-__-_-_-_-_-_We will Define our services-_-_-_-_-_-_-_-_-_-_-__-


 */



var App = angular.module('App.Services',[]);


/*
--_-_-_-__-_-_-_-__-_-_-_--_-_
-_-_-_-__-_Service pour les clients-_-_-_-__-_-
 */

App.factory('DataService', function($http){




 return{


  getClients : function() {
   return $http({
    url: 'clients.json',
    method: 'GET'
   })


  },



  getConducteurs : function() {
   return $http({
    url: 'conducteurs.json',
    method: 'GET'
   })


  },


  getVoitures: function() {
   return $http({
    url: 'voitures.json',
    method: 'GET'
   })


  },


  Recherche : function(cin,Liste){

   var indice = -1;

   for(var i=0;i<Liste.length;i++)
   {
    if(Liste[i].cin===cin)
    {
     indice = i;
     break;

    }
   }

   return indice ;

  }


 } //end return





})


/*
 --_-_-_-__-_-_-_-__-_-_-_--_-_
 -_-_-_-__-_Service pour les conducteurs_-_-_-__-_-
 */



/*
 --_-_-_-__-_-_-_-__-_-_-_--_-_
 -_-_-_-__-_Service pour les voitures-_-_-_-__-_-
 */


App.service('VoitureService', function($http){






})