/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
var moment = require('moment');

  return sequelize.define('Reservation', {
    idReservation: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement :true

    },
    dateDebut: {
      type: DataTypes.DATE,
      allowNull: true
    },
    heureDebut: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lieuPrise: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dateFin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    heureFin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lieuRetour: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PrixTotale:
    {
      type:DataTypes.FLOAT,


    },
    cloture: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    Voiture_Modele_idModele: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Voiture',
        key: 'Modele_idModele'
      }
    },
    Client_idClient: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Client',
        key: 'idClient'
      }
    },
    Voiture_idVoiture: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Voiture',
        key: 'idVoiture'
      }
    }



  }, {
    tableName: 'Reservation',
    freezeTableName: true,
    timestamps : false,
    instanceMethods: {

      calculPrixTotale :function(prixVoiture)
      {
        var dateA = new moment(this.dateDebut);
        var dateB = new moment(this.dateFin);
        var diff = dateB.diff(dateA,'days');
        console.log('the diff is ' + diff);
       return diff*prixVoiture;


      }

    }





  });



};


