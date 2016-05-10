##
# net-cluster
# ===========
#
# a drop-in replacement for node's net module that works in a sane way when clustered 
#

net = require "net"
{TCP} = process.binding "tcp_wrap"
utils = require "./utils"

##
# Server class extending node's net.Server
#
# Only intercepts functionality when neccessary in order to make
# listening on port 0 always listen on a random port when clustered.
class Server extends net.Server

  ##
  # manually create a tcp handle and pass it to the _listen2 function. 
  # If we already have a handle then _listen2 won't try and make one.
  _netClusterListen: (address, port, addressType) =>
    handle = new TCP()
    errno = 0

    if addressType is 6
      errno = handle.bind6 address, port
    else
      errno = handle.bind address,port

    if errno
      handle.close()
      return process.nextTick =>
        @emit "error", utils.errnoException(errno, "listen")
    
    # set handle so that default listen doesn't try to make one
    @_handle = handle
    @_listen2.apply(@, arguments)

  ##
  # overrides node's listen method with one that makes me happy
  listen: (args...)=>
    # skip this override if possible
    return super unless utils.shouldDoIntercept args

    # emulate overridden listen callback functionality since we're doing our own thing now
    lastArg = args[args.length - 1]
    if typeof lastArg is "function"
      @once "listening", lastArg

    utils.getPortArguments args, (err, portArgs) =>
      return @emit "error", err if err
      @_netClusterListen.apply(@, portArgs)

## parasitically inherit all of net's exports
exports[key] = value for own key, value of net
# but override the createServer and Server exports with our own
exports.Server = Server
exports.createServer = (args...)->
  new Server(args)
