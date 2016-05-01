
var models  = require('../models/index.js');
var Voiture = models.Voiture ;
var Entretient = models.Entretient ;
var Modele = models.Modele ;
var Reservation = models.Reservation;
var Client = models.Client ;
var moment = require('moment');
//calcuuler le chifffre d'affires pour chaque voiture


exports.getCarsChiffreAffaire = function(req,res)
{



    Voiture.findAndCountAll( {
        include :[
            { model :Modele},{model:Reservation}
        ]
    })

        .then(function(cars){
            if(!cars)
            {
                res.send('no cars !')

            }

            else {
                var tableChiffres=[];
                var  chiffrTotale = 0;
                var calcul = {};






                for(var j=0;j<cars.rows.length;j++)
                {

                    //tets si la voiture n'a pas de réservations

                    if(cars.rows[j].Reservations.length==0)
                    {
                        console.log('car reservation 0' + JSON.stringify(cars.rows[j]));
                        calcul={"car":cars.rows[j] ,"chiffre_affaire":0};
                        tableChiffres.push(calcul);
                    }

                for(var i=0;i<cars.rows[j].Reservations.length;i++) {

                    var dDdebut = moment(JSON.stringify(cars.rows[j].Reservations[i].dateDebut), 'YYYY-MM-DD HH:mm');
                    var dFin = moment(JSON.stringify(cars.rows[j].Reservations[i].dateFin), 'YYYY-MM-DD HH:mm');
                    var diff =dFin.diff(dDdebut, 'days')
                    console.log(i +'Difference is ',typeof dFin.diff(dDdebut, 'days'), 'days' );
                    chiffrTotale+= cars.rows[j].prixLocation *(diff);
                    console.log('chiffer affaire will be ' + chiffrTotale);
                    calcul={"car":cars.rows[j] ,"chiffre_affaire":chiffrTotale};
                    tableChiffres.push(calcul);
                }//en of for



                }//end of fro cars



                res.json(tableChiffres);



            }
        })
        .catch(function(err){
            console.log('err ! ctach in car !' + err)

        })






}






exports.getStatistciClients = function(req,res)
{

    var nbrProfesionel = 0;
    var nbrParticuliers =0;
    Client.findAndCountAll()
        .then(function(result){

           if(!result)
           {
               res.json("ne client found !");
           }
            else{

               for(var i=0;i<result.rows.length;i++)
               {
                   //test statut client
                   if(result.rows[i].statut==1)
                   {
                       nbrProfesionel++;


                   }
                   else{
                       nbrParticuliers++;

                   }


               }//end of for



               res.json({
                   "particulier":nbrParticuliers,
                   "professionel":nbrProfesionel
               })

           }//end of else






        })












}







