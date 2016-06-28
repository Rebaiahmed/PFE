/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var crypto = require('crypto');
  var jwt = require('jsonwebtoken');
  return sequelize.define('Client', {
    idClient: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },

    prenom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Nom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    num_tel1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    num_tel2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    num_permis: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_obtention_permis: {
      type: DataTypes.DATE,
      allowNull: true
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: true
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true
    },
    statut: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    Ville: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pays: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Code_Postale: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Rue: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Num_Cin: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Nom_Societe: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Raison_Sociale: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Client',
    freezeTableName: true,
    timestamps : false, // eliminate updateAT and createAt
    instanceMethods: {

      setPassword: function (password) {
        console.log('password' + password)
        this.salt = crypto.randomBytes(16).toString('hex');
        console.log('salt will be' + this.salt);
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
        console.log('hash '+ this.hash);
      },

      validPassword: function (password) {
        var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
        return this.hash === hash;
      },


      generateJwt: function () {
        var expiry = new Date();
        //set the date of sesisin to 1 day
        expiry.setDate(expiry.getHours() + 24);

        return jwt.sign({
              _id: this.idClient,
              email: this.email,
              nom: this.nom,
              exp: parseInt(expiry.getTime() / 1000)
            },
            "secret_client");
      },

        calcul_chiffre_affaire_totale : function(Contrat) {
          var somme = 0;
          Contrat.findAndCountAll().then(function (contrats) {
            for (i = 0; i < contrats.length; i++) {
              //vérifier contrat correspond au contrat

              if (contrats[i].Reservation_Client_idClient == this.idClient) {
                //incremnter la somme
                somme += contrats[i].Prix_Totale;
              }
            }//end for


          }).catch(function (err) {
            throw err
          })

          return somme;
        },//end of function,


      //une fonction pour calculer le nombre de chiffre d'affaires totale
      Calcul_Nbr_reservations_totale : function(Reservation){

        var i= 0;
        var nbr =0;
        Reservation.findAndCountAll().then(function (reservations) {



          for(i;i<reservations.length;i++){
            if(reservations[i].Client_idClient==this.idClient){
              nbr++;
            }
          }



        }).catch(function (err) {
          throw err
        })
        return nbr ;


      },


      Verifier_location : function(Reservation){
        var i =0;
        var result = false ;
        Reservation.findAndCountAll().then(function (reservations) {

          for(i;i<reservations.length;i++){



            if(reservations[i].Client_idClient==this.idClient){

              if(reservations[i].etat=='en_cours'){
                result= true;
                break;

              }

            }



          }//end for



        }).catch(function (err) {
          throw err
        })


        return result ;

      },








    }
  });

};
