/*
 * sequelize-import
 * Copyright(c) 2014 Ivan Pusic <pusic007@gmail.com>
 * MIT Licensed
 */

'use strict';

var fs = require('fs'),
  path = require('path');

function removeAll(elements, list) {
  var ind;

  for (var i = 0, l = elements.length; i < l; i++) {
    while ((ind = list.indexOf(elements[i])) > -1) {
      list.splice(ind, 1);
    }
  }
}

/**
 * Function for searching and loading sequelize models
 *
 * @param {Object} PATH root location to search
 * @param {Object} sequelize sequelize connection
 * @return {Object}
 *
 * @api public
 */

function load(PATH, sequelize, opts) {
  var files = fs.readdirSync(PATH),
    models = {};
  opts = opts || {};

  if (opts.exclude) {
    removeAll(opts.exclude, files);
  }

  files.forEach(function (file) {
    if (fs.statSync(path.join(PATH, file)).isDirectory()) {
      models[file] = load(path.join(PATH, file), sequelize, opts);
    } else {
      file = file.split('.')[0];
      models[file] = sequelize.import(path.join(PATH, file));
    }
  });
  return models;
}

/*
 * expose load function
 */
module.exports = exports = load;
