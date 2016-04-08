var express = require('express');
var Router = express.Router();



var authCtrl = require('../server/controllers/authentification.js');
var accessCtrl = require('../server/controllers/accessController.js');
var voitureCtrl = require('../server/controllers/VoitureController.js');
var ReservationonCtrl = require('../server/controllers/ReservationController.js');
var ClientCtrl = require('../server/controllers/ClientController.js');
var ConducteurCtrl = require('../server/controllers/DriverController.js');
var ContratCtrl = require('../server/controllers/ContratController.js');
var FactureCtrl = require('../server/controllers/FactureController.js');
var EntretientCtrl = require('../server/controllers/MaintenanceController.js');
var mailController  = require('../server/controllers/mailController.js');


var jwt = require('express-jwt');
var auth = jwt({
    secret: 'secret_client'

});



/*
THE HOME PAGE
 */

Router.get('/', function(req,res){
    res.sendFile('./app_client/index.html',{root: '/home/ahmed/WebstormProjects/login_pfe/public'});
})

/*
-_-_-_-_-_-_-_-__--_-__-_-_-_-_-_-
_-_-_-_-_-_--_THE CLIENT SIDE -_-__-_-_-_-_-
-_-__-_-_-_-___-_-__-_-_--___-_-_-_-_-_-_-_-_
 */

Router.get('/auth/profile',auth,accessCtrl.viewProfile);


Router.post('/auth/login',authCtrl.login)


Router.post('/auth/register',authCtrl.signup);

/*Router.post('/auth/reserver')


Router.get('/auth/voitures',);*/


Router.get('/client/voitures', voitureCtrl.getCars_Client);




/*
 -_-_-_-_-_-_-_-__--_-__-_-_-_-_-_-
 _-_-_-_-_-_--_THE ADMIN SIDE -_-__-_-_-_-_-
 -_-__-_-_-_-___-_-__-_-_--___-_-_-_-_-_-_-_-_
 */

Router.get('/auth/admin',function(req,res){
    res.sendFile('./app_admin/auth/login/login_admin.html',{root: '/home/ahmed/WebstormProjects/login_pfe/public'});
});


Router.get('/auth/admin/admin',auth,accessCtrl.accessAdmin);


Router.post('/auth/admin/admin',authCtrl.login_admin)




// _-_-_-_-____-_-_-___-the LOCATIONS-_-__-_-_-_-__-

Router.route('/auth/admin/admin/PreReservations')
    .get(ReservationonCtrl.getPreReservation)
      .post(ReservationonCtrl.addPreReservation)

Router.route('/auth/admin/admin/PreReservations/:idPreReservation')
    .delete(ReservationonCtrl.deletePreservation);

Router.route('/auth/admin/admin/locations')
    .get(ReservationonCtrl.findReservations)
    .post(ReservationonCtrl.addReservation)


//-_-_-_-__ for the pre reservation


Router.route('/auth/admin/admin/Prelocations')
    .post(ReservationonCtrl.saveReservation)




Router.route('/auth/admin/admin/locations/:idReservation')
    .get(ReservationonCtrl.getReservation)
    .put(ReservationonCtrl.updateReservation)
    .delete(ReservationonCtrl.deleteReservation)



// _-_-_-_-____-_-_-___-the CARS-_-__-_-_-_-__-


Router.route('/auth/admin/admin/voitures')
    .get(voitureCtrl.findCars)
    .post(voitureCtrl.addCar)


Router.route('/auth/admin/admin/voitures/:idVoiture')
    .get(voitureCtrl.getCar)
    .put(voitureCtrl.updateCar)
    .delete(voitureCtrl.deleteCar)


Router.route('/auth/admin/admin/modele')
    .get(voitureCtrl.getModels)
    .post(voitureCtrl.addModele)



// _-_-_-_-____-_-_-___-entretients-_-__-_-_-_-__-



Router.route('/auth/admin/admin/entretients')
    .get(EntretientCtrl.getEntretients)
    .post(EntretientCtrl.addMaintenance)


Router.route('/auth/admin/admin/entretients/:idEntretient')
    .get(EntretientCtrl.getEntretient)
    .put(EntretientCtrl.updateEntretient)
    .delete(EntretientCtrl.deleteEntretient)


Router.route('/auth/admin/admin/entretientCar/:idVoiture')
    .get(EntretientCtrl.getEntretientCar)




// _-_-_-_-____-_-_-___-the contracts -_-__-_-_-_-__-

Router.route('/auth/admin/admin/contrats')
    .get(ContratCtrl.getContrats)

Router.route('/auth/admin/admin/contrats/:id_reservation')
    .post(ContratCtrl.generateContrat);









// _-_-_-_-____-_-_-___-the Bills -_-__-_-_-_-__-


Router.route('/auth/admin/admin/Factures')
    .get(FactureCtrl.getFactures)


Router.route('/auth/admin/admin/Factures/:id_facture')
    .put(FactureCtrl.put);


Router.route('/auth/admin/admin/Factures/:id_contrat')
    .post(FactureCtrl.generateFacture);


// _-_-_-_-____-_-_-___-the Clients-_-__-_-_-_-__-

Router.route('/auth/admin/admin/clients')
    .get(ClientCtrl.getClients)
    .post(ClientCtrl.addClient)


Router.route('/auth/admin/admin/clients/:idClient')
    .get(ClientCtrl.getClient)
    .put(ClientCtrl.updateClient)
    .delete(ClientCtrl.deleteClient)






// _-_-_-_-____-_-_-___-the Drivers-_-__-_-_-_-__-


Router.route('/auth/admin/admin/conducteurs')
    .get(ConducteurCtrl.getDrivers)
    .post(ConducteurCtrl.addDriver)


Router.route('/auth/admin/admin/conducteurs/:idDriver')
    .get(ConducteurCtrl.getDriver)
    .put(ConducteurCtrl.updateDRiver)
    .delete(ConducteurCtrl.deleteDriver)



//_-_-_-_-_-___-_-_-_MAILING _-_-_-_-_-_-__-_-_-_-_-_-_-_

Router.route('/auth/admin/sendMail')
    .post(mailController.sendMail);


module.exports = Router;