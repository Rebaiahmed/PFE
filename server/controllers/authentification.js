

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



    //faire appel au socket.io pour notifier l'admi q'un client est inscrit !
    var socketio = req.app.get('socketio');


    //get the data necessary for the signup
    var email = req.body.email ;
     var nom = req.body.nom ;
    var password = req.body.password ;
    var prenom = req.body.prenom ;
    var adresse = req.body.adresse;
    var numTel1 = req.body.numTel1;
    var statut = req.body.statut;
    var numTel2 = req.body.numTel2;



    /*
    check if Client saved before in the database
     */

    Client.findOne({where :{email :email}}).then(function(client)
    {
 if(client){   res.json({"err_create":"CREATE_ALREADY_HAVE_ACCOUNT"});}


        else{

     //build our first non persistant data
            var client = Client.build({nom :nom,prenom:prenom, email:email,adresse:adresse,numTel1:numTel1,numTel2 :numTel2,statut:statut });

     //set the password to genreate the jwt
            client.setPassword(password);
//save it in the database
            client.save()
                .then(function(){
                    var token ;
                    token = client.generateJwt();



                    //avnat d'nevoyer le token

                    socketio.sockets.emit('new_client');







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

                console.log('not valid password !');
                res.status(401).json({
                    "statut" :"401"
                });

            }
            else {
                // tout est correcte retourner le client
                token = client.generateJwt();
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

