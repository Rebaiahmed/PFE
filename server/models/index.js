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
var Preservation = db["PreReservation"];
var Manager = db["Manager"];






//-_-__-_-_-_-_-_-_-_-_-_-__-_-_-__-_-_-_-_-_
Reservation.belongsTo(Client,{foreignKey: 'Client_idClient'});
Preservation.belongsTo(Client,{foreignKey: 'Client_idClient'});
Client.hasMany(Reservation,{constraints: true,foreignKey: 'Client_idClient'});
Client.hasMany(Preservation,{constraints: true,foreignKey: 'Client_idClient'});

/*

 */
//-_-__-_-_-_-_-_-_-_-_-_-__-_-_-__-_-_-_-_-_
Reservation.belongsTo(Voiture,{foreignKey: 'Voiture_idVoiture'});
Voiture.hasMany(Reservation,{constraints: true,foreignKey: 'Voiture_idVoiture'})
//-_-__-_-_-_-_-_-_-_-_-_-__-_-_-__-_-_-_-_-_
Preservation.belongsTo(Voiture,{foreignKey: 'Voiture_idVoiture'});
Voiture.hasMany(Preservation,{constraints: true,foreignKey: 'Voiture_idVoiture'})

//-_-__-_-_-_-_-_-_-_-_-_-__-_-_-__-_-_-_-_-_
Reservation.belongsTo(Modele,{foreignKey: 'Voiture_Modele_idModele'});
Preservation.belongsTo(Modele,{foreignKey: 'Voiture_Modele_idModele'});
Voiture.belongsTo(Modele ,{foreignKey: 'Modele_idModele'});

//-_-__-_-_-_-_-_-_-_-_-_-__-_-_-__-_-_-_-_-_
Preservation.belongsTo(Voiture,{foreignKey: 'Voiture_idVoiture'});
Voiture.hasMany(Preservation,{constraints: true,foreignKey: 'Voiture_idVoiture'})

//-_-__-_-_-_-_-_-_-_-_-_-__-_-_-__-_-_-_-_-_
//Contrat.belongsTo(Facture,{foreignKey: 'Facture_idFacture'});
Contrat.belongsTo(Reservation,{foreignKey: 'Reservation_idReservation'});

//Facture.hasOne(Contrat,{foreignkey:'Facture_idFacture'});




//-_-__-_-_-_-_-_-_-_-_-_-__-_-_-__-_-_-_-_-_


Entretient.belongsTo(Voiture,{foreignKey :'Voiture_idVoiture'});
Voiture.hasMany(Entretient,{constraints: true,foreignKey: 'Voiture_idVoiture'});


//-_-__-_-_-_-_-_-_-_-_-_-__-_-_-__-_-_-_-_-_







/*Manager.findOne({ where : {email : "ahmed@mail.com"}}).then(function(admin)
{

    if(!admin)
    {
        console.log('admin not found !')



    }
    else
    {


        // we mustc check password


        if(admin.validPassword("ahmed")!=true)
        {
            console.log('result is:' + admin.validPassword("ahmed"));
            console.log('not valid password !');


        }
        else {

            console.log('mrigél :' + admin);

            // tout est correcte retourner le manager
           // token = admin.generateJwt();  /// ???? i hope the work


        }


    }// end of else




})//end findOne*/



/*var mng = Manager.build({
    idManager :2,
    nom : 'ahmed',
    email :'ahmed@mail.com'
})


mng.setPassword('ahmed');

mng.save().then(function(res){
    console.log('manager saved !');
})*/










/*Facture.findAndCountAll(

).then(function(result){


      console.log(JSON.stringify(result.rows));

    })*/


var dDebut = "16/04/2016";
var dfin = dDebut.split('/').join('-');
console.log('date debut dDebut ' + dfin);

var from = dfin.split("-");
var f = new Date(from[2], from[1] - 1, from[0]);

console.log('f is ' + f);
console.log('new Dte' + new Date(f));


module.exports = db;




