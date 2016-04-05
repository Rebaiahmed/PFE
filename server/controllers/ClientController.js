var models  = require('../models/index.js');

var Client = models.Client ;
var Reservation = models.Reservation ;
var Voiture = models.Voiture ;

/*
 we will export the CRUD OPERATIONS
 */


exports.postClient = function(req,res){


    // get the data from the req object
    var numCin = req.body.numCin ;
    var email = req.body.email ;
    var nom = req.body.nom ;
    var prenom = req.body.prenom  ;
    var adresse = req.body.adresse ;
    var password = req.body.password ;
    var statut = req.body.statut ;
    var adresse = req.body.adresse ;
    var numPermis = req.body.numPermis ;
    var datePermis = req.body.datePermis ;
    var numTel1 = req.body.numTel1 ;

    console.log(req.body);

    res.json(password);


    //save the new Data in teh database

   /*var client = Client.build({

        email :email,
        nom :nom,
        prenom :prenom,
       numTel1 :numTel1,
        adresse :adresse,
       numPermis :numPermis,
       datePermis :datePermis,
       statut :statut,
       numCin :numCin


    })

    client.setPassword(password);

    client.save().then(function(){

    })

    res.json(client) ;*/





}




exports.getClients = function(req,res)
{


    Client.findAndCountAll(
        {
            include: [{model:Reservation}]
        }
    )
        .then(function(result){


            res.json(result.rows);


        })
        .catch(function(err){
            console.log('err client ' + err);
        })


}




exports.getClient = function(req,res)
{
    // get the id
    var id = req.params.idClient;



    Client.findById(id, {
        include: [{model:Reservation}]
    })
        .then(function(client){



            res.json(client);


       }).catch(function(err){
            console.log('errin geting client' + err);
        })


}







exports.deleteClient= function(req,res)
{
    // get the id
    var id = req.params.idClient ;
    console.log('ths id is ' + id);

    Client.findById(id)
        .then(function(client){
        if(!client){res.json({'msg': 'Client  Not Found !'});}

           else {
            Client.destroy({
                where: {
                    'idClient': id
                }
            })

            res.json({"message": "Client deleted !"})

        }
    })



}













exports.putClient = function(req,res)
{

var id = req.params.idClient ;
    console.log('the id is ' + id);
            // get the data from the req object
            var numCin = req.body.numCin ;
            var email = req.body.email ;
            var nom = req.body.nom ;
            var prenom = req.body.prenom  ;
            var adresse = req.body.adresse ;
            var password = req.body.password ;
            var statut = req.body.statut ;
            var adresse = req.body.adresse ;
            var numPermis = req.body.numPermis ;
            var datePermis = req.body.datePermis ;
            var numTel1 = req.body.numTel1 ;

    console.log(numCin);




            Client.update({
                email :email,
                nom :nom,
                prenom :prenom,
                numTel1 :numTel1,
                adresse :adresse,
                numPermis :numPermis,
                datePermis :datePermis,
                statut :statut,
                numCin :numCin

            }, {
                where: {
                    'idClient': id
                }
            }).then(function (client, err) {
                if (err) {
                    console.log(err)
                    res.json(err);
                }
                else {

                    res.json(client);
                }

            })









}













exports.historyClient = function(req,res)
{

}