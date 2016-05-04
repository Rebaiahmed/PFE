
/*
 define our controlller
 */

angular
    .module('meanApp')
    .controller('ContactCtrl', function($scope,$http,notify){


        $scope.data ={};

        $scope.sendMail = function()
        {




            console.log(JSON.stringify($scope.data));

           $http.post('/auth/client/sendMail',$scope.data)
                .then(function(res){



                   notify("Votre Message a éte envoyée aves Succes");
                    $scope.data ={};



                }, function(err){
                    console.log('err' + err);
                })

        }

    })