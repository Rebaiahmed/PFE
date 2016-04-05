'use strict';

var sequelizeImport = require('..'),
  Sequelize = require('sequelize'),
  should = require('should'),
  path = require('path');

describe('Connection', function () {
  var sequelize = new Sequelize('test', 'test', 'test', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432
  }),
    models = null;

  describe('importing models', function () {
    it('should import models', function () {
      models = sequelizeImport(path.join(__dirname, 'models'), sequelize);
      Object.keys(models).length.should.be.exactly(2);
    });

    it('should have User property', function () {
      models.should.have.property('User');
    });

    it('should find Contacts property', function () {
      models.should.have.property('Contacts');
    });

    it('should have contact property', function () {
      models.Contacts.should.have.property('Contact');
    });
  });
});
