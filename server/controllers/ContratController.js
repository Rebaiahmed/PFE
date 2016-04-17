var models  = require('../models/index.js');

var Contrat = models.Contrat ;
var Reservation =models.Reservation;

/*
 we will export the CRUD OPERATIONS
 */



/*
 -_-_-_-_-_-_-__-_-__-_-_-_-_-_-_-_-__-_-
 ___________---------_________--------_-_-_-_-_-_
 -_-_-_-_-_-_-_-*-_-*_-_-_-_*_-_-_-_*_-_-_*_-_-_*_-_-
 */

exports.generateContrat = function(req,res)
{



    var Reservation_Client_idClient = req.body.Reservation_Client_idClient;
    var Reservation_Voiture_Modele_idModele = req.body.Reservation_Voiture_Modele_idModele ;
    var Reservation_idReservation = req.body.Reservation_idReservation ;

    var kilometrageDebut = req.body.kilometrageDebut;


    var tva = req.body.tva ;
    var prixHt = req.body.prixHt ;
    var prixTT = req.body.prixTT ;


    var Acompte = req.body.Acompte ;
    var Reste = req.body.Reste ;
    var modePayement = req.body.modePayement ;
    var penaliteJour = req.body.penaliteJour ;
    var dureeRetard = req.body.dureeRetard ;
    var totaleRetard = req.body.totaleRetard ;


    //prolongation
    var date_fin_prolngation = req.body.date_fin_prolngation ;
    var date_debut_prolngation = req.body.date_debut_prolngation ;




    Contrat.create({
        "idContrat":1,
        "tva" :tva,
        "prixHt" :prixHt,
        "prixTT":prixTT,
        "Acompte" :Acompte,
        "Reste":Reste,
        "modePayement":modePayement,
        "penaliteJour" :penaliteJour,
        "dureeRetard" :dureeRetard,
        "totaleRetard" :totaleRetard,
        "date_fin_prolngation" :date_fin_prolngation,
        "totaleRetard" :totaleRetard,
        "date_fin_prolngation" :date_fin_prolngation,
        "date_debut_prolngation" :date_debut_prolngation,
        "Reservation_Client_idClient" :Reservation_Client_idClient,
        "Reservation_Voiture_Modele_idModele" :Reservation_Voiture_Modele_idModele,
        "Reservation_idReservation" :Reservation_idReservation

    }).then(function(response){
        console.log('saved suucefuly !');
    }).catch(function(err){
        console.log('err' + err);
    })




}




exports.getContrats = function(req,res)
{

    Contrat.findAndCountAll(
        {
            include :[
                {model :Reservation}
            ]
        }
    ).then(function(result){


        res.json(result.rows);

    })

}




exports.getContrat = function(req,res)
{
    var id = req.params.idContrat ;

    Contrat.findById(id).then(function(result){
        res.json(result);
    })

}