/* jshint indent: 2 */


module.exports = function(sequelize, DataTypes) {

  var crypto = require('crypto');
  var jwt = require('jsonwebtoken');


  return sequelize.define('Client', {
      idClient: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
          autoIncrement:true

    },
    nom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    }
   ,
    adresse: {
      type: DataTypes.STRING,
      allowNull: true
    },
    numPermis: {
      type: DataTypes.STRING,
      allowNull: true
    },
    datePermis: {
      type: DataTypes.DATE,
      allowNull: true
    },
    numTel1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    numTel2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    statut: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
      numCin: {
          type: DataTypes.STRING,
          allowNull: true,
          unique : true
      },
    hash: {
      type: DataTypes.STRING,
      allowNull: true
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Client',
    freezeTableName: true,
    timestamps : false, // eliminate updateAT and createAt
    instanceMethods: {

      setPassword : function(password){
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
      },

      validPassword: function(password) {
        var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
        return this.hash === hash;
      },


      generateJwt : function(){
        var expiry = new Date();
        //set the date of sesisin to 7 days
        expiry.setDate(expiry.getDate+ 7);

        return jwt.sign({
              _id  :this.idClient,
              email :this.email,
              nom : this.nom
            },
            "secret_client");
      }


    }
  });
};
