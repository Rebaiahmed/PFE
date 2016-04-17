/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Facture', {
    idFacture: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    tva: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    prixHt: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    montantTT: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Contrat_idContrat: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'Facture'
  });
};
