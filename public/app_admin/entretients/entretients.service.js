



angular
    .module('adminApp').factory('EntretientFactory',['$http', function($http){

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
