
angular
    .module('adminApp').controller('clientsController', function($scope,ClientsFactory,$state,locationsFactory
    ,$window,notify){



    $scope.clients=[];
    $scope.client ={};

    $scope.predicate = 'numCin';
    $scope.reverse = true;

        //pour faire le tri
    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    };



        //POur vérifier si le from est envoyée
        $scope.submitted = false ;


        //editer Client
        $scope.ClientEdit= false;

        $scope.ClientDetails =false;

        $scope.chiffreAffaire =[];



    function getClients()
    {
        ClientsFactory.getClients()
            .then(function(data){

                $scope.clients =data.data[0] ;

                $scope.chiffreAffaire = data.data[1];

            }, function(err){
                console.log('err' + err);
            })
    }


    getClients();

    /*

     */


    $scope.updateClient = function()
    {

         $scope.submitted = true ;



        console.log('form valid' + $scope.ClientForm.$valid)

       if($scope.ClientForm.$valid) {

            ClientsFactory.updateClient($scope.client.idClient, $scope.client)
                .then(function (data) {
                    $scope.status = "200 ok !";
                    console.log($scope.status);


                    notify('Client Modifé avec Succeés !')
                    $scope.ClientEdit= false;

                }, function (err) {
                    console.log('err  !' + err);
                })

            //refresh !!!!

            getClients();


        }//end if !!

    }



    /*

     */
    $scope.deleteClient = function(id)
    {



        ClientsFactory.deleteClient(id)
            .then(function(){
                $scope.status ="deleted client!";
                console.log($scope.status);


                notify('Client Supprimée avec Succeés !')
                // we msut refresh the list
                getClients();



            },function(err){
                console.log('err !' +err);
            })
    }


    /*

     */

        /*

         */

    $scope.editClient = function(id)
    {


        // rechercher le client
        for(var i=0;i<$scope.clients.length;i++)
        {
            if($scope.clients[i].idClient==id)
            {
                $scope.client = $scope.clients[i];
                $scope.client.datePermis = new Date( $scope.client.datePermis);

                break;
            }
        }



        $scope.ClientEdit= true;
        $scope.ClientDetails= false;
    }




        /*

         */

    /*


     */





    $scope.detailsClient =function(id)
    {

        $scope.chiffreClient = 0;
        //Parcourir cette tableau
        for(var j=0;j<$scope.chiffreAffaire.length;j++)
        {
            if($scope.chiffreAffaire[j].idClient==id)
            {
                $scope.chiffreClient= $scope.chiffreAffaire[j].prixTT;

                break;
            }
        }//end for


        $scope.ClientDetails= true;
        //$scope.ClientEdit = false;
        // serahc the client
        for(var i=0;i<$scope.clients.length;i++)
        {
            if($scope.clients[i].idClient==id)
            {
                $scope.client = $scope.clients[i];
                $scope.client.datePermis = new Date( $scope.client.datePermis);

                break;
            }
        }



    }

        /*

         */


    /*

     */




    $scope.Reservation_En_Cours = function(client)
    {
        var result = {};
        for(var i=0;i<client.Reservations.length;i++)
        {

            console.log("date fin " +  JSON.stringify(client.Reservations[i].dateFin));
            console.log("date now " +  JSON.stringify(new Date()));
            console.log("result :" + (new Date(client.Reservations[i].dateFin)>new Date()) );

            if(   (new Date(client.Reservations[i].dateFin)>new Date()) )
            {

                result = client.Reservations[i] ;
                console.log(result);
                break ;
            }
            else{
                console.log('not found !');
            }

        }

        if(result=={})
        {
            return "nothing"
        }

        return result;


    }






})

















angular
    .module('adminApp').controller('emailClientsController', function($scope,$http, $state, notify){
    $scope.show = true ;
    $scope.submitted = false ;

    $scope.data ={};

    $scope.sendMail = function() {

        $scope.submitted = true;




        if ($scope.emailForm.$valid) {

            $http.post('/auth/admin/sendMail', $scope.data)
                .then(function (res) {

                    $state.go('clients');

                    notify('email envoyé avec succées !')


                }, function (err) {
                    console.log('err' + err);
                })


        }

    }//end if form valid


})