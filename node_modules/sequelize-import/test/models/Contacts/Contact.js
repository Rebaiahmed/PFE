'use strict';

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Contact', {
		content: DataTypes.STRING
	});
};
