/*
 define our service
 */

angular
    .module('meanApp')
    .service('ReservationService',['$http','$window', function($http,$window,Authentication) {




       this.newReservation ={};
        /*var saveReservation = function(newReservation){
          localStorage.setItem('reservation-token',JSON.stringify(newReservation));
        }

        var getReservation = function()
        {
            return localStorage.getItem('reservation-token');

        }

        var removeReservation = function()
        {
           localStorage.removeItem('reservation-token');

        }*/

        this.getReservation = function()
        {

            return this.newReservation;

        }

          this.saveReservation = function(newReservation){

          this.newReservation=newReservation;

          }


        this.removeReservation = function()
            {
                this.newReservation ={};


            }



           this.getCars = function()
           {

           return $http.get('/client/voitures');


             }


        this.getCar = function(id)
        {
            return $http.get('/client/voiture/', id);
        }



        this.savePreReservation = function(data)
        {
            return $http.post('/auth/admin/admin/PreReservations',data);
        }


    }
    ])