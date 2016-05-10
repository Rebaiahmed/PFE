angular
    .module('adminApp').controller('statistciCtrl', function ($scope,$http) {

    $scope.carsChiffreAffairs = [];
    $scope.clientsStatus =[];





    $scope.myChartObject = {};


    $scope.myChartObject.type = "ColumnChart";


    $scope.data = [1500,1500,4500,2600]


    //service1 for cars
    $http.get('/auth/admin/statiscCars')
        .then(function(data){

            $scope.carsChiffreAffairs = data.data;


            var rowsCar =[];

            //remplir les ligne sici



            var rows1 =[];





            rows= [

                {c: [
                    {v: $scope.carsChiffreAffairs[0].car.Modele.nom + " " + $scope.carsChiffreAffairs[0].car.Modele.marque },
                    {v:  $scope.carsChiffreAffairs[0].chiffre_affaire},
                ]},

                {c: [
                    {v: $scope.carsChiffreAffairs[1].car.Modele.nom + " " + $scope.carsChiffreAffairs[1].car.Modele.marque},
                    {v: $scope.carsChiffreAffairs[1].chiffre_affaire}
                ]},
                {c: [
                    {v: $scope.carsChiffreAffairs[2].car.Modele.nom + " " + $scope.carsChiffreAffairs[2].car.Modele.marque},
                    {v: $scope.carsChiffreAffairs[2].chiffre_affaire},
                ]},
                {c: [
                    {v: $scope.carsChiffreAffairs[3].car.Modele.nom + " " + $scope.carsChiffreAffairs[3].car.Modele.marque},
                    {v: $scope.carsChiffreAffairs[3].chiffre_affaire},
                ]},
                {c: [
                    {v: $scope.carsChiffreAffairs[4].car.Modele.nom + " " + $scope.carsChiffreAffairs[4].car.Modele.marque},
                    {v: $scope.carsChiffreAffairs[4].chiffre_affaire},
                ]},
                {c: [
                    {v: $scope.carsChiffreAffairs[5].car.Modele.nom + " " + $scope.carsChiffreAffairs[5].car.Modele.marque},
                    {v: $scope.carsChiffreAffairs[5].chiffre_affaire},
                ]},
                {c: [
                    {v: $scope.carsChiffreAffairs[6].car.Modele.nom + " " + $scope.carsChiffreAffairs[6].car.Modele.marque},
                    {v: $scope.carsChiffreAffairs[6].chiffre_affaire},
                ]},
                {c: [
                    {v: $scope.carsChiffreAffairs[7].car.Modele.nom + " " + $scope.carsChiffreAffairs[7].car.Modele.marque},
                    {v: $scope.carsChiffreAffairs[7].chiffre_affaire},
                ]},
                {c: [
                    {v:$scope.carsChiffreAffairs[8].car.Modele.nom + " " + $scope.carsChiffreAffairs[8].car.Modele.marque},
                    {v: $scope.carsChiffreAffairs[8].chiffre_affaire},
                ]},
                {c: [
                    {v: $scope.carsChiffreAffairs[9].car.Modele.nom + " " + $scope.carsChiffreAffairs[9].car.Modele.marque},
                    {v: $scope.carsChiffreAffairs[9].chiffre_affaire},
                ]},

                {c: [
                    {v: $scope.carsChiffreAffairs[10].car.Modele.nom + " " + $scope.carsChiffreAffairs[10].car.Modele.marque},
                    {v: $scope.carsChiffreAffairs[10].chiffre_affaire},
                ]},
            ]










            $scope.myChartObject.data = {"cols": [
                {id: "t", label: "Topping", type: "string"},
                {id: "s", label: "Recette", type: "number"}
            ], "rows": rows
            };




            //function err

        }, function(err){
            console.log('err' + err);
        })

    $scope.myChartObject.options = {
        'title': "Chiffre d'affaires"
    };


    //-__--_-_-_-_-__-_--_-_-_-_-_--_-_-_-_-_-_-__
    /*
     _-_-_-_-_-_-_-_-_-_--__-_-_-_-_-_-_
     _-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-
     _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
     */





    $scope.myChartObject2 = {};

    $scope.myChartObject2.type = "ColumnChart";

    $http.get('/auth/admin/statiscClient')
        .then(function (data) {

            $scope.clientsStatus = data.data



            /*
             get the data
             */
            $scope.myChartObject2.data = {"cols": [
                {id: "t", label: "Topping", type: "string"},
                {id: "s", label: "Professionnel", type: "number"},
                {id: "s", label: "Particulier", type: "number"}
            ], "rows": [
                {c: [
                    {v: "Particuiler"},
                    {v:  0},
                    {v: $scope.clientsStatus["particulier"]},

                ]},

                {c: [
                    {v: "Professionnel"},
                    {v:  $scope.clientsStatus["professionel"]},
                    {v: 0}
                ]},









            ]};

            $scope.myChartObject2.options = {
                'title': "Clients"
            };




        }, function (err) {
            console.log('err' + err);
        })






});
