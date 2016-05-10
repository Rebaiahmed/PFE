{exec} = require "child_process"

module.exports = (grunt)->
  grunt.registerTask "open-cover", "automatically opens your coverage report", ->
    exec "open cover.html", ->
