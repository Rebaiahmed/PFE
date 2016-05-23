

angular
    .module('adminApp').factory('factureFactory',['$http', function($http){

    var urlbase = "/auth/admin/admin/Factures";
    var factureFactory ={} ;


    factureFactory.getFactures= function()
    {
        return $http.get(urlbase);
    }




    factureFactory.postFacture = function(facture)
    {
        return $http.post(urlbase,facture);
    }

    factureFactory.updateFacture = function(facture)
    {
        return $http.put(urlbase+'/' + facture.id,facture)//a vérfier !!
    }

        factureFactory.deleteFacture = function(id)
        {
            return $http.delete(urlbase+'/' + id)//a vérfier !!
        }


    return factureFactory ;

}]);