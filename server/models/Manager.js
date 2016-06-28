/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var crypto = require('crypto');
  var jwt = require('jsonwebtoken');
  return sequelize.define('Manager', {
    idManager: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
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
    role: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'Manager',
    freezeTableName: true,
    timestamps : false, // eliminate updateAT and createAt

    instanceMethods: {

      setPassword : function(password){


        console.log('password' + password)
        this.salt =  crypto.randomBytes(16).toString('hex');
        console.log('salt will be' + this.salt);
        this.hash =crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
        console.log('hash '+ this.hash);


      },

      validPassword: function(password) {
        var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
        console.log('the ahsh is ' + hash)
        return this.hash === hash;
      },


      generateJwt : function(){
        var expiry = new Date();
        //set the date of sesisin to 24 hours
        expiry.setDate(expiry.getHours()+ 24);

        return jwt.sign({
              _id  :this.idManager,
              email :this.email,
              Username : this.Username,
              role:this.role,
              exp :parseInt(expiry.getTime()/1000)
            },
            "secret_admin");
      }


    }










  });
};
