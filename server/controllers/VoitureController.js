var models  = require('../models/index.js');

var Voiture = models.Voiture ;
var Entretient = models.Entretient ;
var Modele = models.Modele ;
var Reservation = models.Reservation;


/*
 we will export the CRUD OPERATIONS
 */


exports.postCar = function(req,res){


    // get the data from the req object
    // a modifier !!
    // a mdofier pour la voiture
    var  numChassee  = req.body.numChassee ;
    var numImmatricule = req.body.numImmatricule ;
    var kilometrage = req.body.kilometrage ;
    var couleur = req.body.couleur ;
    var photo = req.body.photo ;
    var nbPlaces = req.body.nbPlaces ;
    var categorie = req.body.categorie;
    var prixLocation = req.body.prixLocation ;
    var disponibilite = req.body.disponibilite ;
    var date_assurance = req.body.date_assurance ;
    var date_vignette = req.body.date_vignette ;
    var date_visite_tecknique = req.body.date_visite_tecknique ;
    var Modele_idModele = req.body.Modele_idModele ;
    console.log('the id modele is ' + Modele_idModele);

   //save the new Car in teh databae

    Voiture.create({
        num_chassee :numChassee,
        num_immatricule :numImmatricule,
        kilometrage :kilometrage,
        couleur : couleur,
        nb_places : nbPlaces,
        categorie :categorie,
        prix_location :prixLocation,
        disponibilitée :disponibilite,
        date_assurance :date_assurance,
        date_vignette :date_vignette,
        date_visite_tecknique :date_visite_tecknique,
        Modele_idModele :Modele_idModele




    }).then(function(result){

        if(!result){  res.send('erreur dans le sauvegarde du voiture !')}
    else
        {
            res.json(result);
        }
        })//end of then


}




/*
 -_-_-_-_-_-_-__-_-__-_-_-_-_-_-_-_-__-_-
 ___________---------_________--------_-_-_-_-_-_
 -_-_-_-_-_-_-_-*-_-*_-_-_-_*_-_-_-_*_-_-_*_-_-_*_-_-
 */







exports.getModels = function(req,res)
{

    Modele.findAndCountAll()
        .then(function(result){
            res.json(result.rows);
        })



}
/*
 -_-_-_-_-_-_-__-_-__-_-_-_-_-_-_-_-__-_-
 ___________---------_________--------_-_-_-_-_-_
 -_-_-_-_-_-_-_-*-_-*_-_-_-_*_-_-_-_*_-_-_*_-_-_*_-_-
 */


exports.postModele = function(req,res)
{

    var marque = req.body.marque;
    var nom = req.body.nom ;
    var carburant = req.body.carburant;
    var puissance = req.body.puissance ;
    var prixGPS = req.body.prixGPS ;
    var prixChaisse = req.body.prixChaisse ;
    var  prixChauffeur = req.body. prixChauffeur ;

    Modele.create({

        nom : nom,
        marque : marque,
        carburant :carburant,
        puissance : puissance,
        prixGPS : prixGPS,
        prixChaisse : prixChaisse,
        prixChauffeur : prixChauffeur
    })
        .then(function(result){
            res.json(result);
        })


}





exports.getCars = function(req,res)
{

    Voiture.findAndCountAll({
        include:[
            {model:Modele},{model:Entretient},{model:Reservation}
        ]

    }).then(function(result){
        if(!result)
        {
            res.send('error in getting cars!')
        }
        else{
            res.json(result.rows);
        }


    })

}



/*
 -_-_-_-_-_-_-__-_-__-_-_-_-_-_-_-_-__-_-
 ___________---------_________--------_-_-_-_-_-_
 -_-_-_-_-_-_-_-*-_-*_-_-_-_*_-_-_-_*_-_-_*_-_-_*_-_-
 */


exports.getCar = function(req,res)
{
    // get the id
    //sécursier the paramater
    var id = req.params.idVoiture ;

    Voiture.findById(id,
        {
            include :[
                { model :Modele},{model:Entretient},{model:Reservation}
            ]
        })
        .then(function(car){
               if(!car)
                 {
            res.send('error in getting car with this id ! !')

                   }
                 res.json(car);
          })
        .catch(function(){
            console.log('err ! ctach in car !')

        })


}



