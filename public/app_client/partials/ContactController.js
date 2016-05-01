
/*
 define our controlller
 */

angular
    .module('meanApp')
    .controller('ContactCtrl', function($scope,$http){


        $scope.data ={};

        $scope.sendMail = function()
        {


            console.log(JSON.stringify($scope.data));

            $http.post('/auth/client/sendMail',$scope.data)
                .then(function(res){
                    console.log('success !' + JSON.stringify(res));



                }, function(err){
                    console.log('err' + err);
                })

        }

    })