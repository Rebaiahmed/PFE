/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {


  return sequelize.define('Reservation', {
    idReservation: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement :true

    },
    dateDebut: {
      type: DataTypes.DATE,
      allowNull: true
    },
    heureDebut: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lieuPrise: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dateFin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    heureFin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lieuRetour: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Voiture_Modele_idModele: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Voiture',
        key: 'Modele_idModele'
      }
    },
    Client_idClient: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Client',
        key: 'idClient'
      }
    },
    Voiture_idVoiture: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Voiture',
        key: 'idVoiture'
      }
    }



  }, {
    tableName: 'Reservation',
    freezeTableName: true,
    timestamps : false,

    instanceMethods: {

      calculPrixTotal : function(car)
      {



              var prix = car.prixLocation;
              console.log('prix location' + prix);
        console.log('total number of days is ' + (this.dateFin.getDay()-this.dateDebut.getDay()));
              var totale = (this.dateFin.getDay()-this.dateDebut.getDay())*prix;


        return totale;
      }
    }



  });



};


console.log('hello !')