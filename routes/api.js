var express = require('express');
var Router = express.Router();
//require all the necessary modules
var models  = require('../server/models/index.js');
var Client = models.Client ;
var Reservation = models.Reservation ;
var Voiture = models.Voiture ;
var Contrat = models.Contrat ;
var Modele = models.Modele ;
var Entretient = models.Entretient ;
var sequelize = models.sequelize;



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
var MangerCtrl = require('../server/controllers/ManagerController.js');
var statistcCtrl = require('../server/controllers/statisticCtrl.js');


var jwt = require('express-jwt');
var auth = jwt({
    secret: 'secret_client'

});

var authAdmin = jwt({
    secret: 'secret_admin'

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


Router.post('/auth/updateProfile',accessCtrl.updateProfile )
Router.get('/auth/ClientReservations/:idClient',accessCtrl.getReservations )

/*Router.post('/auth/reserver')


Router.get('/auth/voitures',);*/


Router.get('/client/voitures', voitureCtrl.getCars_Client);
Router.get('/client/voiture/:idVoiture',voitureCtrl.getCar_for_Client);

//_-_-_-_-_-___-_-_-_MAILING CLIENT TO AGENCY _-_-_-_-_-_-__-_-_-_-_-_-_-_

Router.route('/auth/client/sendMail')
    .post(mailController.sendMailClient_Agence);

Router.post('/auth/client/newsletter', mailController.Newsletter)







/*
 -_-_-_-_-_-_-_-__--_-__-_-_-_-_-_-
 _-_-_-_-_-_--_THE ADMIN SIDE -_-__-_-_-_-_-
 -_-__-_-_-_-___-_-__-_-_--___-_-_-_-_-_-_-_-_
 */

Router.get('/auth/admin',function(req,res){
    res.sendFile('./app_admin/login_admin.html',{root: '/home/ahmed/WebstormProjects/login_pfe/public'});
});


Router.get('/auth/admin/admin',auth,accessCtrl.accessAdmin);


Router.post('/auth/admin/admin',authCtrl.login_admin)





//-_-_-_-__ for the pre reservation from client

Router.route('/auth/admin/admin/PreReservations')
      .post(ReservationonCtrl.addPreReservation)

//-_-__-__-__-_-_-_-_ for the reservation from manager

Router.route('/auth/admin/admin/locations')
    .post(ReservationonCtrl.addReservation)



// _-_-_-_-____-_-_-___-the LOCATIONS-_-__-_-_-_-__-
Router.route('/auth/admin/admin/locations/:etat')
    .get(ReservationonCtrl.findReservations)

//-_-_-_-__-_-_-_-_-LOCATIONS EN RETARD_-_-_-_-_-_-_-__

Router.route('/auth/admin/locations/retard')
    .get(ReservationonCtrl.findReservations_Retard)


Router.route('/auth/admin/admin/location/:idReservation')
    .get(ReservationonCtrl.getReservation)
    .put(ReservationonCtrl.updateReservation)
    .delete(ReservationonCtrl.deleteReservation)


Router.route('/auth/admin/admin/location/cloture/:idReservation')
    .put(ReservationonCtrl.Reservation_Cloture)

// _-_-_-_-____-_-_-___-the CARS-_-__-_-_-_-__-


Router.route('/auth/admin/admin/voitures')
    .get(voitureCtrl.findCars)
    .post(voitureCtrl.addCar)


Router.route('/auth/admin/admin/voiture/:idVoiture')
    .get(voitureCtrl.getCar)
    .post(voitureCtrl.updateCar)
    .delete(voitureCtrl.deleteCar)
    .put(voitureCtrl.updateCar_dates)

Router.route('/auth/admin/admin/voiture/dates/:idVoiture')
    .put(voitureCtrl.updateCar_dates)



Router.route('/auth/admin/admin/modele')
    .get(voitureCtrl.getModels)
    .post(voitureCtrl.addModele)



// _-_-_-_-____-_-_-___-entretients-_-__-_-_-_-__-



Router.route('/auth/admin/admin/entretients')
    .get(EntretientCtrl.getEntretients)
    .post(EntretientCtrl.addMaintenance)


Router.route('/auth/admin/admin/entretients/:idEntretien')
    .get(EntretientCtrl.getEntretient)
    .put(EntretientCtrl.updateEntretient)
    .delete(EntretientCtrl.deleteEntretient)


Router.route('/auth/admin/admin/entretientCar/:idVoiture')
    .get(EntretientCtrl.getEntretientCar)





// _-_-_-_-____-_-_-___-the contracts -_-__-_-_-_-__-




Router.route('/auth/admin/admin/contrats')
    .get(ContratCtrl.getContrats)
    .post(ContratCtrl.generateContrat);

Router.route('/auth/admin/admin/contrats/:idContrat')
    .get(ContratCtrl.getContrat)
    .put(ContratCtrl.updateContrat)
    .delete(ContratCtrl.deleteContrat)









// _-_-_-_-____-_-_-___-the Bills -_-__-_-_-_-__-


Router.route('/auth/admin/admin/Factures')
    .get(FactureCtrl.getFactures)
    .post(FactureCtrl.postFacture)


Router.route('/auth/admin/admin/Factures/:id_facture')
    .put(FactureCtrl.put)
    .delete(FactureCtrl.deleteFacture)




// _-_-_-_-____-_-_-___-the Clients-_-__-_-_-_-__-

Router.route('/auth/admin/admin/clients')
    .get(ClientCtrl.getClients)



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







//-__-_-_-_-_-_-_-_-_-__MANGERS-_-_-__-_-_--_-_-_-_-_-_-_-_-_-_-__-

Router.route('/auth/admin/admin/Managers')
    .get(MangerCtrl.getManagers)
    .post(MangerCtrl.addManager)


Router.route('/auth/admin/admin/Managers/:idManager')
    .put(MangerCtrl.updateManager)
    .delete(MangerCtrl.deleteManager)


//-__-_-_-_-_-_-_-_-_-__STATISTIC-_-_-__-_-_--_-_-_-_-_-_-_-_-_-_-__-

Router.route('/auth/admin/statiscCars')
    .get(statistcCtrl.getCarsChiffreAffaire)















module.exports = Router;
