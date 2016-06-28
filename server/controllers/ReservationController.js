//require all the necessary modules

var models  = require('../models/index.js');
var Reservation = models.Reservation ;
var Voiture = models.Voiture ;
var Client = models.Client ;
var Modele = models.Modele ;
var moment = require('moment');



/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE ADD METHOD---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */




exports.addReservation = function(req,res){


    //get the data

    var date_debut = req.body.dateDebut ;
    var date_fin = req.body.dateFin ;
    var lieu_prise = req.body.lieuPrise ;
    var lieu_retour = req.body. lieuRetour ;
    var heure_debut = req.body.heureDebut ;
    var heure_retour = req.body.heureFin ;
    var description = req.body.description ;
    var idModele = req.body.idModele ;
    var idClient = req.body.Client_idClient ;
    var idVoiture = req.body.Voiture_idVoiture ;


//create it !
   var reservation =  Reservation.build({

        dateDebut :date_debut,
        dateFin :date_fin,
        lieuPrise :lieu_prise,
        lieuRetour :lieu_retour,
        heureDebut :heure_debut,
        heureFin :heure_retour,
        description :description,
        Voiture_Modele_idModele :idModele,
        Client_idClient :idClient ,
        Voiture_idVoiture :idVoiture,
       etat : "Confirmee"
     })

    //calcul Prix totale
    reservation.calculPrixTotale(idVoiture,Voiture,function(){



        //calcul Nbr jours
        reservation.calculNbrJours(function(){
            //save in database
            reservation.save()
                .then(function(){

                    //send result
                    res.status(200).json(reservation)

                }).catch(function(err){
                    res.status(400).json(err)
                })

        })


    })




}




/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------FIND ALL RESERVATIONS---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */





exports.findReservations = function(req,res)
{

    var etat = req.params.etat ;


    //get AlL TEH RESERVATION include the other models
    Reservation.findAndCountAll({
            where :{
                etat :etat
            },

    include :[
        {model :Client},
        {model:Voiture},
        {model:Modele}


    ]



    }


    )
        .then(function(locations){
             res.json(locations)


         })
        .catch(function(err){
            res.json(err);


        })


}


/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------LES RESERVATIONS EN RETARD---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */



exports.findReservations_Retard = function(req,res)
{

 //a vérifier pour les reservations en retard !!!


    //get AlL TEH RESERVATION include the other models
    Reservation.findAndCountAll({
            where :{
                etat :'En_Cours',
                'dateFin':{
                    $lt:new Date()
                }
            }

        },
        {
            include :[
                {model :Client},
                {model:Voiture},
                {model:Modele}


            ]

        }

    )
        .then(function(locations){
            res.json(locations)


        })
        .catch(function(err){
            res.json(err);
            throw err;


        })


}




/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------LES RESERVATIONS EN RETARD---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */


exports.addPreReservation = function(req,res)
{




    //faire appel au socket.io pour notifier l'admi q'un client est inscrit !
    var socketio = req.app.get('socketio');


    // we msut get the data
var newReservation = req.body;

    var dateDebut  = newReservation.dateDebut;
    var heureDebut = newReservation.heureDebut;
    var lieuPrise  =newReservation.lieuPrise;
        var dateFin =newReservation.dateFin;
    var  heureFin = newReservation.heureFin;
        var lieuRetour = newReservation.lieuRetour;
    var Voiture_idVoiture = newReservation.Voiture_idVoiture;
        var Voiture_Modele_idModele = newReservation.Voiture_Modele_idModele;
    var Client_idClient = newReservation.Client_idClient;

    var Chauffeur = newReservation.Chauffeur;
    var chaiseBaBy = newReservation.chaiseBaBy


    var preservation = Reservation.build({
        dateDebut  : newReservation.dateDebut,
        heureDebut : newReservation.heureDebut,
        lieuPrise :newReservation.lieuPrise,
        dateFin : newReservation.dateFin,
        heureFin : newReservation.heureFin,
        lieuRetour : newReservation.lieuRetour,
        Voiture_idVoiture : newReservation.Voiture_idVoiture,
        Voiture_Modele_idModele : newReservation.Voiture_Modele_idModele,
        Client_idClient : newReservation.Client_idClient,
        chaiseBaBy:chaiseBaBy,
        Chauffeur:Chauffeur,
        etat : "En_Attente"
    })

    //calcul Prix totale
    preservation.calculPrixTotale(Voiture_idVoiture,Voiture,function(){



        //calcul Nbr jours
        preservation.calculNbrJours(function(){
            //save in database
            preservation.save()
                .then(function(){

                    socketio.sockets.emit('new_reservation');

                    res.json({message: 'succes de création de reservation', data: preservation})

                }).catch(function(err){
                    res.status(400).json(err)
                })

        })


    })

}









