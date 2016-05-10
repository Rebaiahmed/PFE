
angular
    .module('adminApp').service('ParametresService', function($window){




    /*
     define the function
     */
    this.saveParams = function(params){
        $window.localStorage['paramtrea-authorization']=angular.toJson(params);
    }

    this.getParams = function()
    {
        return  $window.localStorage['paramtrea-authorization'];

    }

    this.deleteParams = function()
    {
        $window.localStorage.removeItem('paramtrea-authorization');

    }


})









angular
    .module('adminApp').controller('ParametresController', function ($scope,ParametresService,$location,$window) {





    /*
     Access[0] == location
     Access[1] == Voiture
     Access[2] == Entretients
     Access[3] == Contrats
     Access[4] == Factures
     Access[5] == Client

     Access[6] == Conductuer

     */


    $scope.Access = JSON.parse(ParametresService.getParams());
    console.log('tabl aceess ' + $scope.Access);



    $scope.save = function()
    {



        for(var i=0;i<7;i++)
        {
            if($scope.Access[i]!=true  )
            {
                $scope.Access[i] =false;

            }
        }

        ParametresService.saveParams( $scope.Access );
        $window.location.reload();

    }







})