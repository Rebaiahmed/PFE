

angular
    .module('adminApp').controller('PreReservationCtrl', function($scope,$state,PreReservationFactory, locationsFactory){


    //méthode pour récuprer toutes les Preservations
    $scope.prereservations =[];

    $scope.prereservation ={};
    $scope.nbr = 0;

    $scope.getPreReservations = function()
    {
        PreReservationFactory.getPreReservations()
            .then(function(result){

                $scope.nbr = result.data.length ;

                $scope.prereservations = result.data;

            }, function(err){
                console.log('err' + err);
            })
    }


    $scope.getPreReservations();


    $scope.delete = function(id)
    {
        PreReservationFactory.deletePrereservation(id)
            .then(function(result){
                $scope.status ="deleted preservation!";
                alert('this preservation will be deletd !');
                $scope.getPreReservations();
                console.log($scope.status);
            }, function(err){
                console.log('err' + err);
            })

        //$state.go('locations');

    }


    $scope.confirmer = function(id)
    {
        //get the Preservation
        for(var i=0;i<$scope.prereservations.length;i++)
        {
            if($scope.prereservations[i].idReservation==id)
            {
                $scope.prereservation= $scope.prereservations[i] ;
                break ;
            }
        }

        console.log('we willadd this to the database');

        PreReservationFactory.saveReservation($scope.prereservation)
            .then(function(status){
                console.log('saved sucuesfuly !' + status);


                $scope.delete($scope.prereservation.idReservation);
                $scope.getPreReservations();
                $state.go('locations');
            }, function(err){
                console.log('err :' + err);
            })


    }


});