/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------GET A PRESERVATION---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */



exports.getReservation = function(req,res)
{




    //get the id
    var id = req.params.idReservation ;



    //find By Id to find it
    Reservation.findById(id,
        {
            include :[
                {model :Client},
                {model:Voiture},
                {model:Modele}

            ]
        })
        .then(function(location){
        if(!location){
            res.status(404).json('location non trouvée')
        }else{
            res.json(location);
        }



       })
        .catch(function(err){
           throw err;
        })


}






/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------DELETE A PRESERVATION---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */




exports.deleteReservation= function(req,res)
{
    // get the id for this location
    var id = req.params.idReservation;

    Reservation.findById(id)
        .then(function(location){
        if(!location)
        { res.status(404).json({'msg': 'Reservation not found !'});

        }else{
            // a bien améliorer cette code !
            Reservation.destroy({
                where :{
                    'numReservation' : id
                }
            })

            res.json({"message":"Reservation deleted!"})
        }


           })
        .catch(function(err){

            throw err;
        })



}





/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------UPDATE A RESERVATION---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */



exports.updateReservation = function(req,res)
{

    // get the id
    var id = req.params.idReservation;



    Reservation.findById(id).
        then(function (reservation) {

        if (reservation) {

            //get the data

            var date_debut = req.body.dateDebut ;
            var date_fin = req.body.dateFin ;
            var lieu_prise = req.body.lieuPrise ;
            var lieu_retour = req.body. lieuRetour ;
            var heure_debut = req.body.heureDebut ;
            var heure_retour = req.body.heureFin ;
            var description = req.body.description ;
            var idModele = req.body.idModele ;
            var idClient = req.body.Client_idClient ;
            var idVoiture = req.body.Voiture_idVoiture ;




            Reservation.update({

                dateDebut :date_debut,
                dateFin :date_fin,
                lieuPrise :lieu_prise,
                lieuRetour :lieu_retour,
                heureDebut :heure_debut,
                heureFin :heure_retour,
                description :description,
                cloture :cloture,
                Voiture_Modele_idModele :idModele,
                Client_idClient :idClient ,
                Voiture_idVoiture :idVoiture
            },
                {
                where: {
                    'numReservation': id
                }

            }).then(function (location) {
                res.json(true);
                    })//end of update method*/


        }//end if location

        else {


            res.status(404).json({'msg': 'Reservation non trouvée !'}); }



                     })//end findByid



}






/*
rendre une Réservation cloturee
 */


exports.Reservation_Cloture = function(req,res){



    //dans cette méthode on va mettre 'etat de en cours vers cloturee

    //1) récuérer l'Id

    var id = req.params.idReservation;


    Reservation.findById(id).
        then(function (reservation) {

            if (reservation) {

                Reservation.update({
                       'etat' : 'cloturee'
                    },
                    {
                        where: {
                            'numReservation': id
                        }

                    }).then(function (location) {
                        res.json(true);
                    })//end of update method*/


            }//end if location

            else {


                res.status(404).json({'msg': 'Reservation non trouvée !'}); }



        })//end findByid






}




//En_Cours