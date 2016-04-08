

//require all the necessary modules
var passport = require('../config/passport.js');
var models  = require('../models/index.js');
var Client = models.Client ;


/*
-_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
---------------THE SIGNUP METHOD---------------------------
-_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */






module.exports.signup = function(req,res)
{
    //get the data necessary for the signup
    var email = req.body.email ;
     var nom = req.body.nom ;
    var password = req.body.password ;
    var prenom = req.body.prenom ;

    /*
    check if Client saved before in the database
     */

    Client.findOne({where :{email :email}}).then(function(client)
    {
 if(client){   res.json({"err_create":"CREATE_ALREADY_HAVE_ACCOUNT"});}


        else{

     //build our first non persistant data
            var client = Client.build({nom :nom,prenom:prenom, email:email});

     //set the password to genreate the jwt
            client.setPassword(password);
//save it in the database
            client.save()
                .then(function(){
                    var token ;
                    token = client.generateJwt();

                    //send the tokne to the front-end system
                    res.status(200).json({
                        "token" : token
                    })

                })
                .catch(function(err){
                    console.log('error :' + err);
                })

        }

    })

}

/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE LOGIN METHOD---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */



module.exports.login = function(req,res)
{

    // call the passport authentication
    passport.authenticate('client-login', function(err,client,info){

 var token ;

        // if err

        if(err) {
            res.status(404).json(err);
            return;

        }

       //if the client found !

        if(client)
        {
            //generate the jwt
          token = client.generateJwt();  /// ???? i hope the work
            res.status(200).json({
                "token" : token
            })


        }
        //client not found
        else{
            res.status(401).json(info);

        }

    })(req,res)//end of passport authenticate call

}



/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE LOGIN METHOD---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */




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

