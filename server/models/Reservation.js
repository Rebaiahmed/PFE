/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var moment = require('moment');
  return sequelize.define('Reservation', {
    numReservation: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dateDebut: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dateFin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lieu_prise: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lieu_retour: {
      type: DataTypes.STRING,
      allowNull: true
    },
    heure_debut: {
      type: DataTypes.STRING,
      allowNull: true
    },
    heure_retour: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PrixTotale: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Nbr_Jours: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    etat: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Chauffeur:{
      type:DataTypes.BOOLEAN,
      allowNull: true
    },
    chaiseBaBy:{
      type:DataTypes.BOOLEAN,
      allowNull: true
    },
    Client_idClient: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Client',
        key: 'idClient'
      }
    },
    Voiture_idVoiture: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Voiture',
        key: 'idVoiture'
      }
    },
    Voiture_Modele_idModele: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Voiture',
        key: 'Modele_idModele'
      }
    }
  }, {
    tableName: 'Reservation',
    freezeTableName: true,
    timestamps : false, // eliminate updateAT and createAt
    instanceMethods: {

      calculPrixTotale :function(idVoiture,Voiture, callback)
      {

        Voiture.findById(idVoiture)
            .then(function(car){

              var dateA = new moment(this.dateDebut);
              var dateB = new moment(this.dateFin);
              var diff = dateB.diff(dateA,'days');
              this.PrixTotale= diff*car.prix_location;
              callback();
                           })
            .catch(function(err){
              console.log('err' + err)
            })

      },

      calculNbrJours  : function(callback){
        var dateA = new moment(this.dateDebut);
        var dateB = new moment(this.dateFin);
        this.Nbr_Jours= dateB.diff(dateA,'days');

        callback();
      }



    }
  });
};
