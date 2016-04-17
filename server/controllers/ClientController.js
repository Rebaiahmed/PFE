//require all the necessary modules
var models  = require('../models/index.js');
var Client = models.Client ;
var Reservation = models.Reservation ;
var Voiture = models.Voiture ;



/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE ADD METHOD---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */



exports.addClient = function(req,res){


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




/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE getAll METHOD---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */



exports.getClients = function(req,res)
{



    //findAndCountAll the Client
    //include : to get teh Reservation associated with the client
    Client.findAndCountAll(
        {
            include: [{model:Reservation}]
        }
    )
        .then(function(result){


            //send the rows found
            res.json(result.rows);
        })
        .catch(function(err){
            console.log('err client ' + err);
        })
}



/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE GET SINGLE CLIENT---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */



exports.getClient = function(req,res)
{
    // get the id
    var id = req.params.idClient;
    //find Client By Id
    Client.findById(id, {
        include: [{model:Reservation}]
    })
        .then(function(client){

            //send the result
            res.json(client);

       }).catch(function(err){
            console.log('errin geting client' + err);
        })


}


/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------DELETE CLIENT---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */





exports.deleteClient= function(req,res)
{
    // get the id
    var id = req.params.idClient ;

//we must first check fi the client exist !!
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





/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------DELETE CLIENT---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */








exports.updateClient = function(req,res)
{


    //get the id from the params
           var id = req.params.idClient ;

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


    //update the client
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

            })//end of update method


}






exports.historyClient = function(req,res)
{

}