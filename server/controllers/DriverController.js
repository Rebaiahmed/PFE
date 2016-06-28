//require all the necessary modules
var models  = require('../models/index.js');
var Conducteur = models.Conducteur ;





/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE ADD METHOD---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */



exports.addDriver = function(req,res){


    // get the data from the req object
    var numCin = req.body.numCin;
    var email = req.body.email ;
    var nom = req.body.nom ;
    var prenom = req.body.prenom  ;
    var numTel = req.body.numTel ;
    var adresse = req.body.adresse ;
    var  numPermis = req.body. numPermis ;
    var datePermis = req.body.datePermis;



    //create the driver
  Conducteur.create({
      numCin :numCin,
      email :email,
      nom :nom,
      prenom :prenom,
      num_tel1 :numTel,
      adresse :adresse,
      numPermis :numPermis,
      datePermis :datePermis

  }).then(function(driver){

      res.json(driver) ;
  }).catch(function(err){
      throw err;
  })


}




/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------GET ALL THE DRIVERS---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */



exports.getDrivers = function(req,res)
{

    Conducteur.findAndCountAll()
                     .then(function(drivers){

            res.json(drivers.rows);

                    }).catch(function(err){
            throw err;
                        })

}


/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------GET ONE BY ID DRIVERS---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */



exports.getDriver = function(req,res)
{



    Conducteur.findById(req.params.idDriver)

        .then(function(driver){

            res.json(driver);

          })
        .catch(function(err){
            throw err;
        })


}




/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------DELETE DRIVER---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */




exports.deleteDriver = function(req,res)
{
    // get the id
    var id = req.params.idDriver ;



    //we msut check if driver exist in the database
    Conducteur.findById(req.params.idDriver)

        .then(function(driver){


            if(!driver)
            {
            res.status(404).json({'msg': 'Driver Not Found !'});

              }

        Conducteur.destroy({
            where :{
                'idConducteur' : id
            }
        })

        res.json({"message":"driver deleted !"})
    }).catch(function(err){
            throw err;
        })



}



/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------UPDATE A DRIVER---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */




exports.updateDRiver = function(req,res)
{

    // we must get the new Object
    var id = req.params.idDriver;



    //find the DRiver will be updated !
    Conducteur.findById(id)

        .then(function (driver) {

        if (driver) {

            // get the data from the req object
            var numCin = req.body.numCin;
            var email = req.body.email ;
            var nom = req.body.nom ;
            var prenom = req.body.prenom  ;
            var numTel = req.body.numTel ;
            var adresse = req.body.adresse ;
            var  numPermis = req.body. numPermis ;
            var datePermis = req.body.datePermis;
            Conducteur.update({
                numCin :numCin,
                email :email,
                nom :nom,
                prenom :prenom,
                num_tel1 :numTel,
                adresse :adresse,
                numPermis :numPermis,
                datePermis :datePermis
            }, {
                where: {
                    'idConducteur': id
                }
            }).then(function (driver, err) {
                if (err) {
                    console.log(err)
                    res.json(err);
                }
                else {

                    res.json(driver);
                }

            }).catch(function(err){
                throw err;
            })


        }

        else { res.status(404).json({'msg': 'Driver Not Found !'});}



    })//end findByid


}

