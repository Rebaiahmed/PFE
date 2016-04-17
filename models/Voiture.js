/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Voiture', {
    idVoiture: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    numChassee: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    numImmatricule: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kilometrage: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    couleur: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nbPlaces: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    categorie: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_assurance: {
      type: DataTypes.DATE,
      allowNull: true
    },
    date_vignette: {
      type: DataTypes.DATE,
      allowNull: true
    },
    date_visite_tecknique: {
      type: DataTypes.DATE,
      allowNull: true
    },
    prixLocation: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    disponibilite: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    Modele_idModele: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Modele',
        key: 'idModele'
      }
    }
  }, {
    tableName: 'Voiture'
  });
};
