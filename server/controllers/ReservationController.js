//require all the necessary modules

var models  = require('../models/index.js');
var Reservation = models.Reservation ;
var Voiture = models.Voiture ;
var Client = models.Client ;
var Modele = models.Modele ;
var PreReservation = models.PreReservation ;

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

    console.log('the date recived are :' + date_debut + ' ' + date_fin)

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
        Voiture_idVoiture :idVoiture


     })

    //calcul Prix Totale
    Voiture.findById(reservation.Voiture_idVoiture)
        .then(function(car){

console.log('prix totale est : ' +reservation.calculPrixTotale(car.prixLocation) );
            reservation.PrixTotale =reservation.calculPrixTotale(car.prixLocation)
                  reservation.save()
                      .then(function(ss){
                          res.json(ss);
                      })
                      .error(function(err){
                          res.json(err);
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


    //get AlL TEH RESERVATION include the other models
    Reservation.findAll(
        {
            include :[
                {model :Client},
                {model:Voiture},
                {model:Modele}


            ]

        }

    )
        .then(function(locations){
              if(!locations)
                 { res.send('error in getting locations !')}
              else




{

                       res.json(locations);



                   }


         })
        .catch(function(err){
            console.log('error !'+err);
            res.json(err);

        })


}



/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------FIND ALL PRERESERVATIONS---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ----------!!PRERESERVATION  IS a reservation maked by a client and not validated by the manager
 */




exports.getPreReservation = function(req,res)
{


    PreReservation.findAndCountAll(  {
        include :[
            {model :Client},
            {model:Voiture},
            {model:Modele}

        ]
    }).then(function(result){

        res.json(result.rows);

    })



}


/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------DELETE A  PRERESERVATION---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */




exports.deletePreservation = function(req,res)
{




    var idPre = req.params.idPreReservation ;

    console.log('the id of preservatons is :' + idPre);


    PreReservation.findById(idPre)
        .then(function(location){
            if(!location)
            { res.json({'msg': 'Réservation inconnue !'});}

            // a bien améliorer cette code !
            PreReservation.destroy({
                where :{
                    'idReservation' : idPre
                }
            })

            res.json({"message":"Reservation supprimée!"})
        })
        .catch(function(){
            console.log('erreur dans le supprim !')
        })


}





/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------ADD A PRESERVATION---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */



exports.addPreReservation = function(req,res)
{




    //faire appel au socket.io pour notifier l'admi q'un client est inscrit !
    var socketio = req.app.get('socketio');

    console.log('the sokeet is ' + socketio);











    // we msut get the data
var newReservation = req.body;
    console.log('the newReservation is ' + JSON.stringify(newReservation));
    var dateDebut  = newReservation.dateDebut;
    var heureDebut = newReservation.heureDebut;
    var lieuPrise  =newReservation.lieuPrise;
        var dateFin =newReservation.dateFin;
    var  heureFin = newReservation.heureFin;
        var lieuRetour = newReservation.lieuRetour;
    var Voiture_idVoiture = newReservation.Voiture_idVoiture;
        var Voiture_Modele_idModele = newReservation.Voiture_Modele_idModele;
    var Client_idClient = newReservation.Client_idClient;



    var GPS = newReservation.GPS ;
    var Chauffeur = newReservation.Chauffeur;
    var chaiseBaBy = newReservation.chaiseBaBy


    console.log('data recived is :' + dateDebut + ' ' + heureDebut + ' ' + lieuPrise + ' ' + dateFin
    + ' ' + heureFin + '' + lieuRetour + ' id voiture :' + Voiture_idVoiture + 'id modele ' + Voiture_Modele_idModele + 'id client : ' + Client_idClient
    + ' GPS' + GPS + 'ch ' + Chauffeur + ' bébé' + chaiseBaBy);

    PreReservation.create({
        dateDebut  : newReservation.dateDebut,
        heureDebut : newReservation.heureDebut,
        lieuPrise :newReservation.lieuPrise,
        dateFin : newReservation.dateFin,
        heureFin : newReservation.heureFin,
        lieuRetour : newReservation.lieuRetour,
        Voiture_idVoiture : newReservation.Voiture_idVoiture,
        Voiture_Modele_idModele : newReservation.Voiture_Modele_idModele,
        Client_idClient : newReservation.Client_idClient,
        GPS:GPS,
        chaiseBaBy:chaiseBaBy,
        Chauffeur:Chauffeur




    }).then(function(reservation) {

        if (!reservation) {
            res.send("erreur dans les données  du Reservation")
        }
        else {


            socketio.sockets.emit('new_reservation');

            res.json({message: 'succes de création de reservation', data: reservation})
        }

    })//end of create


}






/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------GET A PRESERVATION---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */





exports.saveReservation = function(req,res){


    var newReservation = req.body;
    console.log('the newReservation is ' + JSON.stringify(newReservation));
    var dateDebut  = newReservation.dateDebut;
    var heureDebut = newReservation.heureDebut;
    var lieuPrise  =newReservation.lieuPrise;
    var dateFin =newReservation.dateFin;
    var  heureFin = newReservation.heureFin;
    var lieuRetour = newReservation.lieuRetour;
    var Voiture_idVoiture = newReservation.Voiture_idVoiture;
    var Voiture_Modele_idModele = newReservation.Voiture_Modele_idModele;
    var Client_idClient = newReservation.Client_idClient;

    console.log('data recived is :' + dateDebut + ' ' + heureDebut + ' ' + lieuPrise + ' ' + dateFin
        + ' ' + heureFin + '' + lieuRetour + ' id voiture :' + Voiture_idVoiture + 'id modele ' + Voiture_Modele_idModele + 'id client : ' + Client_idClient)



//les attributs
    Reservation.create({

        dateDebut :dateDebut,
        dateFin :dateFin,
        lieuPrise :lieuPrise,
        lieuRetour :lieuRetour,
        heureDebut :heureDebut,
        heureFin :heureFin,

        Voiture_Modele_idModele :Voiture_Modele_idModele,
        Client_idClient :Client_idClient ,
        Voiture_idVoiture :Voiture_idVoiture


    }).then(function(reservation){

        if(!reservation)
        {
            res.send("erreur dans les données  du Reservation")
        }
        else{
            res.json({message :'succes de création de reservation',data :reservation})
        }



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
        if(!location){res.send('not found')};


        res.json(location);
       })
        .catch(function(err){
            console.log('err !'+err);
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
        { res.json({'msg': 'Reservation not found !'});}

        // a bien améliorer cette code !
            Reservation.destroy({
            where :{
                'idReservation' : id
            }
                          })

        res.json({"message":"Reservation deleted!"})
           })
        .catch(function(err){
            console.log('err'+err);
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
    console.log('the id send is ' + id);


    Reservation.findById(id).then(function (reservation) {

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
            var cloture = req.body.cloture ;

            console.log('id voiture' + idVoiture + ' idClient' + idClient);


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
                    'idReservation': id
                }

            }).then(function (location) {
                res.json(true);
                    })//end of update method*/


        }//end if location

        else { res.json({'msg': 'Reservation non trouvée !'}); }



                     })//end findByid



}




