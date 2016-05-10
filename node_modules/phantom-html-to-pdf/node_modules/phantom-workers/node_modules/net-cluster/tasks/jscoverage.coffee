{spawn} = require "child_process"

module.exports = (grunt)->
  grunt.registerTask "jscoverage", "creates jscoverage compatible source", ->
    done = @async()
    @requiresConfig @name
    @requiresConfig [@name, "src"]
    @requiresConfig [@name, "dest"]

    config = grunt.config.get @name

    # clear output directory
    rm = spawn "rm", ["-rf", config.dest]
    rm.on "exit", (code)->
      return grunt.fatal "unable to clear output directory: #{config.dest}", 1 if code

      jscoverage = spawn "jscoverage", [config.src, config.dest]
      jscoverage.stdout.pipe process.stdout
      jscoverage.stderr.pipe process.stderr
      jscoverage.on "exit", (code)->
        return grunt.fatal "unable to create jscoverage source", 1 if code
        done()
