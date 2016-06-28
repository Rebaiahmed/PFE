/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Voiture', {
    idVoiture: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    numImmatricule: {
      type: DataTypes.STRING,
      allowNull: true
    },
    numChassee:{
      type : DataTypes.STRING,
      unique : true

    },
    kilometrage_parcouru: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    couleur: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nb_places: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    categorie: {
      type: DataTypes.STRING,
      allowNull: true
    },
    prix_location: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    etat: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_assurance: {
      type: DataTypes.DATE,
      allowNull: true
    },
    date_vignette: {
      type: DataTypes.DATE,
      allowNull: true
    },
    date_visite_tecknique: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Modele_idModele: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Modele',
        key: 'idModele'
      }
    }
  }, {
    tableName: 'Voiture',
    freezeTableName: true,
    timestamps : false,// eliminate updateAT and createAt





    instanceMethods: {





      calcul_chiffre_affaire_totale : function(Contrat,id, done) {
        var somme = 0;
        Contrat.findAndCountAll(
            {
              where :{
                 'Reservation_Voiture_idVoiture':id
              }
            }
        ).then(function (contrats) {

              for (i = 0; i < contrats.count; i++) {

                //incremnter la somme
                somme += contrats.rows[i].Prix_Hors_Taxe;


              }//end for

              //return somme;
              done(somme);
            })

      },//end of function,





      calcul_chiffre_affaire_Par_Mois : function(Contrat,id,done) {

        var dt = new Date().getUTCMonth() + 1;


        Contrat.findAndCountAll({

          where :{
            where: sequelize.where(sequelize.fn('MONTH', sequelize.col('Date_Signature')), dt),
            'Reservation_Voiture_idVoiture' :id



          },
              attributes: [
                [sequelize.fn('SUM', sequelize.col('Prix_Hors_Taxe')), 'chiffre_mois']
              ]


        }).then(function(result){
             //console.log('result' + JSON.stringify(result));

          console.log('result count' + JSON.stringify(result));
          if(result.count==0){
            done( JSON.stringify({"chiffre_mois":0})) ;

          }else{


            done( JSON.stringify(result.rows[0])) ;

          }


        })





      },





      //une fonction pour calculer le nombre de chiffre d'affaires totale
      Calcul_Nbr_reservations_totale : function(Reservation,id, done){

        Reservation.findAndCountAll({
          where :{
            'Voiture_idVoiture':id
          }
        }).then(function (reservations) {



          done( reservations.count);

        }).catch(function (err) {
          throw err
        })




      },


      Vérifier_Disponibilite : function(Reservation){
        var i =0;
        var result = false ;
        Reservation.findAndCountAll().then(function (reservations) {

          for(i;i<reservations.length;i++){



            if(reservations[i].Client_idClient==this.idClient){

              if(reservations[i].etat=='en_cours'){
                result= true;
                break;

              }

            }



          }//end for


          return result ;
        }).catch(function (err) {
          throw err
        })


        return result;

      },






             Creer_Alertes_Entretients : function(Entretient,car,Voiture){
               var km

               Entretient.findAndCountAll(
                   {
                     include :[{model:Voiture}],
                     where :{'Voiture_idVoiture': car.idVoiture }
                   }
               ).then(function(data){

                     console.log('data' + JSON.stringify(data.count))

                     for(var i=0;i<data.count;i++)
                     {

                    km =   JSON.parse(JSON.stringify(data.rows[i])).kilometrage_prevu;

                       if(km-car.kilometrage_parcouru==1000)
                       {


                         console.log('Creer Alerte !')
                         //Créer Alerte ici

                         //envoyer en real time avec socket

                       }
                     }

                   }).catch(function(err){
                     console.log('err' + err)
                   })

             },




      Creer_Alertes_Dates  : function(Alerte){


        var query1 = "SELECT `numReservation`, `dateDebut`, `dateFin`, `lieu_prise`, `lieu_retour`, `heure_debut`, `heure_retour`, `description`, `PrixTotale`, `Nbr_Jours`, `etat`, `Chauffeur`, `chaiseBaBy`, `Client_idClient`, " +
            "`Voiture_idVoiture`, `Voiture_Modele_idModele` FROM `Reservation` AS" +
            " `Reservation` WHERE DateDiff('dateFin','CURDATE()') = 1  AND `Reservation`.`etat` = 'En_Cours'  ";

        //les requets sur les dates assurance , vistte technique , vignette pour les voitures , une alerte avant 10 jours
        var query2 = "SELECT `Voiture`.`idVoiture`, `Voiture`.`Modele_idModele`, `Voiture`.`etat`, `Voiture`.`numImmatricule`, TIMESTAMPDIFF(DAY, CURRENT_TIMESTAMP, `date_assurance`) AS `diff`, `Modele`.`idModele` AS `Modele.idModele`, `Modele`.`nom_modele` AS `Modele.nom_modele`, `Modele`.`marque` AS `Modele.marque` FROM `Voiture` AS `Voiture` LEFT OUTER JOIN `Modele` AS `Modele" +
            "` ON `Voiture`.`Modele_idModele` = `Modele`.`idModele`" +
            " WHERE TIMESTAMPDIFF(DAY, CURRENT_TIMESTAMP, `date_assurance`)=9";

        var query3 = "SELECT `Voiture`.`idVoiture`, `Voiture`.`Modele_idModele`, `Voiture`.`etat`, `Voiture`.`numImmatricule`, TIMESTAMPDIFF(DAY, CURRENT_TIMESTAMP, `date_vignette`) AS `diff`, `Modele`.`idModele` AS `Modele.idModele`, `Modele`.`nom_modele` AS `Modele.nom_modele`, `Modele`.`marque` AS `Modele.marque` FROM `Voiture` AS `Voiture` LEFT OUTER JOIN `Modele` AS `Modele" +
            "` ON `Voiture`.`Modele_idModele` = `Modele`.`idModele`" +
            " WHERE TIMESTAMPDIFF(DAY, CURRENT_TIMESTAMP, `date_vignette`)=9";

        var query4 = "SELECT `Voiture`.`idVoiture`, `Voiture`.`Modele_idModele`, `Voiture`.`etat`, `Voiture`.`numImmatricule`, TIMESTAMPDIFF(DAY, CURRENT_TIMESTAMP, `date_visite_tecknique`) AS `diff`, `Modele`.`idModele` AS `Modele.idModele`, `Modele`.`nom_modele` AS `Modele.nom_modele`, `Modele`.`marque` AS `Modele.marque` FROM `Voiture` AS `Voiture` LEFT OUTER JOIN `Modele` AS `Modele" +
            "` ON `Voiture`.`Modele_idModele` = `Modele`.`idModele`" +
            " WHERE TIMESTAMPDIFF(DAY, CURRENT_TIMESTAMP, `date_visite_tecknique`)=9";


        sequelize.query(query1)
            .then(function(result1){

              console.log('result' + JSON.stringify(result1))
              //selon les resutat créer les alrtes


              Alerte.create({
                Nom_Alerte :'Reservation_retard',
                Message :"message pour alerte de reservations selon les informatios d'elles"
              }).then(function(alerte){


              }).catch(function(err){
                console.log('err alerte' + err);
              })


              //_-_-_-_-_-_-_-_-_-_-__--__-_-_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_--_-_

              //2éme requte

              sequelize.query(query2)
                  .then(function(result2){

                    console.log('result' + JSON.stringify(result2))

                    Alerte.create({
                      Nom_Alerte :'rappel_date_assurance',
                      Message :"message pour alerte date assurance pour une voture x"
                    }).then(function(alerte){


                    }).catch(function(err){
                      console.log('err alerte' + err);
                    })


                    //_-_-_-_-_-_-_-_-_-_-__--__-_-_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_--_-_

                    sequelize.query(query3)
                        .then(function(result3){

                          console.log('result' + JSON.stringify(result3))


                          Alerte.create({
                            Nom_Alerte :'rappel_date_vignnet',
                            Message :"message pour alerte date vignette pour une voture x"
                          }).then(function(alerte){


                          }).catch(function(err){
                            console.log('err alerte' + err);
                          })


                          //_-_-_-_-_-_-_-_-_-_-__--__-_-_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_--_-_
                          //requte4
                          sequelize.query(query4)
                              .then(function(result4){


                                console.log('result' + JSON.stringify(result4))

                                Alerte.create({
                                  Nom_Alerte :'rappel_date_viste tecjnqiue',
                                  Message :"message pour alerte date visite technqiue pour une voture x"
                                }).then(function(alerte){


                                }).catch(function(err){
                                  console.log('err alerte' + err);
                                })


                              }).catch(function(err4){
                                console.log('err1' + JSON.stringify(err4));
                              })



                        }).catch(function(err3){
                          console.log('err1' + JSON.stringify(err3));
                        })



                  }).catch(function(err2){
                    console.log('err1' + JSON.stringify(err2));
                  })




            }).catch(function(err1){
              console.log('err1' + JSON.stringify(err1));
            })



      }




    }














  });
};
