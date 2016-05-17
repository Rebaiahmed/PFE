
/*
 define our controlller
 */

angular
    .module('meanApp')
    .controller('profileCtrl', function($scope,$location,Authentication,$http, $window,notify,$state,ReservationService){

        console.log(JSON.stringify(Authentication.getProfile()));

        $scope.user = {};

        console.log('the cureent state is ' + JSON.stringify($state.current.name));



        $scope.reservations =[];

        Authentication.getProfile()
            .success(function(data) {
                console.log('data is' + JSON.stringify(data));
                $scope.user = data;
                function getReservations(idClient)
                {
                    $http.get('/auth/ClientReservations'+ '/'+idClient)
                        .then(function(result){

                            console.log('result of reservations is ' + JSON.stringify(result.data.Reservations));

                            $scope.reservations = result.data.Reservations ;

                        }, function(err){
                            console.log('err ' + err);
                        })

                }

                getReservations($scope.user.idClient);

            })
            .error(function (e) {
                console.log('error in profile ' + JSON.stringify(e));
            });





        $scope.updateProfile = function()
        {



            $http.post('/auth/updateProfile',$scope.user)
                .then(function(result){
                    console.log('update succesfuly !' + JSON.stringify(result));

                    $window.location.reload();//pour rechrager la page

                }, function(err){
                    console.log('err on updating prifle ' + err);
                })

        }








    })