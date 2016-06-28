/*
_--_-_-_-_-_---__DEFINE OUR SERVICES-__-_-_-_-_-_-_-__-_-_-_-_-__--_
 */



//service pour les voitures

angular
    .module('adminApp')

    .service('VoitureService',['$http', function($http){

        var urlbase = "/auth/admin/admin/voitures";



        this.getCars= function()
        {
            return $http.get(urlbase);
        }



        this.getCar= function(id)
        {
            return $http.get('/auth/admin/admin/voiture/' + id);
        }


        this.postCar = function(car)
        {
            return $http.post(urlbase,car);
        }

        this.updateCar = function(id,car)
        {
           
            return $http.put(urlbase+'/' + id,car)//a vérfier !!
        }


        this.updateCar_dates = function(id,car){
            return $http.put('/auth/admin/admin/voiture/dates'+'/' + id,car)//a vérfier !!
        }
        this.deleteCar = function(id)
        {
            return $http.delete('/auth/admin/admin/voiture/'+ id);
        }




    }])



.factory('Socket',['socketFactory', function(socketFactory){

    return socketFactory({
        prefix :'',
        ioSocket :io.connect('http://localhost:3000/')

    })




}])

.service('PreReservationService',['$http', function($http){

        var urlbase = "/auth/admin/admin/PreReservations";
        var url2 = "/auth/admin/admin/Prelocations";





        this.getPreReservations = function()
        {
            return $http.get(urlbase);

        }


        this.deletePrereservation = function(id)
        {
            return $http.delete(urlbase + '/' + id);
        }

        this.saveReservation = function(data)
        {
            return $http.post(url2, data);
        }





    }])







.service('Reservation_Contrat_Service',['$http', function($http){


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





}])




.service('ParametresService',['$window', function($window){




        /*
         define the function
         */
        this.saveParams = function(params){
            $window.localStorage['paramtrea-authorization']= angular.toJson(params);
        }

        this.getParams = function()
        {
            return  $window.localStorage['paramtrea-authorization'];

        }

        this.deleteParams = function()
        {
            $window.localStorage.removeItem('paramtrea-authorization');

        }


    }])





.factory('modeleFactory',['$http', function($http){

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


}])















.service('ManagerFactory',['$http', function($http){

        var urlbase = "/auth/admin/admin/Managers";





        this.getManagers = function()
        {
            return $http.get(urlbase)
        }

        this.updateManager = function(id,Manager)
        {
            return $http.put(urlbase+'/'+id,Manager);

        }

        this.addManager = function(manager)
        {
            return $http.post(urlbase,manager);
        }

        this.deleteManager = function(id)
        {

            return $http.delete(urlbase + '/' +id)
        }








    }])








.service('ClientsService',['$http', function($http){
     var urlbase = "/auth/admin/admin/clients";
        var clientFactory ={} ;


        this.getClients = function()
        {
            return $http.get(urlbase);
        }



        this.getClient = function(id)
        {
            return $http.get(urlbase+'/' + id);
        }


        this.postClient = function(client)
        {
            return $http.post(urlbase,client,password);
        }

        this.updateClient = function(id,client)
        {
            return $http.put(urlbase+'/' + id,client)
        }

        this.deleteClient = function(id)
        {
            return $http.delete(urlbase +'/' + id);
        }







    }])




.service('ConducteursFactory',['$http','$resource', function($http,$resource){


        var urlbase = "/auth/admin/admin/conducteurs";


        this.getDrivers = function()
        {
            return $http.get(urlbase);
        }



        this.getDriver= function(id)
        {
            return $http.get(urlbase+'/' + id);
        }


        this.postDriver = function(driver)
        {
            return $http.post(urlbase,driver);
        }

        this.updateDriver = function(id,driver)
        {
            return $http.put(urlbase+'/' + id,driver)
        }


        this.deleteDriver = function(id)
        {
            return $http.delete(urlbase +'/' + id);
        }





    }])




.service('ContratService', ['$http', function($http){



       this.createContrat = function(contrat)
        {
            return $http.post('/auth/admin/admin/contrats' , contrat);

        }


        this.getContrats = function()
        {
            return $http.get('/auth/admin/admin/contrats');
        }

        this.getContrat = function(id)
        {
            return $http.get('/auth/admin/admin/contrats/'+ id);
        }


        this.updateContrat = function(id,contrat)
        {
            return $http.put('/auth/admin/admin/contrats/'+ id,contrat);
        }

        this.deleteContrat = function(id)
        {
            return $http.delete('/auth/admin/admin/contrats/'+ id);
        }


    }])
















.service('EntretientService',['$http', function($http){

        var urlbase = "/auth/admin/admin/entretients";



        this.getEntretients = function()
        {
            return $http.get(urlbase);
        }



        this.getEntretient= function(id)
        {
            return $http.get(urlbase+'/' + id);
        }


        this.postEntretient = function(entretient)
        {
            return $http.post(urlbase,entretient);
        }

        this.updateEntretient = function(id,entretient)
        {
            return $http.put(urlbase+'/' + id,entretient)//a vérfier !!
        }
        this.deleteEntretient = function(id)
        {
            return $http.delete(urlbase +'/' + id);
        }



    }])







.service('factureFactory',['$http', function($http){

        var urlbase = "/auth/admin/admin/Factures";



        this.getFactures= function()
        {
            return $http.get(urlbase);
        }




        this.postFacture = function(facture)
        {
            return $http.post(urlbase,facture);
        }

        this.updateFacture = function(facture)
        {
            return $http.put(urlbase+'/' + facture.id,facture)
        }

        this.deleteFacture = function(id)
        {
            return $http.delete(urlbase+'/' + id)
        }



    }])





.service('locationService',['$resource','$http', function($resource,$http){



        this.getByEtat = function(etat){


           return $http.get('/auth/admin/admin/locations/' + etat)
        }


        this.getlocations_retard = function(){
            return $http.get('/auth/admin/locations/retard')
        }

        this.getById = function(id){
            return $http.get('/auth/admin/admin/locations/' + id);
        }


        this.updatelocation = function(id,location){
            return $http.put('/auth/admin/admin/locations/' + id,location);
        }


        this.deletelocation = function(id){
            return $http.delete('/auth/admin/admin/locations/' + id);
        }


        this.savelocation = function(location){
            return $http.post('/auth/admin/admin/locations/', location)

        }

        this.cloturelocation = function(id){
            return $http.put('/auth/admin/admin/location/cloture/' + id);
        }

    }])




///une service pour les alertes



    .service('AlerteService',['$http','$window', function($http,$window){


        this.getALLAlertes = function(){
            return $http.get('');
        }

        this.deleteAlerte  = function(id){

            return $http.delete('',id);

        }


    }])




.service('Authentication',['$http','$window', function($http,$window){


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

                payload = token.split('.')[1];
                payload =$window.atob(payload);
                payload = JSON.parse(payload);
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


                // we will return an objectangular-permission
                return{
                    _id : payload._id,
                    email : payload.email,
                    Username : payload.Username,
                    role:payload.role
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
                .error(function(err){
                    console.log('error in login !'+ err)
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