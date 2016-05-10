var models  = require('../models/index.js');

var Facture = models.Facture ;
var Contrat = models.Contrat ;

/*
 we will export the CRUD OPERATIONS
 */



//a modifier car la facture dépend du contrat
exports.generateFacture = function(req,res){

var id_contrat = req.params.id_contrat;
    Contrat.findById(id_contrat)
        .then(function(contrat){


var montantTT = 0 ;

            Facture.create({
                tva : contrat.tva,
                prixHt :contrat.prixHt,
                montantTT :montantTT

            }).then(function(facture){

                if(!facture)
                {
                    res.send('erreur dans le sauvegarde des factures !')


                }else
                {
                    res.json({message :'Facture crée avec succes!',data :facture})
                }
            })



        })





}




exports.getFactures = function(req,res)
{

    Facture.findAndCountAll()
        .then(function(factures){
        if(!factures)
        {
            res.send('error in getting bills !')

        }
        else
        {
            res.json(factures.rows);
        }
    })


}










/*

 */




exports.put = function(req,res)
{

    // we must get the new Object
    var id = req.params.id_facture;
  var tva = req.body.tva ;
    var prixHt = req.body.prixHt ;
    var montantTT = req.body.montantTT;


    Facture.findById(id).then(function (facture) {

        if (facture) {


            Facture.update({
                tva :tva,
                prixHt:prixHt,
                montantTT :montantTT

            }, {
                where: {
                    'idFacture': id
                }
            }).then(function (facture, err) {
                if (err) {
                    console.log(err)
                    res.json(err);
                }
                else {

                    res.json(facture);
                }

            })


        }

        else {
            res.json({'msg': 'Facture Not Found !'});
        }

    })//end findByid


}





exports.postFacture = function(req,res)
{

    var tva = req.body.tva ;
    var prixHt = req.body.prixHt;
    var prixTT = req.body.prixTT;
    var Contrat_idContrat =req.body.Contrat_idContrat;

    console.log('data is ' + Contrat_idContrat + ' ' + prixTT+ ' ' + prixHt
    + ' ' + tva);

    Facture.create({
        "tva":tva,
        "prixHt":prixHt,
        "prixTT":prixTT,
        "Contrat_idContrat":Contrat_idContrat
    }).then(function(result){
        res.json("facture sauvé"+result)
    }).catch(function(err){
        res.json(err)
    })


}







