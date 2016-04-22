//require all the necessary modules


var models  = require('../models/index.js');
var Voiture = models.Voiture ;
var Entretient = models.Entretient ;
var Modele = models.Modele ;
var Reservation = models.Reservation;
var moment = require('moment');




/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE ADD METHOD---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */




exports.addCar = function(req,res){


//get the data to create a car
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


   //save the new Car in teh database

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
        })//end of create


}



/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE ADD METHOD---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */






exports.getModels = function(req,res)
{

    Modele.findAndCountAll()
        .then(function(result){
            res.json(result.rows);
        })



}






/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE ADD METHOD---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */



exports.addModele = function(req,res)
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




/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE ADD METHOD---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */


exports.findCars = function(req,res)
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



            console.log( JSON.stringify(result.rows.length));
            var tableChiffres=[];
            var  chiffrTotale = 0;
            var car ;
            for(var i=0;i<result.rows.length;i++)
            {
                car = result.rows[i];
                console.log(JSON.stringify(car.Reservations.length));


                for(var j=0;j<car.Reservations.length;j++) {





                    var dDdebut = moment(JSON.stringify(car.Reservations[j].dateDebut), 'YYYY-MM-DD HH:mm');
                    var dFin = moment(JSON.stringify(car.Reservations[j].dateFin), 'YYYY-MM-DD HH:mm');
                    var diff =dFin.diff(dDdebut, 'days')
                    console.log('Difference is ', dFin.diff(dDdebut, 'days'), 'days' );
                    chiffrTotale+= car.prixLocation *(diff);
                    console.log('chiffer affaire will be ' + chiffrTotale + ' fo car' + JSON.stringify(car.idVoiture));

                }
                //add it to the table
                tableChiffres.push(chiffrTotale);

                chiffrTotale=0;

            }








     console.log('' + tableChiffres)













            res.json([result.rows,tableChiffres]);
        }


    })

}





/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE ADD METHOD---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */




exports.getCars_Client = function(req,res)
{

    Voiture.findAndCountAll({
        include:[
            {model:Modele,  attributes:['nom','marque','puissance','prixGPS','prixChaisse','prixChauffeur','carburant']}
        ],
        attributes: ['idVoiture','numImmatricule','photo','nbPlaces','categorie','prixLocation','Modele_idModele']

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
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE ADD METHOD---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */





exports.getCar = function(req,res)
{









    //get the id

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

            else {
                   var tableChiffres=[];
                   var  chiffrTotale = 0;
                   for(var i=0;i<car.Reservations.length;i++) {

                       var dDdebut = moment(JSON.stringify(car.Reservations[i].dateDebut), 'YYYY-MM-DD HH:mm');
                       var dFin = moment(JSON.stringify(car.Reservations[i].dateFin), 'YYYY-MM-DD HH:mm');
                       var diff =dFin.diff(dDdebut, 'days')
                       console.log(i +'Difference is ',typeof dFin.diff(dDdebut, 'days'), 'days' );
                       chiffrTotale+= car.prixLocation *(diff);
                       console.log('chiffer affaire will be ' + chiffrTotale);
                       tableChiffres[0]=chiffrTotale;
                   }

        console.log(tableChiffres)
                 res.json([car,{"chiffr":12}]);


               }
          })
        .catch(function(err){
            console.log('err ! ctach in car !' + err)

        })


}









/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE ADD METHOD---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
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
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE ADD METHOD---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */


exports.updateCar = function(req,res)
{

    // get the id
    var id = req.params.idVoiture;



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
            }).then(function (idcar, err) {
                if (err) {
                    console.log(err)
                    res.json(err);
                }
                else {


                    res.json({
                        "idNewCar" :id
                    });
                }

            })


        }

        else {
            res.json({'msg': 'Car Not Found !'});
        }

    })//end findByid



}



/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE ADD METHOD---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */








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