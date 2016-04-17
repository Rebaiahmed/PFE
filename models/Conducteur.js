/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Conducteur', {
    idConducteur: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numTel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numPermis: {
      type: DataTypes.STRING,
      allowNull: false
    },
    datePermis: {
      type: DataTypes.DATE,
      allowNull: false
    },
    numCin: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Conducteur'
  });
};
