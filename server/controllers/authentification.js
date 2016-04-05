var passport = require('../config/passport.js');
var models  = require('../models/index.js');

var Client = models.Client ;

/*
export the function

 */


//register autnetication

module.exports.register = function(req,res)
{
    //récupérer les donénes
    var email = req.body.email ;
     var name = req.body.name ;
    var password = req.body.password ;

  //console.log('data it s' + email + '__' + name + '_' + password);

    var client = Client.build({nom :name, email:email});

    // set the passwoed
    client.setPassword(password);


    //save it in the database
    client.save()
        .then(function(){

            var token ;
            token = client.generateJwt();


            res.status(200).json({
                "token" : token
            })

        })
        .catch(function(err){
            console.log('error :' + err);
        })






}


module.exports.login = function(req,res)
{

    // call the passport authentication
    passport.authenticate('client-login', function(err,client,info){

        console.log('client is:' + client);

 var token ;

        // if err

        if(err) {
            res.status(404).json(err);
            //return;

        }

        // if lcient found

        if(client)
        {
          token = client.generateJwt();  /// ???? i hope the work
            res.status(200).json({
                "token" : token
            })


        }
        else{
            res.status(401).json(info);

        }





    })(req,res)






}





module.exports.login_admin = function(req,res)
{
    // call the passport authentication
    passport.authenticate('admin-login', function(err,manager,info){

        console.log('the manager is :' + manager);

        var token ;

        // if err

        if(err) {
            res.status(404).json(err);
            //return;

        }

        //

        if(manager)
        {
            token = manager.generateJwt();  /// ???? i hope the work
            res.status(200).json({
                "token" : token
            })


        }
        else{
            res.status(401).json(info);

        }





    })(req,res)



}

