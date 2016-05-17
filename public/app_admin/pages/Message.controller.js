
angular
    .module('adminApp').directive('ngEnter', function() {
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
angular
    .module('adminApp').controller('MsgController', function($scope,Socket){



        $scope.Online = function()
        {

            Socket.emit('admin_online');


        }

        $scope.msg="" ;
        $scope.msgClient =[];

        $scope.messages =[];
        //envoyer le message

        $scope.sendMsg = function(msg)
        {

    console.log('we will send msg' + $scope.msg + ' ' + msg);

    $scope.messages.push({"user":"admin","msg": msg});

            console.log('messages' + JSON.stringify($scope.messages[0]));
    Socket.emit('admin_message', msg);
            $scope.msg="";
            msg ="";


}



        Socket.on('admin_recive', function(msg){
            console.log('we recived from client' + JSON.stringify(msg));
            $scope.messages.push({"user":msg.user,'text':msg.msg})

        })








    })