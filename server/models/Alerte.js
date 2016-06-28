/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Alerte', {
    idAlerte: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
    },
    Nom_Alerte: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Message: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sonore: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Alerte',
    freezeTableName: true,
    timestamps : false, // eliminate updateAT and createAt
  });
};
