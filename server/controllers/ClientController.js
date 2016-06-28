//require all the necessary modules
var models  = require('../models/index.js');
var Client = models.Client ;
var Reservation = models.Reservation ;
var Voiture = models.Voiture ;
var Contrat = models.Contrat ;




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

            /*attributes : ['idClient', 'email', 'prenom', 'nom', 'num_tel1','num_tel2','num_permis','date_obtention_permis','statut','Ville' ,+
            'pays','Num_Cin','Nom_Société','Raison_Sociale']*/
        }
    )
        .then(function(result){


               res.json(result.rows);

        })
        .catch(function(err){
            console.log('err' + JSON.stringify(err));
        })
}



/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE GET SINGLE CLIENT---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */



exports.getClient = function(req,res)
{

    Client.findById(req.params.idClient)
        .then(function(client){


            //calcul_chiifre Affaire

            if(client)
            {
                var chiffreAffaire =  client.calcul_chiffre_affaire_totale(Contrat);
                var nbr = client.Calcul_Nbr_reservations_totale(Reservation);

                //calcul Nombre totale de réservation

                var verifier = client.Verifier_location(Reservation)


                console.log('nbr' + nbr + ' chiffre affaire' + chiffreAffaire + ' ' + verifier);


                //send the result
                res.json({'client':client,'chiffre_affaire':chiffreAffaire,'nbr_reservations':nbr ,'location_encours':verifier});

            }
            else{
                res.json(client)
            }


       }).catch(function(err){
           throw err;
        })


}


/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------DELETE CLIENT---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */





exports.deleteClient= function(req,res)
{

//we must first check fi the client exist !!
    Client.findById(req.params.idClient)
        .then(function(client){


        if(!client)
        {
            res.status(404).json({'msg': 'Client  Not Found !'});
        }

           else {
            //Nous devons vérifier si le client a déja une historique

            var verifier = client.Verifier_location(Reservation)
            var nbr = client.Calcul_Nbr_reservations_totale(Reservation);
            if(verifier){
                res.status(400).json({'message' : 'Client a d"ja une réservation en cours'})
            }else if(nbr>0) {

                res.status(400).json({'message' : 'Client a déja une historique'})
            }
            else{
                Client.destroy({
                    where: {
                        'idClient': req.params.idClient
                    }
                })

                res.status(200).json({"message": "Client Supprimée"})
            }











        }
    }).catch(function(err){
            throw  err;
        })



}





/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------UPDATE CLIENT---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */








exports.updateClient = function(req,res)
{

           var id = req.params.idClient ;

            // get the data from the req object
            var numCin = req.body.numCin ;

            var adresse = req.body.adresse ;
            var statut = req.body.statut ;
            var numPermis = req.body.numPermis ;
            var datePermis = req.body.datePermis ;
            var  num_tel1 = req.body. num_tel1 ;
 var num_tel2 = req.body.num_tel2 ;
    var num_permis = req.body.num_permis;
    var date_obtention_permis = req.body.date_obtention_permis ;
var Ville = req.body.Ville;
    //update the client
            Client.update({

                num_tel1 : num_tel1,
                num_tel2:num_tel2,
                num_permis:num_permis,
                date_obtention_permis:date_obtention_permis,
                Ville:Ville,
                pays:req.body.pays,
                Code_Postale:req.body.Code_Postale,
                Rue:req.body.Rue,
                Num_Cin:req.body.Num_Cin,
                adresse :adresse,
                date_obtention_permis :req.body.date_obtention_permis,


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

            })//end of update method*/


}

