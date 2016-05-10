angular
    .module('adminApp').factory('locationsFactory',['$resource', function($resource){

    return $resource('/auth/admin/admin/locations/:idReservation'
        ,{idReservation: '@idReservation'},{
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
    );

}]);