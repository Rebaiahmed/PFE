
angular
    .module('adminApp').controller('calendrierCtrl', function($scope,locationsFactory){




    /* config object */
    $scope.uiConfig = {
        calendar:{
            height: 650,
            editable: true,
            header:{
                left: 'month basicWeek basicDay agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            },

        }
    };






    $scope.eventSources = [
        [

        ]
    ];



//récuprere toutes les locations
        $scope.locations =[];

    var locations = locationsFactory.query(function(){




        for (var i = 0; i < locations.length; i++) {

//convertir les dates
            locations[i].dateDebut = new Date(locations[i].dateDebut);
            locations[i].dateFin = new Date(locations[i].dateFin);
            //
            locations[i].dateDebut.setHours(Number(locations[i].heureDebut));
            locations[i].dateFin.setHours(Number(locations[i].heureFin));


            var event = {
                "title": locations[i].Client.nom + ' ' +locations[i].Client.prenom,
                "start": locations[i].dateDebut,
                "end":  locations[i].dateFin
            }
            //pour la peristant des evenemtns
            event.stick = true;
            event.className = ['highPriority'];

          //ajouter l'event au eventSources
            $scope.eventSources[0].push(event);

        }
    })





})
