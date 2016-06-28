/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Conducteur', {
    num_cin: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: true
    },
    num_tel: {
      type: DataTypes.STRING,
      allowNull: true
    },
    num_permis: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_obtention_permis: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'Conducteur',
    freezeTableName: true,
    timestamps : false, // eliminate updateAT and createAt
  });
};
