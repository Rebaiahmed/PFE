
/*
 define our controlller
 */

angular
    .module('meanApp')
    .controller('tarifCtrl', function($scope,ReservationService){

        // get the cars

        $scope.voitures = [];
        function getCars()
        {
            ReservationService.getCars().then(function(data){

                $scope.voitures = data.data ;



            }, function(err){
                console.log('err in geting cars :' + err)
            })
        }

        getCars();

    })