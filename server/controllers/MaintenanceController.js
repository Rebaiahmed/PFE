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
    var date = req.body.date_entretien  ;

    console.log('date' + date);
    var  kilometrage_prevu = req.body. kilometrage_prevu ;
    var Voiture_idVoiture = req.body.Voiture_idVoiture;
    var Voiture_Modele_idModele = req.body.Voiture_Modele_idModele ;


    //create it
    Entretient.create({
        nom :nom,
        type:type,
        date_entretien:date,
        kilometrage_prevu:kilometrage_prevu,
        Voiture_idVoiture:Voiture_idVoiture,
        Voiture_Modele_idModele:Voiture_Modele_idModele
    }).then(function(result){

        res.status(200).json(result)
    }).catch(function(err){
        res.status(400).json(err);
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
    var id = req.params.idEntretien ;


    Entretient.findById(id)
        .then(function(entretient){

            if(!entretient){
                res.status(404).json('Entretient NOn trouvée !')
            }else{
                res.json(entretient);
            }


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
    var id = req.params.idEntretien ;


    Entretient.findById(id)
        .then(function(entretient){

            Entretient.destroy({
                    where: {
                        'idEntretien': id
                    }
                })

                res.json({"message": "entretient deleted  !"})

        }).catch(function(err){
            res.json(err);
        })



}






/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------UPDATE SINGLE MAINTENANCE OPERATION--------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */







exports.updateEntretient = function(req,res)
{

//find it
    Entretient.findById(req.params.idEntretien)
        .then(function (entretient) {

            console.log('date' + req.body.date_entretien)
            if (entretient) {


                //update it !!
               Entretient.update({
                   nom :req.body. nom,
                   type:req.body.type,
                   date_entretien:req.body.date_entretien,
                   kilometrage_prevu:req.body.kilometrage_prevu,
                   Voiture_idVoiture:req.body.Voiture_idVoiture,
                   Voiture_Modele_idModele:req.body.Voiture_Modele_idModele

                }, {
                    where: {
                        'idEntretien': req.params.idEntretien
                    }
                }).then(function (entretient, err) {
                    if (err) {
                        console.log(err)
                        res.status(400).json(err);
                    }
                    else {

                        res.status(200).json(entretient);
                    }

                })//end of update


            }

            else {
                res.status(400).json({'msg': 'Entretient Non Trouvée'});
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
