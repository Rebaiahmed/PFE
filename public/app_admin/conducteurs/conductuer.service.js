angular
    .module('adminApp').factory('ConducteursFactory',['$http', function($http){


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