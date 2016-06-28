

angular
    .module('meanApp').directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });
/*
 define our controlller
 */

angular
    .module('meanApp')
    .controller('chatCtrl', function($scope,$http,notify,Socket, Authentication,$state){

$scope.cncte= false;
        $scope.msgAdmin =[];
        $scope.messages =[];

        $scope.currentuser = Authentication.currentUser();

        console.log('User' + JSON.stringify( $scope.currentuser));
        Socket.on('client', function(){
            console.log('admin connecte !');
            $scope.cncte = true;

            console.log('cncte est ' + $scope.cncte);
            $scope.$watch('cncte', function() {
               $scope.cncte = true;
            })
        })







        //Pour chatter avec l'admin

        $scope.goChat = function()
        {
            console.log('teh currenUser is ' + JSON.stringify(Authentication.currentUser()));

            if(angular.equals(Authentication.currentUser(),{}))
            {
                $state.go('login');
            }
            else{
                $state.go('Chat');
            }



        }












        $scope.sendMsg = function(msg)
        {

            console.log('we will send msg' + $scope.msg + ' ' + msg);
            $scope.messages.push({"user":$scope.currentuser.nom,"msg": msg});
            Socket.emit('client_message',{"user":$scope.currentuser.nom,"msg": msg});
            $scope.msg="";
            msg ="";

        }
        Socket.on('client_recive', function(msg){
            console.log('we recived from admin' + msg);
            $scope.messages.push({"user":"admin",'msg':msg})

        })


    })
