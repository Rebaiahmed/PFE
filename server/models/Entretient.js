/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Entretient', {
    idEntretient: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    kilometrage_prevu: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    caution: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Voiture_idVoiture: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Voiture',
        key: 'idVoiture'
      }
    }
  }, {
    tableName: 'Entretient',
    freezeTableName: true,
    timestamps : false
  });
};
