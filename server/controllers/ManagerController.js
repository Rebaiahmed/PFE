var models  = require('../models/index.js');
var Manager = models.Manager ;




exports.getManagers = function(req,res)
{

    Manager.findAndCountAll().then(function(result){
        res.json(result);
    })


}



exports.addManager = function(req,res)
{
    //ge the necessary data
    var nom = req.body.nom ;
    var login = req.body.login ;
    var password = req.body.password ;

    //affiche dans le console avant l'affichage
    console.log('data recived ' + nom + ' ' + login+ ' ' + password);

    //we will genrethe jwt
    // crypt the password
    //save it in the database
}


exports.updateManager = function(req,res)
{

    var id = req.params.idManager ;
    //findById
    //updateIt


}






