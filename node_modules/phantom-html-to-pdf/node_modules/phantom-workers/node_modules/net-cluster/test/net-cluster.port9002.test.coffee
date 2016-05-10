##
# because we're forking, we must run this test by itself

net = require "#{LIB_ROOT}/net-cluster"
cluster = require "cluster"
clusterhub = require "clusterhub"

describe "listening on port 9002 in cluster", ->
  it "should get two successful workers", (done)->
    count = 2
    if cluster.isMaster
      clusterhub.on "listening", (port)->
        return unless cluster.isMaster
        unless port is 9002
          clusterhub.destroy()
          return done new Error("listening on wrong port")
        count--
        if count is 0
          clusterhub.destroy()
          done()
      for i in [0...count]
        cluster.fork()
    else
      server = net.createServer()
      server.listen 9002, ->
        port = server.address().port
        clusterhub.emit "listening", port
