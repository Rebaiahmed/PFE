/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Modele', {
    idModele: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement : true,
      references: {
        model: '',
        key: ''
      }
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    marque: {
      type: DataTypes.STRING,
      allowNull: true
    },
    carburant: {
      type: DataTypes.STRING,
      allowNull: true
    },
    puissance: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    prixGPS: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    prixChaisse: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    prixChauffeur: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'Modele',
    freezeTableName: true,
    timestamps : false
  });
};
