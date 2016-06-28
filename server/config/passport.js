
// load all things we need
var passport = require('passport');
var localStraetgy = require('passport-local').Strategy;

// load the model

var models  = require('../models/index.js');

var Client = models.Client ;
var Manager = models.Manager ;

//expose this function to our app using module.exports










    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'



    passport.use('client-login', new localStraetgy({

                usernameField : 'email',
                passwordField : 'password'

            },

            function(email,password,done)
            {

                //check if user exist in the databse
                console.log('the email is :' + email + 'password :' + password);


                Client.findOne({ where : {email : email}}).then(function(client)
                {

                    console.log('the client found is :' + JSON.stringify(client));

                    if(!client)
                    {

                        return done(null,false,{"message" :"Client non trouvée , vérifier votre email"});

                    }
                    else
                    {

                        // we mustc check password


                        if(!client.validPassword(password))
                        {
                            return done(null,false,{"message" :"Mot de passe incorrecte"})
                        }


                         // tout est correcte retourner le client

                        return done(null,client);

                    }// end of else




                })//end findOne



            }//end function





        )//end of localStraetgy





    )//end of passport use





/*
-_-_-_-__-__-_-_-_____________________---------------------_______
-----------________________----------------____________------------____________
_____________----------------_____________----------------____________----------_
____________-------------____________---------------____________--------
 */
    passport.use('admin-login', new localStraetgy({

                usernameField : 'email',
                passwordField : 'password',
                passReqToCallback : true

            },

            function(req,email,password,done)
            {

                //check if user exist in the databse
                console.log('we are in passport :' + email+ ' password :' + password)


                Manager.findOne({ where : {email : email}}).then(function(admin)
                {

                   if(!admin)
                    {
                        console.log('admin not found !')

                        return done(null,false,{"message" :"Verfier vos cordonnées !"});

                    }
                    else
                    {


                        // we mustc check password


                        if(! admin.validPassword(password))
                        {
                            console.log('th password is :' + password);
                            console.log('not valid password !');
                            return done(null,false,{"message" :"Mot de passe incorrecte"})
                        }


                        // tout est correcte retourner le client

                        console.log('mrigél :' + admin);

                        return done(null,admin);

                    }// end of else




                })//end findOne



            }//end function





        )//end of localStraetgy





    )//end of passport use











module.exports = passport; //trés important !!!!!