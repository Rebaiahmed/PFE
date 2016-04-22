//require all the necessary modules
var models  = require('../models/index.js');
var Entretient = models.Entretient ;
var Voiture = models.Voiture ;
var Modele = models.Modele ;




/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE ADD METHOD---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */



exports.addMaintenance= function(req,res){


    // get the data from the req object
    var  nom = req.body. nom;
    var  type = req.body.type ;
    var date = req.body.date  ;
    var  kilometrage_prevu = req.body. kilometrage_prevu ;
    var Voiture_idVoiture = req.body.Voiture_idVoiture;


    //create it
    Entretient.create({
        nom :nom,
        type:type,
        date:date,
        kilometrage_prevu:kilometrage_prevu,
        Voiture_idVoiture:Voiture_idVoiture
    }).then(function(result){
        res.json(result)
    }).catch(function(err){
        res.json(err);
    })

}




/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------GET ALL THE OPEARTIONS METHODS--------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */

exports.getEntretients = function(req,res)
{

    Entretient.findAll(
        {
            include :[
                {model:Voiture},

            ],

        }
    )
        .then(function(entretients){


                res.json(entretients);


        })
        .catch(function(err){
            console.log('err entretients ' + err);
            res.json(err);
        })


}




/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------GET SINGLE MAINTENANCE OPERATION--------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */

exports.getEntretient = function(req,res)
{
    // get the id
    var id = req.params.idEntretient ;


    Entretient.findById(id)
        .then(function(entretient){

                res.json(entretient);
        }).catch(function(err){
            res.json(err);
        })


}




/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------GET SINGLE MAINTENANCE OPERATION--------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */



exports.deleteEntretient= function(req,res)
{
    // get the id
    var id = req.params.idEntretient ;

    Entretient.findById(id)
        .then(function(entretient){

            Entretient.destroy({
                    where: {
                        'idEntretient': id
                    }
                })

                res.json({"message": "entretient deleted  !"})

        })



}






/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------UPDATE SINGLE MAINTENANCE OPERATION--------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */







exports.updateEntretient = function(req,res)
{

    // we must get the new Object
    var id = req.params.idEntretient;


//find it
    Entretient.findById(id)
        .then(function (entretient) {

            if (entretient) {


                // get the data from the req object
                var  nom = req.body. nom;
                var  type = req.body.type ;
                var date = req.body.date  ;
                var  kilometrage_prevu = req.body. kilometrage_prevu ;
                var Voiture_idVoiture = req.body.Voiture_idVoiture;

                //update it !!
               Entretient.update({
                   nom :nom,
                   type:type,
                   date:date,
                   kilometrage_prevu:kilometrage_prevu,
                   Voiture_idVoiture:Voiture_idVoiture

                }, {
                    where: {
                        'idEntretient': id
                    }
                }).then(function (entretient, err) {
                    if (err) {
                        console.log(err)
                        res.json(err);
                    }
                    else {

                        res.json(entretient);
                    }

                })//end of update


            }

            else {
                res.json({'msg': 'Client  Not Found !'});
            }

        })//end findById



}




/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------UPDATE SINGLE MAINTENANCE OPERATION--------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */



exports.getEntretientCar = function(req,res)
{
    var idVoiture = req.params.idVoiture ;

    Entretient.findAll({
        where :{
            'Voiture_idVoiture' :idVoiture
        }
    })
        .then(function(entretients){

            res.json(entretients);
        })

}
