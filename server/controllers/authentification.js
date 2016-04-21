

//require all the necessary modules
var passport = require('../config/passport.js');
var models  = require('../models/index.js');
var Client = models.Client ;
var Manager = models.Manager ;


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


    var token ;


    var email = req.body.email ;
    var password = req.body.password ;

    console.log('we recived data ' + email + ' ' + password);


   Client.findOne({ where : {email : email}}).then(function(client)
    {

        if(!client)
        {
            console.log('client not found !')
            res.status(404).json({
                "msg ": "email not found"
            });


        }
        else
        {


            // we mustc check password


            if(client.validPassword(password)!=true)
            {
                console.log('result is:' + client.validPassword(password));
                console.log('not valid password !');
                res.status(401).json({
                    "statut" :"401"
                });

            }
            else {

                console.log('mrigél :' + client);

                // tout est correcte retourner le manager
                token = client.generateJwt();  /// ???? i hope the work
                console.log('token' + JSON.stringify(token));
                res.status(200).json({
                    "token": token
                })

            }


        }// end of else




    })//end findOne



    //




}



/*
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 ---------------THE LOGIN METHOD---------------------------
 -_-_-__--_-__-_-_-_-_-_-_-_-_-_-__--_-__-_-_-_-__-_-_-_-_-_-
 */




module.exports.login_admin = function(req,res)
{


var email = req.body.email ;
    var password = req.body.password ;

    console.log('we recived data ' + email + ' ' + password);


    Manager.findOne({ where : {email : email}}).then(function(admin)
    {

        if(!admin)
        {
            console.log('admin not found !')
            res.status(404).json({
                "statut ": "404"
            });


        }
        else
        {


            // we mustc check password


            if(admin.validPassword(password)!=true)
            {
                console.log('result is:' + admin.validPassword(password));
                console.log('not valid password !');
                res.status(401).json({
                    "statut" :"401"
                });

            }
            else {

                console.log('mrigél :' + admin);

                // tout est correcte retourner le manager
                token = admin.generateJwt();  /// ???? i hope the work
                console.log('token' + JSON.stringify(token));
                res.status(200).json({
                    "token": token
                })

            }


        }// end of else




    })//end findOne



        //











}

