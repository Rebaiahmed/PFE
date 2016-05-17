
angular
    .module('adminApp').controller('emailConducteursController', function($scope,$http, $state,notify){
    $scope.show = true ;

    $scope.data ={};
    $scope.submitted = false ;



    $scope.sendMail = function() {

        $scope.submitted = true;




        if ($scope.emailForm.$valid) {

            $http.post('/auth/admin/sendMail', $scope.data)
                .then(function (res) {
                    console.log('success !');
                    notify('email envoyée avec succes !')
                    $state.go('conducteurs');


                }, function (err) {
                    console.log('err' + err);
                })

        }

    }//end form valid


})

