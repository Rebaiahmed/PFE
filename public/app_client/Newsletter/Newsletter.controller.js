
angular
    .module('meanApp')
    .controller('newsletter', function($scope,$http,notify){



        //itnitilaize l'email
        $scope.data ;


        $scope.sendEmail = function()
        {



            $http.post('/auth/client/newsletter', $scope.data)
                .then(function (res) {
                    console.log('success !');
                    notify('email envoyée avec succes !')



                }, function (err) {
                    console.log('err' + err);
                })
        }

    })