/*
 -_-_-_-_-_-_-__-_-__-_-_-_-_-_-_-_-__-_-
 ___________---------_________--------_-_-_-_-_-_
 -_-_-_-_-_-_-_-*-_-*_-_-_-_*_-_-_-_*_-_-_*_-_-_*_-_-
 */





exports.deleteCar = function(req,res)
{
    // get the id
    var id = req.params.idVoiture ;


    // check the id form front end before the backend
          Voiture.findById(id).
              then(function(car){
                     if(!car)
                    {
            res.json({'msg': 'Car Not Found !'});

                    }


                 // supprimer la voiture et supprimer les entretien spour cette voiture !!
              Voiture.destroy({
                 where :{
                'idVoiture': id
                      }
               })

        res.json({"message":"car deleted !"})
    })



}




/*
 -_-_-_-_-_-_-__-_-__-_-_-_-_-_-_-_-__-_-
 ___________---------_________--------_-_-_-_-_-_
 -_-_-_-_-_-_-_-*-_-*_-_-_-_*_-_-_-_*_-_-_*_-_-_*_-_-
 */



exports.putCar = function(req,res)
{

    // we must get the new Object
    var id = req.params.idVoiture;
    // we must check the id

    console.log('we will update data from server !')


    //we must find the User whre the id like id


    Voiture.findById(id).then(function (car) {

        if (car) {
            // get the data from the req object
            // a modifier !!
            // a mdofier pour la voiture
            var  numChassee  = req.body.numChassee ;
            var numImmatricule = req.body.numImmatricule ;
            var kilometrage = req.body.kilometrage ;
            var couleur = req.body.couleur ;
            var photo = req.body.photo ;
            var nbPlaces = req.body.nbPlaces ;
            var categorie = req.body.categorie;
            var prixLocation = req.body.prixLocation ;
            var disponibilite = req.body.disponibilite ;
            var date_assurance = req.body.date_assurance ;
            var date_vignette = req.body.date_vignette ;
            var date_visite_tecknique = req.body.date_visite_tecknique ;
            var Modele_idModele = req.body. Modele_idModele ;


            console.log('the price willl be from' + car.prixLocation + ' ' + prixLocation );
            Voiture.update({
                numChassee :numChassee,
                numImmatricule :numImmatricule,
                kilometrage :kilometrage,
                couleur : couleur,
                nbPlaces : nbPlaces,
                categorie :categorie,
                prixLocation :prixLocation,
                disponibilitée :disponibilite,
                date_assurance :date_assurance,
                date_vignette :date_vignette,
                date_visite_tecknique :date_visite_tecknique,
                Modele_idModele :Modele_idModele

            }, {
                where: {
                    'idVoiture': id
                }
            }).then(function (car, err) {
                if (err) {
                    console.log(err)
                    res.json(err);
                }
                else {
                    console.log('the new car is' + car);

                    res.json(car);
                }

            })


        }

        else {
            res.json({'msg': 'Car Not Found !'});
        }

    })//end findByid



}



/*
 -_-_-_-_-_-_-__-_-__-_-_-_-_-_-_-_-__-_-
 ___________---------_________--------_-_-_-_-_-_
 -_-_-_-_-_-_-_-*-_-*_-_-_-_*_-_-_-_*_-_-_*_-_-_*_-_-
 */



exports.historyCar = function(req,res)
{
    // in this method we will select all the locations for this car





}



/*
 -_-_-_-_-_-_-__-_-__-_-_-_-_-_-_-_-__-_-
 ___________---------_________--------_-_-_-_-_-_
 -_-_-_-_-_-_-_-*-_-*_-_-_-_*_-_-_-_*_-_-_*_-_-_*_-_-
 */




// notification for the maintenance car







/*
-_-_-_-_-_-_-__-_-__-_-_-_-_-_-_-_-__-_-
___________---------_________--------_-_-_-_-_-_
-_-_-_-_-_-_-_-*-_-*_-_-_-_*_-_-_-_*_-_-_*_-_-_*_-_-
 */