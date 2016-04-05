
/**
 * Module dependencies.
 */
var fs = require("fs")
  , join = require("path").join;

/**
 * Expose the router
 */
module.exports = function(config) {

  if(!config.blacklist) config.blacklist = ["/js", "/css", "/img", "/partials"];
  if(!config.index) config.index = join(process.cwd(),"/public/index.html");

  var __cache;

  return function router(req, res, next) {
    // Check to see if it's making a request from the blacklist
    if(config.blacklist) {
      for (var i = config.blacklist.length - 1; i >= 0; i--) {
        if(req.url.indexOf(config.blacklist[i]) === 0) {
          return next();
        }
      };
    }

    if (__cache) {
      return res.send(__cache);
    }

    function send(err, html) {
      if (err) return next(err);
      if (process.env.NODE_ENV === "production") {
        __cache = html;
      }
      res.send(html);
    };

    if (typeof config.index === "string") {
      return fs.readFile(config.index, "utf-8", send);
    }

    if(typeof config.index === "function") {
      if (config.index.length === 1) {
        return config.index(send);
      }
      else {
        return config.index(req, res, next);
      };
    }
  }
};
