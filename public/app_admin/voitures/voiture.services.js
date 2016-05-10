angular
    .module('adminApp').factory('VoitureFactory',['$http', function($http){

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

