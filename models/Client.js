/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Client', {
    idClient: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: true
    },
    numPermis: {
      type: DataTypes.STRING,
      allowNull: true
    },
    datePermis: {
      type: DataTypes.DATE,
      allowNull: true
    },
    numTel1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    numTel2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    statut: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    numCin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Client'
  });
};
