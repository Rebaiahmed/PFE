'use strict'

/*
 define our factory
 */

angular.module('meanApp').factory('Socket',['socketFactory', function(socketFactory){

    return socketFactory({
        prefix :'',
        ioSocket :io.connect('http://localhost:3000/')

    })




}])
