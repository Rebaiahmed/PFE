"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};
var moment = require('moment');

fs
    .readdirSync(__dirname)

    //this code to read all files in the model folder !!
    .filter(function(file) {

        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(__dirname + '/' + file);


        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {

        db[modelName].associate(db);

    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


var Voiture = db["Voiture"];
var Client = db["Client"];
var Conducteur = db["Conducteur"];
var Reservation = db["Reservation"];
var Entretient = db["Entretient"];
var Contrat = db["Contrat"];
var Facture = db["Facture"];
var Modele = db["Modele"]





Reservation.belongsTo(Client,{foreignKey: 'Client_idClient'});
Client.hasMany(Reservation,{constraints: true,foreignKey: 'Client_idClient'});

/*

 */

Reservation.belongsTo(Voiture,{foreignKey: 'Voiture_idVoiture'});
Voiture.hasMany(Reservation,{constraints: true,foreignKey: 'Voiture_idVoiture'})


Reservation.belongsTo(Modele,{foreignKey: 'Voiture_Modele_idModele'});
Voiture.belongsTo(Modele ,{foreignKey: 'Modele_idModele'});


Contrat.belongsTo(Facture,{foreignKey: 'Facture_idFacture'});
Contrat.belongsTo(Reservation,{foreignKey: 'Reservation_idReservation'});

//-_-__-_-_-_-_-_-_-_-_-_-__-_-_-__-_-_-_-_-_


Entretient.belongsTo(Voiture,{foreignKey :'Voiture_idVoiture'});
Voiture.hasMany(Entretient,{constraints: true,foreignKey: 'Voiture_idVoiture'});






module.exports = db;




