/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Client', {
    numCin: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: '',
        key: ''
      }
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
      type: DataTypes.STRING,
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
    }
  }, {
    tableName: 'Client',
    freezeTableName: true
  });
};
