/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Contrat', {
    idContrat: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: '',
        key: ''
      }
    },
    kilometrageDebut: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    kilometrageRetour: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    prixHt: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    tva: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    prixTT: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Acompte: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Reste: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    modePayement: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dureeRetard: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_debut_prolngation: {
      type: DataTypes.DATE,
      allowNull: true
    },
    date_fin_prolngation: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Facture_idFacture: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Facture',
        key: 'idFacture'
      }
    }
  }, {
    tableName: 'Contrat',
    freezeTableName: true
  });
};
