angular
    .module('adminApp').controller('EntretientsCtrl', function($scope,EntretientFactory, VoitureFactory,$state,notify){



    $scope.cars = [];
    $scope.newEntretient = {};
    $scope.show = false ;

    $scope.shwoUpdate = false ;



    function getCars()
    {
        VoitureFactory.getCars()
            .then(function(data){


                $scope.cars=data.data[0] ;
                for (var i = 0; i < $scope.cars.length; i++) {
                    $scope.cars[i].date_assurance = new Date($scope.cars[i].date_assurance);
                    $scope.cars[i].date_visite_tecknique = new Date($scope.cars[i].date_visite_tecknique);
                    $scope.cars[i].date_vignette = new Date($scope.cars[i].date_vignette);


                }



            }, function(err){
                $scope.message ="enable to load data !" + err;
            })
    }


    getCars();







    $scope.update = function(idEntretient,entretient)
    {


        EntretientFactory.updateEntretient(idEntretient,entretient)
            .then(function(result)
            {
                console.log('updated suuccesfuly !');
                $scope.shwoUpdate=true;
                getCars();

            }, function(err){
                console.log('enable to update data !' + err);
            })
    }

    /*
     delee entretient
     */

    $scope.delete = function(idEntretient,entretient)
    {


        EntretientFactory.deleteEntretient(idEntretient)
            .then(function(result)
            {
                console.log('deleted succesfuly !');
                getCars();

            }, function(err){
                console.log('err!' + err);
            })
    }


    /*

     */



    $scope.addEntretient = function(idVoiture)
    {
        $scope.newEntretient.Voiture_idVoiture = idVoiture;
        //save it !

        $scope.show=false;
        EntretientFactory.postEntretient($scope.newEntretient)
            .then(function(res){

                $state.show=false;



            }, function(err){
                console.log('err !'+err);
            })

        $scope.newEntretient={};
        getCars();


    }

    /*

     */


    $scope.voirNotifcations = function(c)
    {

        //faire notification avant 1 jour
        var msgAssurance = "Vous avez demain Assurance du voiture";
        var msgVisitetecknique = "Vous avez demain visite tecknique";
        var msgVignette = "Vous avez demain visitte Pour la vignette";
        var msgBougie = "";

        var test = new Date()

        if(c.date_assurance.getDate()-1===test.getDate())
        {
            notify(msgAssurance);

        }

        if(c.date_visite_tecknique.getDay()-1===test.getDay())
        {
            notify(msgVisitetecknique);

        }

        if(c.date_vignette.getDay()-1===test.getDay())
        {
            notify(msgVignette);

        }

        notify("Vous n'avez pour le moment aucun notifcation");

        /*notify(msgAssurance);
         notify(msgAssurance);*/

        //il reste notfication pour le kilometrage

    }




    $scope.save = function(car)
    {
        //update the car

        VoitureFactory.updateCar(car.idVoiture,car)
            .then(function(data){
                console.log('we will update this data')


            }, function(err){
                console.log('err ' + err);
            })

    }

})
