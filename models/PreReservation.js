/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PreReservation', {
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
    Client_idClient: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Voiture_idVoiture: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Voiture_Modele_idModele: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'PreReservation'
  });
};
