/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Entretient', {
    idEntretien: {
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
    date_entretien: {
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
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Voiture_idVoiture: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Voiture',
        key: 'idVoiture'
      }
    },
    Voiture_Modele_idModele: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Voiture',
        key: 'Modele_idModele'
      }
    }

  }, {
    tableName: 'Entretient',
    freezeTableName: true,
    timestamps : false, // eliminate updateAT and createAt
  });
};
