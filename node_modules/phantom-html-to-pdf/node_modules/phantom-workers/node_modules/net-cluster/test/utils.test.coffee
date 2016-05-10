utils = require "#{LIB_ROOT}/utils"

# cluster = require "cluster"
# dns = require "dns"

# exports.toNumber = (x) ->
#     x = Number(x)
#     if x >= 0
#       return x
#     return false

# exports.isPipeName = (s) ->
#     typeof s is 'string' and exports.toNumber(s) is false

# exports.errnoException = (errorno, syscall) ->
#   e = new Error(syscall + ' ' + errorno)
#   e.errno = e.code = errorno
#   e.syscall = syscall
#   return e

# # helper function to parse from an arguments array the parameters to pass to _netClusterListen
# exports.getPortArguments = (args, cb) ->
#     port = exports.toNumber args[0]
#     backlog = exports.toNumber(args[1] || exports.toNumber(args[2]))

#     if args.length is 0 or typeof args[0] is "function"
#       return cb null, ["0.0.0.0", 0, null, backlog]
#     else if typeof args[1] is "undefined" or typeof args[1] is "function" || typeof args[1] is "number"
#       return cb null, ["0.0.0.0", port, 4, backlog]
#     else
#       dns.lookup args[1], (err, ip, addressType) ->
#         return cb err if err
#         unless ip
#           ip = "0.0.0.0"
#           addressType = 4
#         return cb null, [ip, port, addressType, backlog]

# ##
# # whether or not we should intercept the call to listen
# #
# # requirements:
# # * must be a worker in a cluster environment
# # * must be attempting to listen on port 0
# exports.shouldDoIntercept = (args)->
#   # only intercept if we're a worker
#   return false unless cluster.isWorker

#   port = exports.toNumber args[0]

#   # copying if else if statement from node's net module
#   # only intercept if we're attaching to the net and the port is 0
#   if args.length is 0 or typeof args[0] is "function"
#     return true
#   else if args[0] and typeof args[0] is "object"
#     return false
#   else if exports.isPipeName args[0]
#     return false
#   else if typeof args[1] is "undefined" or typeof args[1] is "function" or typeof args[1] is "number"
#     return port == 0
#   else
#     return port == 0
