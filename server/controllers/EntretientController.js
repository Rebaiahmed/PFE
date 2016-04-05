var models  = require('../models/index.js');

var Entretient = models.Entretient ;
var Voiture = models.Voiture ;
var Modele = models.Modele ;

/*
 we will export the CRUD OPERATIONS
 */


exports.postEntretient= function(req,res){


    // get the data from the req object
    var  nom = req.body. nom;
    var  type = req.body.type ;

    var date = req.body.date  ;
    var  kilometrage_prevu = req.body. kilometrage_prevu ;
    var Voiture_idVoiture = req.body.Voiture_idVoiture;

    Entretient.create({
        nom :nom,
        type:type,
        date:date,
        kilometrage_prevu:kilometrage_prevu,
        Voiture_idVoiture:Voiture_idVoiture
    })




}




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
        })


}




exports.getEntretient = function(req,res)
{
    // get the id
    var id = req.params.idEntretient ;


    Entretient.findById(id)
        .then(function(entretient){

                res.json(entretient);


        }).catch(function(err){
            console.log('get entretient error' + err);
        })


}







exports.deleteEntretient= function(req,res)
{
    // get the id
    var id = req.params.idEntretient ;

    Entretient.findById(id)
        .then(function(entretient){



            Entretient.destroy({
                    where: {
                        ' idEntretient': id
                    }
                })

                res.json({"message": "entretient deleted  !"})


        })



}













exports.putEntretient = function(req,res)
{

    // we must get the new Object
    var id = req.params.idEntretient;
    // we must check the id


    //we must find the User whre the id like id


    Entretient.findById(id)
        .then(function (entretient) {

            if (entretient) {


                // get the data from the req object
                var  nom = req.body. nom;
                var  type = req.body.type ;

                var date = req.body.date  ;
                var  kilometrage_prevu = req.body. kilometrage_prevu ;
                var Voiture_idVoiture = req.body.Voiture_idVoiture;

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

                })


            }

            else {
                res.json({'msg': 'Client  Not Found !'});
            }

        })//end findByid



}





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
