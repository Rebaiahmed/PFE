var path = require("path")
  , spies = require("sinon-chai")
  ;

global.chai = require("chai");
global.sinon = require("sinon");
global.should = global.chai.should();
global.expect = global.chai.expect;
global.APP_ROOT = path.resolve(__dirname, "../");
global.LIB_ROOT = path.resolve(global.APP_ROOT, process.env.COVER ? "./lib-cov" : "./lib");

chai.use(spies);
