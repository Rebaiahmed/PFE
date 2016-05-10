

angular
    .module('adminApp').controller('conducteursController', function($scope,ConducteursFactory,$state,notify){


    //la liste des chauffeurs
    $scope.drivers=[];
    //objet vide pour un chauffeur
    $scope.driver ={};

    //objet vide pour le nouveua chauffeur
    $scope.newDriver = {};

    $scope.showAdd= false ;

    //variable pour valider la form

    $scope.submitted = false ;









    $scope.change = function()
    {
        $scope.showAdd = !$scope.showAdd;
    }






    /*
     -_-_-_-_-_-__-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-
     -__-_-_-_-_-_RÉCUPERER TOUS LES CHAUFFEURS-_-_-_-_-_-_-__-
     */



    function getDrivers()
    {
        ConducteursFactory.getDrivers()
            .then(function(data){
                $scope.drivers =data.data ;

            }, function(err){
                console.log('err' + err);
            })
    }


    getDrivers(); //

    /*
     -_-_-_-_-_-__-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-
     -__-_-_-_-_-_MODIFIER CHAUFFEUR_-_-_-_-_-_-__-
     */



    $scope.updateDriver = function(id,driver)
    {

        $scope.submitted=true;

        ConducteursFactory.updateDriver(id,driver)
            .then(function(data){



            }, function(err){
                console.log('err  !' + err);
            })



    }



    /*
     -_-_-_-_-_-__-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-
     -__-_-_-_-_-_Ajouter CHAUFFEUR_-_-_-_-_-_-__-
     */


    $scope.addDriver = function()
    {

        $scope.submitted = true;
        //check if idDriver not null !
        if($scope.newDriver.idConducteur!=null)
        {

            if($scope.driverForm.$valid) {
                $scope.updateDriver($scope.newDriver.idConducteur, $scope.newDriver);
                notify("Succés de modification !");
                $state.go('conducteurs');
            }
        }
        else {

            if($scope.driverForm.$valid) {

                ConducteursFactory.postDriver($scope.newDriver)
                    .then(function (response) {
                        $scope.change();
                        notify("Succés d'ajout");
                        getDrivers();


                    }, function (err) {
                        console.log('err !' + err);
                    })

            }//end if valid form
        }


    }



    /*
     -_-_-_-_-_-__-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-
     -__-_-_-_-_-_SUPPRIMER CHAUFFEUR_-_-_-_-_-_-__-
     */

    $scope.deleteDriver = function(id)
    {


        ConducteursFactory.deleteDriver(id)
            .then(function(){
                notify('Succés de suppresion');

                getDrivers();



            },function(err){
                console.log('err !' +err);
            })
    }

    /*
     -_-_-_-_-_-__-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-
     -__-_-_-_-_-_EDITER CHAUFFEUR_-_-_-_-_-_-__-
     */



    $scope.editDriver = function(id)
    {
        for(var i=0;i<$scope.drivers.length;i++)
        {
            if($scope.drivers[i].idConducteur==id)
            {
                $scope.newDriver = $scope.drivers[i];
                $scope.newDriver.datePermis = new Date($scope.newDriver.datePermis);
                break;
            }
        }

        $state.go('.add');



    }





})
