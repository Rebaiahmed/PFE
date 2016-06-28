/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Facture', {
    idFacture: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date_création: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tva: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
     prix_ht: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    prix_tt: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Contrat_idContrat: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Contrat',
        key: 'idContrat'
      }
    }
  }, {
    tableName: 'Facture',
    freezeTableName: true,
    timestamps : false, // eliminate updateAT and createAt
    instanceMethods: {


      //calcul tva
      calcul_tva :function(prixVoiture)
      {
        var dateA = new moment(this.dateDebut);
        var dateB = new moment(this.dateFin);
        var diff = dateB.diff(dateA,'days');
        return diff*prixVoiture;
      },
    }




  });
};
