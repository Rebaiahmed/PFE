var passport = require('passport');
var models  = require('../models/index.js');

var Client = models.Client ;
var Manager = models.Manager ;
var Reservation = models.Reservation ;

module.exports.viewProfile = function(req,res)
{
    // If no user ID exists in the JWT return a 401


    console.log('id payload :'  + req.user.email );
    if(!req.user.email) {
        res.status(401).json({
            "message" : "UnauthorizedError !!:"
        });
    } else {
        // Otherwise continue
        Client
            .findOne({where :{email :req.user.email}})
            .then(function(client) {
                console.log('the client found !' + client);
                res.status(200).json(client);
            });
    }



}


/*
-_-_-_-_-_-_-_-_-_  VIEW PROFILE FOR ADMIN ACCESS
 */
module.exports.accessAdmin = function(req,res)
{
    // If no user ID exists in the JWT return a 401


    console.log('id payload :'  + req.user.email );
    if(!req.user.email) {
        res.status(401).json({
            "message" : "UnauthorizedError !!:"
        });
    } else {
        // Otherwise continue
       Manager
            .findOne({where :{email :req.user.email}})
            .then(function(manager) {
                console.log('the Manager found !' +manager);
                res.status(200).json(manager);
            });
    }



}






module.exports.updateProfile = function(req,res)
{

    //get the id from the params


    var idClient = req.body.idClient ;
    var nom = req.body.nom ;
    var prenom = req.body.prenom  ;
    var adresse = req.body.adresse ;

   // var statut = req.body.statut ; avérifier
    var adresse = req.body.adresse ;
 

    var numTel1 = req.body.numTel1 ;
    var numTel2 = req.body.numTel1 ;

    //update the client
    Client.update({

        nom :nom,
        prenom :prenom,
        numTel1 :numTel1,
        adresse :adresse,
        numTel2:numTel2



    }, {
        where: {
            'idClient': idClient
        }
    }).then(function (client, err) {
        if (err) {
            console.log(err)
            res.json(err);
        }
        else {

            res.json(client);
        }

    })//end of update Profile








}







module.exports.getReservations = function(req,res)
{
    var idClient = req.params.idClient ;



    Client.findById(
        idClient,
        {
            include: [{model:Reservation}]
        }
    ).then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.json(err);
        })




}