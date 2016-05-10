_ = require "underscore"
fs = require "fs"
path = require "path"
{spawn} = require "child_process"

module.exports = (grunt)->
  grunt.registerMultiTask "mocha", "test runner and coverage reports", ->
    done = @async()

    # options
    options = @options
      args: []

    # default config
    @data ||= {}
    @data.reporter ||= "dot"
    @data.compilers ||= "coffee:coffee-script"
    @data.require ||= "test/common.js"
    @data.cover ?= false
    @data.recursive ?= true
    @data.colors ?= true
    @data.console ?= false
    @data.file ?= false

    # locate mocha
    bin = path.resolve("node_modules/.bin/mocha")

    # set up child env
    _env = {}
    if @data.cover
      _env.COVER = true
    env = _.extend process.env, _env

    # mocha args
    args = [
      "--reporter"
      @data.reporter
      "--compilers"
      @data.compilers
      "--require"
      @data.require
    ]
    if @data.recursive
      args.push "--recursive"
    if @data.colors
      args.push "--colors"
    if options.args?.length
      args = args.concat options.args

    # run mocha
    mocha = spawn bin, args, {env: env}
    if @data.file
      mocha.stdout.pipe fs.createWriteStream(path.resolve(@data.file), {encoding: "utf8"})
    if @data.console
      mocha.stdout.pipe process.stdout
      mocha.stderr.pipe process.stderr
    mocha.on "exit", (code)->
      return grunt.fatal "mocha returned an error code #{code}", 1 if code
      done()
