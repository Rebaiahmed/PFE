module.exports = (grunt) ->
  # project configuration  
  grunt.initConfig
    clean: 
      build: [
        "cover.html"
        "lib" 
        "lib-cov"
      ]
    coffee:
      compile:
        files: grunt.file.expandMapping(["src/**/*.coffee"], "lib/", {
          rename: (destBase, destPath) ->
            destBase + destPath.replace(/^src\//, "").replace(/\.coffee$/, ".js")
        })
    jscoverage:
      src: "lib"
      dest: "lib-cov"
    mocha:
      net_cluster_0:
        options:
          args: ["test/net-cluster.port0.test.coffee"]
        reporter: "list"
        console: true
      net_cluster_9002:
        options:
          args: ["test/net-cluster.port9002.test.coffee"]
        reporter: "list"
        console: true


  grunt.loadNpmTasks("grunt-contrib-clean")
  grunt.loadNpmTasks("grunt-contrib-coffee")
  grunt.loadTasks("tasks")

  grunt.registerTask "run:cover", ["coffee", "jscoverage", "mocha:cover", "open-cover"]
  grunt.registerTask "run:test", ["coffee", "mocha:net_cluster_0", "mocha:net_cluster_9002"]
  grunt.registerTask "default", ["run:test"]
