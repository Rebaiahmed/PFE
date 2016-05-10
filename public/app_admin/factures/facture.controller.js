
angular
    .module('adminApp').controller('FacturesController', function($scope,factureFactory,$stateParams,locationsFactory){

    $scope.factures = [];
    $scope.facture ={} ;
    $scope.location ;





        if($stateParams.contrat) {
            $scope.facture.tva = $stateParams.contrat.tva;
            $scope.facture.prixHt = $stateParams.contrat.prixHt;
            $scope.facture.prixTT = $stateParams.contrat.prixTT;
            $scope.facture.Contrat_idContrat = $stateParams.contrat.idContrat;

        }



if( !angular.isUndefined($stateParams.contrat)) {
    $scope.location = locationsFactory.get({
        idReservation: $stateParams.contrat.Reservation_idReservation

    }, function () {
        console.log('ok done !');

    })


}///end of if




    $scope.save = function(facture)
    {
        factureFactory.postFacture(facture).then(function(result){

            console.log('sauvgardé avec succes !');
        }, function(err){
            console.log('err' + err);
        })
    }





    getFactures = function()
    {
        factureFactory.getFactures()
            .then(function(data){
                $scope.factures =data.data ;

            }, function(err){
               console.log('err' + err);
            })


    }

    getFactures();

    updateFacture = function(id)
    {


        var facture ={};

        for(var i=0;i<$scope.factures.length;i++)
        {
            if($scope.factures[i].id==id)
            {
                facture = $scope.factures[i];
                break ;
            }

        }

        //update the bill

        factureFactory.updateFacture(facture)
            .then(function(data){
                $scope.status ="200 ok !";
                console.log($scope.status);

            }, function(err){
                console.log('err !'+ err);
            })

    }




})
