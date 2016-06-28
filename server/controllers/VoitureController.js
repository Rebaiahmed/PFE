//require all the necessary modules


var models  = require('../models/index.js');
var Voiture = models.Voiture ;
var Entretient = models.Entretient ;
var Modele = models.Modele ;
var Reservation = models.Reservation;
var Contrat = models.Contrat;
var moment = require('moment');




/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE ADD METHOD---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */


var multer = require('multer');

//configurer l'objet storage
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {


        fileName = file.originalname
        //cb(null, file.originalname + '-' + Date.now()+ '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        cb(null, file.originalname )
    }
});



var upload = multer({ //multer settings
    storage: storage
}).single('file');





exports.addCar = function(req,res){






    upload(req,res,function(err){

        if(err){

            console.log('err' + err)

        }


        console.log('car' + JSON.stringify(req.body.car));

        //save the new Car in teh database

      Voiture.create({
          numChassee :req.body.car.numChassee,
          numImmatricule :req.body.car.numImmatricule,
          kilometrage_parcouru :req.body.car.kilometrage_parcouru,

            nb_places : req.body.car.nb_places,
            categorie :req.body.car.categorie,
            prix_location :req.body.car.prix_location,
            etat :'libre',
            date_assurance :req.body.car.date_assurance,
            date_vignette :req.body.car.date_vignette,
            date_visite_tecknique :req.body.car.date_visite_tecknique,
            Modele_idModele :req.body.car.Modele_idModele,
            photo : req.body.car.photo




        }).then(function(result){

            console.log('result' + JSON.stringify(result));

            if(!result){  res.status(400).json('erreur dans le sauvegarde du voiture !')}
            else
            {
                res.json({error_code:0,err_desc:null});
            }
        }).catch(function(err){
            console.log('err' + err)
           res.json(err)
        })
    })





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
        }).catch(function(err){
           res.json(err);
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
    var prixChaisse = req.body.prixChaisse ;
    var  prixChauffeur = req.body. prixChauffeur ;

    Modele.create({

        nom : nom,
        marque : marque,
        carburant :carburant,
        puissance : puissance,
        prixChaisse : prixChaisse,
        prixChauffeur : prixChauffeur
    })
        .then(function(result){
            res.json(result);
        }).catch(function(err){

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
            {model:Modele}, {model:Entretient}
        ]

    }).then(function(result){
        if(!result)
        {
            res.status(404).json('Aucune Voiture trouvée !')
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
            res.status(404).json('error in getting cars!')
        }
        else{
            res.json(result.rows);
        }


    }).catch(function(err){
        throw err;
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
                { model :Modele}
            ]
        })
        .then(function(car){
               if(!car)
                 {
            res.status(404).json('error in getting car with this id ! !')

                   }

            else {

             var nbr = 0;


                car.calcul_chiffre_affaire_totale(Contrat,car.idVoiture, function(chifre_affaire){


                    car.Calcul_Nbr_reservations_totale(Reservation,car.idVoiture, function(nbr){
                        res.json({car:car,nbr:nbr,chifre_affaire:chifre_affaire})
                    })




                });





               }
          })
        .catch(function(err){
            console.log('err ! !' + err)
            res.json(err);

        })


}









/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE DELETE METHOD---------------------------
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
            res.status(404).json({'msg': 'Car Not Found !'});

                    }


                 // supprimer la voiture et supprimer les entretien spour cette voiture !!
              Voiture.destroy({
                 where :{
                'idVoiture': id
                      }
               })

        res.json({"message":"car deleted !"})
    }).catch(function(err){
                  throw err;
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

console.log('id' + id);

    //we must find the User whre the id like id


    upload(req,res,function(err) {

        if (err) {

            console.log('err' + err)

        }


        Voiture.findById(id).then(function (car) {

            if (car) {
                // get the data from the req object
                // a modifier !!
                // a mdofier pour la voiture

                console.log('req body' + JSON.stringify(req.body));


                Voiture.update({
                    numChassee :req.body.car.numChassee,
                    numImmatricule :req.body.car.numImmatricule,
                    kilometrage_parcouru :req.body.car.kilometrage_parcouru,

                    nb_places : req.body.car.nb_places,
                    categorie :req.body.car.categorie,
                    prix_location :req.body.car.prix_location,

                    date_assurance :req.body.car.date_assurance,
                    date_vignette :req.body.car.date_vignette,
                    date_visite_tecknique :req.body.car.date_visite_tecknique,
                    Modele_idModele :req.body.car.Modele_idModele,
                    photo : req.body.car.photo

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
                            "idNewCar" :idcar
                        });
                    }

                }).catch(function(err){
                    res.json(err);
                })


            }

            else {
                res.status(404).json({'msg': 'Car Not Found !'});
            }

        })//end findByid

    })






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






exports.getCar_for_Client = function(req,res)
{


    //get the id

    var id = req.params.idVoiture ;


    Voiture.findById(id,
        {
        })
        .then(function(car){
            if(!car)
            {
                res.send('error in getting car with this id ! !')

            }

            else {

                res.json(car);


            }
        })
        .catch(function(err){
           throw err;

        })


}






/*
_-_-_-_-_-_-_-_-_-_-_--_-___-_-_-_-_-_-_-_-_--_-_-_-_-__-_-_-
 */


exports.updateCar_dates = function(req,res){

console.log('params' + req.params.idVoiture );
    Voiture.findById(req.params.idVoiture ).then(function(car){

        if(!car){

            res.status(400).json('Voture NOn Trouvée !');

        }else{

            //update
            Voiture.update({
                date_assurance :req.body.date_assurance,
                date_vignette : req.body.date_vignette,
                date_visite_tecknique : req.body.date_visite_tecknique

            }, {
                where: {
                    'idVoiture': req.params.idVoiture
                }
            }).then(function (idcar, err) {
                if (err) {

                    res.json(err);
                }
                else {


                    res.json({
                        "idNewCar" :idcar
                    });
                }

            }).catch(function(err){
                res.json(err);
            })


        }

    }).catch(function(err){

        res.status(400).json(err);
    })



}