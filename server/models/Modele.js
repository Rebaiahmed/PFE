/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Modele', {
    idModele: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
     nom_modele: {
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
    consommation: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    puissance: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    prix_chaise_bebe: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    prix_chauffeur: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'Modele',
    freezeTableName: true,
    timestamps : false, // eliminate updateAT and createAt
  });
};
