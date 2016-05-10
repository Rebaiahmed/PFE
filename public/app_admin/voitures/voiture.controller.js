

/*
 _-_-_-_-_-_-_-_-_-_-_-CAR CTRL-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
 */


angular
    .module('adminApp').controller('voituresController', function($scope,VoitureFactory,modeleFactory,$state,notify) {









    // une variable pour vérfiier la formulaire lors de l'envoi
    $scope.submitted = false ;


    //une variable pour vérifier
    $scope.submitted2 = false ;




    //liste des voiture
    $scope.cars=[];

    //initializer l'object voiture
    $scope.car ={};

    //pour travailer avec une nouvelle voiture
    $scope.newCar = {};

    //pour afficher ou cacherle formulaire du modéle
    $scope.show = false ;


    //l'objet du nouveau modéle
    $scope.newModele = {};

    //initializer les prix GP, chauffeur , bébe
    $scope.newModele.prixGPS = 25;
    $scope.newModele.prixChaisse =25;
    $scope.newModele.prixChauffeur = 25;

    // la liste des modéles
    $scope.models = [];
    //pour récuper la liste des chiffres d'affires d'apres le serveur
    $scope.chiffreAffaire =[];


    //show hide la formulaire d'ajout ou d'edit d'une voiture
    $scope.carAdd = false;


    /*
     _-_-_-_-_-_-_-_-_-_-_-__--_-_
     -_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
     _--__-_-_-_-_-_-_-__-_---------------------_-_-__-_-_-_-_
     */


    $scope.getAdd = function()
    {
        //ici est une méthode pour afficher la formulaire a chaque clic

        $scope.carAdd = ! $scope.carAdd;
    }


    /*
     _-_-_-_-_-_-_-_-_-_-_-__--_-_
     -_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
     _--__-_-_-_-_-_-_-__-_---------------------_-_-__-_-_-_-_
     */


    //est une fonction pour afficher ou hide le formulaire d'ajout d 'un nouveau modéle
    $scope.change = function()
    {
        $scope.show = ! $scope.show;
    }




    //récuper les modeles
    modeleFactory.getModeles()
        .success(function(data){
            $scope.models = data;

        })




    /*
     _-_-_-_-_-_-_-_-_-_-_-__--_-_
     -_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
     _--__-_-_-_-_-_-_-__-_---------------------_-_-__-_-_-_-_
     */

//une fonction pour récuperrer toutess les voitures


    function getCars()
    {
        VoitureFactory.getCars()
            .then(function(data){

                $scope.cars=data.data[0] ;
                $scope.chiffreAffaire=data.data[1];



            }, function(err){
                console.log('err' + err);
            })
    }






    getCars(); // load the cars




    /*
     _-_-_-_-_-_-_-_-_-_-_-__--_-_
     -_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
     _--__-_-_-_-_-_-_-__-_---------------------_-_-__-_-_-_-_
     */



    //ue fonction pour faire la mise a jour d 'une voiture

    $scope.updateCar = function(id,car)
    {



        VoitureFactory.updateCar(id,car)
            .then(function(data){


                //refraishir la formulaire d'edit
                $scope.getAdd();

            }, function(err){
                console.log('err !'+err);
            })




    }


    /*
     _-_-_-_-_-_-_-_-_-_-_-__--_-_
     -_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
     _--__-_-_-_-_-_-_-__-_---------------------_-_-__-_-_-_-_
     */



    //ajouter uen nouvelle voiture

    $scope.addCar = function()
    {



        $scope.submitted= true;

        if($scope.newCar.idVoiture!=null)
        {



            //tets si la formulaire es t valide

            if($scope.CarForm.$valid) {



                $scope.updateCar($scope.newCar.idVoiture, $scope.newCar);

                notify('la Voiture a été mise a jour avec succés');

                getCars();
                //refraishir la formulaire d'edit


            }//end of if form valid
        }
        else {




            if($scope.CarForm.$valid) {
                VoitureFactory.postCar($scope.newCar)
                    .then(function (response) {

                        notify('la voiture est bien ajoutée ');
                        getCars();

                        //refraishir la formulaire d'edit
                        $scope.getAdd();


                    }, function (err) {
                        console.log('err !' + err);
                    })

            }//end of if form valid

        }
    }




    /*
     _-_-_-_-_-_-_-_-_-_-_-__--_-_
     -_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
     _--__-_-_-_-_-_-_-__-_---------------------_-_-__-_-_-_-_
     */

    /*
     _-_-_-_-_-_-_-_-_-_-_-Ajouter un nouveau modéle-_-_-_-__-_-_-_-_-_-_-_-_-_--_-_-_
     */



    $scope.addModele = function()
    {

        $scope.submitted2= true;



        if($scope.ModeleForm.$valid) {

            modeleFactory.postModele($scope.newModele)
                .then(function (response) {

                    console.log('addes modle success !');

                    $scope.newModele = {};
                    //refraishir la formulaire d'edit
                    $scope.getAdd();


                }, function (err) {
                    console.log('err !' + err);
                })


        }//end of ModeleForm $valid test

    }


    /*
     _-_-_-_-_-_-_-_-_-_-_-__--_-_
     -_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
     _--__-_-_-_-_-_-_-__-_---------------------_-_-__-_-_-_-_
     */


    //une fonction pour supprimer une voiture

    $scope.deleteCar = function(id)
    {


        alert('we will delete thsi car !');
        VoitureFactory.deleteCar(id)
            .then(function(){

                getCars();
                //refraishir la formulaire d'edit
                $scope.getAdd();



            },function(err){
                console.log('err !' +err);
            })
    }




    /*
     _-_-_-_-_-_-_-_-_-_-_-__--_-_
     -_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
     _--__-_-_-_-_-_-_-__-_---------------------_-_-__-_-_-_-_
     */



    //une fonction pour editer la nouvelle voiture

    $scope.editCar = function(id)
    {
        VoitureFactory.getCar(id)
            .then(function(data){


                $scope.car = data.data[0];

                //on va transformer les dates des voitures  ne des objets dates pour pouvoir l'afficher dans les input type date
                $scope.car.date_assurance = new Date($scope.car.date_assurance );
                $scope.car.date_vignette = new Date($scope.car.date_vignette);
                $scope.car.date_visite_tecknique = new Date($scope.car.date_visite_tecknique);

                //le modele newCar va prendre les valuers du voituré récupére
                $scope.newCar = $scope.car;

            },function(err){
                console.log('err !' +err);
            })

        $scope.getAdd();
    }





})



