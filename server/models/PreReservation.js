/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {


  return sequelize.define('PreReservation', {
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

    Chauffeur: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },

    chaiseBaBy: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },

    GPS: {
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
    tableName: 'PreReservation',
    freezeTableName: true,
    timestamps : false,

    instanceMethods: {

    }



  });



};


