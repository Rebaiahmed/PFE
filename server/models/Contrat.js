/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Contrat', {
    idContrat: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Prix_Totale: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Prix_Hors_Taxe: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    TVA: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Mode_payement: {
      type: DataTypes.STRING,
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
    Date_Signature: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Date_Debut_Prolongation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Date_Fin_Prolongation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Reservation_numReservation: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Reservation',
        key: 'numReservation'
      }
    },
    Reservation_Client_idClient: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Reservation',
        key: 'Client_idClient'
      }
    },
    Reservation_Voiture_idVoiture: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Reservation',
        key: 'Voiture_idVoiture'
      }
    },
    Reservation_Voiture_Modele_idModele: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Reservation',
        key: 'Voiture_Modele_idModele'
      }
    }
  }, {
    tableName: 'Contrat',
    freezeTableName: true,
    timestamps : false, // eliminate updateAT and createAt


    instanceMethods: {

      calcul_Montant_Prolongation :function(prixVoiture)
      {
        var dateDebut_prolongation = new moment(this.Date_Debut_Prolongation);
        var dateFin_prolongation = new moment(this.Date_Fin_Prolongation);
        var diff = dateFin_prolongation.diff(dateDebut_prolongation,'days');
        return diff*prixVoiture;
      },

      //calcul tva
      calcul_tva :function(prixVoiture)
      {
        var dateA = new moment(this.dateDebut);
        var dateB = new moment(this.dateFin);
        var diff = dateB.diff(dateA,'days');
        return diff*prixVoiture;
      },

      calcul_Penalite_Retard :function(prixVoiture)
      {
        var dateA = new moment(this.dateDebut);
        var dateB = new moment(this.dateFin);
        var diff = dateB.diff(dateA,'days');
        return diff*prixVoiture;
      },
      calcul_Rest_A_payer :function(prixVoiture)
      {
        var dateA = new moment(this.dateDebut);
        var dateB = new moment(this.dateFin);
        var diff = dateB.diff(dateA,'days');
        return diff*prixVoiture;
      }

    }














  });
};
