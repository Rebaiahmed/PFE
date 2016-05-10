

angular
    .module('adminApp').factory('ManagerFactory',['$http', function($http){

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