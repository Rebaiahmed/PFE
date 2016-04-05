var models  = require('../models/index.js');

var Reservation = models.Reservation ;
var Voiture = models.Voiture ;
var Client = models.Client ;
var Modele = models.Modele ;

/*
 we will export the CRUD OPERATIONS
 */


exports.postReservation = function(req,res){


    //get the data

    var date_debut = req.body.dateDebut ;
    var date_fin = req.body.dateFin ;
    var lieu_prise = req.body.lieuPrise ;
    var lieu_retour = req.body. lieuRetour ;
    var heure_debut = req.body.heureDebut ;
    var heure_retour = req.body.heureFin ;
    var description = req.body.description ;
    var idModele = req.body.idModele ;
    var idClient = req.body.idClient ;
    var idVoiture = req.body.idVoiture ;


    console.log('we reciebed this data' +
    'dat debut' + date_debut + 'date fin' +
    date_fin + ' ' + lieu_prise + ' ' + lieu_retour
    + ' ' + heure_debut + ' ' + heure_retour + ' ' +
    description + ' ' + idModele + ' ' + idClient + ' ' +
    idVoiture);



//les attributs
    Reservation.create({

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




exports.getReservations = function(req,res)
{


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
                   {res.json(locations);}


         })
        .catch(function(){
            console.log('error !')

        })


}




/*
 -_-_-_-_-_-_-__-_-__-_-_-_-_-_-_-_-__-_-
 ___________---------_________--------_-_-_-_-_-_
 -_-_-_-_-_-_-_-*-_-*_-_-_-_*_-_-_-_*_-_-_*_-_-_*_-_-
 -_-_-_-_-_-_-_-_*-_-_-_*-__-_-*-_-__-*_-_-*-__-*-__-*
 -_-__-_-*-__-_-*_-_-_-*-__-*_-_-*_-_-*_-_-*_-_-*_-_-*_-_-*_-_-
 */




exports.getReservation = function(req,res)
{
    // get the id
    //sécursier le paramétre
    var id = req.params.idReservation ;

    // de meme on va include client et voiture

    Reservation.findById(id,
        {
            include :[
                {model :Client},
                {model:Voiture},
                {model:Modele}

            ]
        })
        .then(function(location){
        if(!location){res.send('erreur dans les réservations')};


        res.json(location);
       })
        .catch(function(){
            console.log('erreur dans findById Reservation !')
        })


}






/*
 -_-_-_-_-_-_-__-_-__-_-_-_-_-_-_-_-__-_-
 ___________---------_________--------_-_-_-_-_-_
 -_-_-_-_-_-_-_-*-_-*_-_-_-_*_-_-_-_*_-_-_*_-_-_*_-_-
 */




exports.deleteReservation= function(req,res)
{
    // get the id for this location
    var id = req.params.idReservation;

    Reservation.findById(id)
        .then(function(location){
        if(!location)
        { res.json({'msg': 'Réservation inconnue !'});}

        // a bien améliorer cette code !
            Reservation.destroy({
            where :{
                'idReservation' : id
            }
                          })

        res.json({"message":"Reservation supprimée!"})
           })
        .catch(function(){
            console.log('erreur dans le supprim !')
        })



}




/*
 -_-_-_-_-_-_-__-_-__-_-_-_-_-_-_-_-__-_-
 ___________---------_________--------_-_-_-_-_-_
 -_-_-_-_-_-_-_-*-_-*_-_-_-_*_-_-_-_*_-_-_*_-_-_*_-_-
 */



exports.putReservation = function(req,res)
{

    // we must get the new Object
    var id = req.params.idReservation;
    // we must check the id


    //we must find the User wehre the id like id


    Reservation.findById(id).then(function (location) {

        if (location) {

            //get the data

            var date_debut = req.body.dateDebut ;
            var date_fin = req.body.dateFin ;
            var lieu_prise = req.body.lieuPrise ;
            var lieu_retour = req.body. lieuRetour ;
            var heure_debut = req.body.heureDebut ;
            var heure_retour = req.body.heureFin ;
            var description = req.body.description ;
            var idModele = req.body.idModele ;
            var idClient = req.body.idClient ;
            var idVoiture = req.body.idVoiture ;


            Reservation.update({

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
            },
                {
                where: {
                    'idReservation': id
                }

            }).then(function (location) {
                res.json(true);
                    })


        }//end if location

        else { res.json({'msg': 'Reservation non trouvée !'}); }



                     })//end findByid



}




