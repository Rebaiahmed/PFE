var models  = require('../models/index.js');

var Conducteur = models.Conducteur ;

/*
 we will export the CRUD OPERATIONS
 */


exports.postConducteur = function(req,res){


    // get the data from the req object
    var numCin = req.body.numCin;
    var email = req.body.email ;
    var nom = req.body.nom ;
    var prenom = req.body.prenom  ;
    var numTel = req.body.numTel ;
    var adresse = req.body.adresse ;
    var  numPermis = req.body. numPermis ;
    var datePermis = req.body.datePermis;


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

      if(!driver){ res.send('No Driver created !')}



      res.json(driver) ;
  })


}

/*
 -_-_-_-_-_-_-__-_-__-_-_-_-_-_-_-_-__-_-
 ___________---------_________--------_-_-_-_-_-_
 -_-_-_-_-_-_-_-*-_-*_-_-_-_*_-_-_-_*_-_-_*_-_-_*_-_-
 -_-_-_-_-_-_-_-_*-_-_-_*-__-_-*-_-__-*_-_-*-__-*-__-*
 -_-__-_-*-__-_-*_-_-_-*-__-*_-_-*_-_-*_-_-*_-_-*_-_-*_-_-*_-_-
 */





exports.getConducteurs = function(req,res)
{

    Conducteur.findAndCountAll()
                     .then(function(drivers){

            res.json(drivers.rows);

    })


}





/*
 -_-_-_-_-_-_-__-_-__-_-_-_-_-_-_-_-__-_-
 ___________---------_________--------_-_-_-_-_-_
 -_-_-_-_-_-_-_-*-_-*_-_-_-_*_-_-_-_*_-_-_*_-_-_*_-_-
 -_-_-_-_-_-_-_-_*-_-_-_*-__-_-*-_-__-*_-_-*-__-*-__-*
 -_-__-_-*-__-_-*_-_-_-*-__-*_-_-*_-_-*_-_-*_-_-*_-_-*_-_-*_-_-
 */










exports.getConducteur = function(req,res)
{
    // get the id
    //sécursier the paramater
    var id = req.params.conducteur_id ;

    Conducteur.findById(id)

        .then(function(driver){



            res.json(driver);



          })
        .catch(function(err){
            console.log('err' + err);
        })


}







/*
 -_-_-_-_-_-_-__-_-__-_-_-_-_-_-_-_-__-_-
 ___________---------_________--------_-_-_-_-_-_
 -_-_-_-_-_-_-_-*-_-*_-_-_-_*_-_-_-_*_-_-_*_-_-_*_-_-
 -_-_-_-_-_-_-_-_*-_-_-_*-__-_-*-_-__-*_-_-*-__-*-__-*
 -_-__-_-*-__-_-*_-_-_-*-__-*_-_-*_-_-*_-_-*_-_-*_-_-*_-_-*_-_-
 */





exports.deleteConducteur = function(req,res)
{
    // get the id
    var id = req.params.conducteur_id ;




    Conducteur.findById(id)

        .then(function(driver){


            if(!driver)
            {
            res.json({'msg': 'Conducteur Not Found !'});

              }


        // a bien améliorer cette code !
        Conducteur.destroy({
            where :{
                'idConducteur' : id
            }
        })

        res.json({"message":"driver deleted !"})
    })



}






/*
 -_-_-_-_-_-_-__-_-__-_-_-_-_-_-_-_-__-_-
 ___________---------_________--------_-_-_-_-_-_
 -_-_-_-_-_-_-_-*-_-*_-_-_-_*_-_-_-_*_-_-_*_-_-_*_-_-
 -_-_-_-_-_-_-_-_*-_-_-_*-__-_-*-_-__-*_-_-*-__-*-__-*
 -_-__-_-*-__-_-*_-_-_-*-__-*_-_-*_-_-*_-_-*_-_-*_-_-*_-_-*_-_-
 */







exports.putConducteur = function(req,res)
{

    // we must get the new Object
    var id = req.params.conducteur_id;
    // we must check the id


    //we must find the User whre the id like id


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

            })


        }

        else { res.json({'msg': 'Driver Not Found !'});}



    })//end findByid



           }






/*
 -_-_-_-_-_-_-__-_-__-_-_-_-_-_-_-_-__-_-
 ___________---------_________--------_-_-_-_-_-_
 -_-_-_-_-_-_-_-*-_-*_-_-_-_*_-_-_-_*_-_-_*_-_-_*_-_-
 -_-_-_-_-_-_-_-_*-_-_-_*-__-_-*-_-__-*_-_-*-__-*-__-*
 -_-__-_-*-__-_-*_-_-_-*-__-*_-_-*_-_-*_-_-*_-_-*_-_-*_-_-*_-_-
 */










exports.historyConducteur = function(req,res)
{
    // in this method we will select all the locations which the driver is included !
}