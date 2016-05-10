
angular
    .module('adminApp').controller('ManagerController', function($scope,Authentication,ManagerFactory){

    $scope.show = false ;
    $scope.show2 = false ;
    $scope.show3  = true;

    $scope.newManager ={};
    $scope.Manager ={};
    $scope.managers =[];


    console.log('the current User is :' + JSON.stringify(Authentication.currentUser()));

    $scope.user = Authentication.currentUser();



    getManagers = function()
    {
        ManagerFactory.getManagers().then(function(result){

            $scope.managers = result.data;
        })

    }

    getManagers();


    $scope.addManager = function()
    {
        ManagerFactory.addManager($scope.newManager)
            .then(function(result){
                getManagers();
                $scope.show = false;
                $scope.show2= true;
            }, function(err){

            })



    }

    $scope.updateManager = function()
    {


        ManagerFactory.updateManager( $scope.user.idManager, $scope.user)
            .then(function(result){

                $scope.show3= true;

            }, function(err){
                console.log('err :' + err);
            })

    }

    $scope.deleteManager = function(id)
    {
        ManagerFactory.deleteManager(id)
            .then(function(result){

                getManagers();
            })

    }




})