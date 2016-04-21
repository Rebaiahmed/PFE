/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var crypto = require('crypto');
    var jwt = require('jsonwebtoken');
    var moment = require('moment');
    return sequelize.define('Manager', {


        idManager: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,

        },
        nom: {
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
        }

    }, {
        tableName: 'Manager',
        freezeTableName: true,
        timestamps : false,  // eliminate updateAT and createAt
        instanceMethods: {

            setPassword : function(password){
                this.salt =  crypto.randomBytes(16).toString('hex');
                this.hash =crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');


            },

            validPassword: function(password) {
                var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
                return this.hash === hash;
            },


            generateJwt : function(){
                var expiry = new Date();
                //set the date of sesisin to 7 days
                expiry.setDate(expiry.getDate()+ 7);

                return jwt.sign({
                        _id  :this.idManager,
                        email :this.email,
                        nom : this.nom,
                        exp :parseInt(expiry.getTime()/1000)
                    },
                    "secret_admin");
            }


        }
    });
};
