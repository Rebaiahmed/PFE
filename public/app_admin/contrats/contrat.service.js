
angular
    .module('adminApp').factory('ContratService', ['$http', function($http){

    ContratService = {};

    ContratService.createContrat = function(contrat)
    {
        return $http.post('/auth/admin/admin/contrats' , contrat);

    }


    ContratService.getContrats = function()
    {
        return $http.get('/auth/admin/admin/contrats');
    }

    ContratService.getContrat = function(id)
    {
        return $http.get('/auth/admin/admin/contrats/'+ id);
    }


    ContratService.updateContrat = function(id,contrat)
    {
        return $http.put('/auth/admin/admin/contrats/'+ id,contrat);
    }

    ContratService.deleteContrat = function(id)
    {
        return $http.delete('/auth/admin/admin/contrats/'+ id);
    }

    return ContratService ;
}])