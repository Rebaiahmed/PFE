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
var Modele = db["Modele"];
var Alerte = db["Alerte"];
var Manager = db["Manager"];






//-_-__-_-_-_-_-_-_-_-_-_-__-_-_-__-_-_-_-_-_
Reservation.belongsTo(Client,{foreignKey: 'Client_idClient'});

Client.hasMany(Reservation,{constraints: true,foreignKey: 'Client_idClient'});





/*

 */
//-_-__-_-_-_-_-_-_-_-_-_-__-_-_-__-_-_-_-_-_
Reservation.belongsTo(Voiture,{foreignKey: 'Voiture_idVoiture'});
Reservation.belongsTo(Modele,{foreignKey: 'Voiture_Modele_idModele'});
Voiture.hasMany(Reservation,{constraints: true,foreignKey: 'Voiture_idVoiture'})

Entretient.belongsTo(Voiture ,{foreignKey: 'Voiture_idVoiture'});
Voiture.hasMany(Entretient,{constraints: true,foreignKey: 'Voiture_idVoiture'})

Voiture.belongsTo(Modele ,{foreignKey: 'Modele_idModele'});
Modele.hasMany(Voiture,{foreignKey: 'Modele_idModele'})

//Entretient.belongsTo(Alerte,{foreignKey: 'Alerte_idAlerte'});
Alerte.belongsTo(Entretient,{foreignKey: 'Alerte_idAlerte'});



/*
*/
//_-_--_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_
Contrat.belongsTo(Reservation,{foreignKey: 'Reservation_numReservation'});
//Reservation.belongsTo(Contrat,{foreignKey: 'Reservation_numReservation'});


Facture.belongsTo(Contrat,{foreignKey: 'Contrat_idContrat'});















/*var manager = Manager.build({
    email :'ahmed@mail.com',
    Username : 'ahmed',
    role:true

})
//75fddec218dc45073242b6ea8dfd179775cd6085ab4e3bef3f512a280334810a7c05062657b02674afcd5ac7a2a538ec43d4c5d4b13b0c8a31ee861d0f321981

//set the password
manager.setPassword('ahmed');


console.log('manager' + manager.hash);

 manager.save().then(function(manager){
 console.log('saved !' + JSON.stringify(manager));
 }).catch(function(err){
 console.log('err' + err);
 })*/


















module.exports = db;




