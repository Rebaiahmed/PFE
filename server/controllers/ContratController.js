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
    var id_reservation = req.params.id_reservation;
    var kilometrageDebut = req.body.kilometrageDebut;
    var prixHt = req.body.prixHt ;
    var tva = req.body.tva ;
    var Acompte = req.body.Acompte ;
    var Reste = req.body.Reste ;
    var modePayement = req.body.modePayement ;
    var Reservation_idReservation = id_reservation;

    Reservation.findById(id_reservation)
        .then(function(reservation){
            //get the data from the reservation table

            var Reservation_Voiture_Modele_idModele = reservation.Voiture_Modele_idModele;
            var Reservation_Client_idClient = reservation.Reservation_Client_idClient ;


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




