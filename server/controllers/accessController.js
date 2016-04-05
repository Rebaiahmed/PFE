var passport = require('passport');
var models  = require('../models/index.js');

var Client = models.Client ;
var Manager = models.Manager ;

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
                console.log('the client found !' +manager);
                res.status(200).json(manager);
            });
    }



}














