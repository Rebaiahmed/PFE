/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Conducteur', {
    numCin: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: '',
        key: ''
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    numTel: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    prenom: {
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
    }
  }, {
    tableName: 'Conducteur',
    freezeTableName: true
  });
};
