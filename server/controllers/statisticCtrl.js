
var models  = require('../models/index.js');
var Voiture = models.Voiture ;
var Entretient = models.Entretient ;
var Modele = models.Modele ;
var Reservation = models.Reservation;
var Client = models.Client ;
var Contrat = models.Contrat ;
var moment = require('moment');
//calcuuler le chifffre d'affires pour chaque voiture





var car ;
var table = [];
var CARS = [];

/*Voiture.findAndCountAll({
    attributes :['idVoiture'],
    include : {model : Modele}
}).then(function(cars){



    for(var i=0;i<cars.count;i++)
    {


CARS.push(cars.rows[i]);

    }




    return Promise.all(CARS).then(function(cars){
        var i = cars.length;

        console.log('i' + i)

       cars[1].calcul_chiffre_affaire_Par_Mois(Contrat,1, function(chiffre){

            console.log('chiffr' + ' ' + 0 + " " + chiffre + "" );

        }).sync().then(function(){
            console.log('i' + i);
        })



    })



}).catch(function(err){
    console.log('err' + JSON.stringify(err));
})*/















exports.getCarsChiffreAffaire = function(req,res)
{
res.json('ok!');
}










