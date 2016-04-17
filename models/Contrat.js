/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Contrat', {
    idContrat: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    penaliteJour: {
      type: DataTypes.FLOAT,
      allowNull: false
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
    },
    Reservation_idReservation: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Reservation',
        key: 'idReservation'
      }
    },
    Reservation_Voiture_Modele_idModele: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Reservation_Client_idClient: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Reservation',
        key: 'Client_idClient'
      }
    }
  }, {
    tableName: 'Contrat'
  });
};
