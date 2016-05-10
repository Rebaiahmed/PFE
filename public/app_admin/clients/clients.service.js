

angular
    .module('adminApp').factory('ClientsFactory',['$http', function($http){
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
