
angular
    .module('adminApp').factory('PreReservationFactory',['$http', function($http){

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
