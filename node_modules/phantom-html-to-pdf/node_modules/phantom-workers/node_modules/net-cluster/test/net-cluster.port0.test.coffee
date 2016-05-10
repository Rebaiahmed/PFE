##
# because we're forking, we must run this test by itself

net = require "#{LIB_ROOT}/net-cluster"
cluster = require "cluster"
clusterhub = require "clusterhub"

describe "listening on port 0 in cluster", ->
  it "should get two unique ports", (done)->
    count = 2
    ports = {}
    if cluster.isMaster
      clusterhub.on "listening", (port)->
        return unless cluster.isMaster
        if ports[port]
          clusterhub.destroy()
          return done new Error("allocated the same port")
        ports[port] = true
        count--
        if count is 0
          clusterhub.destroy()
          done()
      for i in [0...count]
        cluster.fork()
    else
      server = net.createServer()
      server.listen 0, ->
        port = server.address().port
        clusterhub.emit "listening", port
