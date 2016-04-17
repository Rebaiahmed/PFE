/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Reservation', {
    idReservation: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    cloture: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    Client_idClient: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Client',
        key: 'idClient'
      }
    },
    Voiture_idVoiture: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Voiture',
        key: 'idVoiture'
      }
    },
    Voiture_Modele_idModele: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Voiture',
        key: 'Modele_idModele'
      }
    }
  }, {
    tableName: 'Reservation'
  });
};
