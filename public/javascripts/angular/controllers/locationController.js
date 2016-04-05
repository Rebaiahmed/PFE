angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap']);
angular
    .module('mwl.calendar.docs')
    .controller('CellModifierCtrl', function(moment) {

        var vm = this;
        var NewMoment = new moment(); // utiliser la bibilothéque moment

        vm.events = [
            {
                title: 'location 1 pour la voiture peugouet ',
                type: 'warning',
                startsAt: NewMoment.startOf('week').subtract(12, 'days').add(8, 'hours').toDate(),
                endsAt: NewMoment.startOf('week').add(1, 'week').add(9, 'hours').toDate(),
                voiture : 'peaugout',
                draggable: true,
                resizable: true
            }, {
                title: ' <span class="text-primary">location2</span>, with a <i>html</i> title',
                type: 'info',
                startsAt: NewMoment.subtract(1, 'day').toDate(),
                endsAt: NewMoment.add(5, 'days').toDate(),
                draggable: true,
                resizable: true
            }, {
                title: 'This is a really long event title that occurs on every year',
                type: 'important',
                startsAt: NewMoment.startOf('day').add(7, 'hours').toDate(),
                endsAt: NewMoment.startOf('day').add(19, 'hours').toDate(),
                recursOn: 'year',
                draggable: true,
                resizable: true
            }
        ];
        vm.calendarView = 'month';
        vm.viewDate = moment().startOf('month').toDate();

        //console.log(diff + '');

        var event = vm.events[0];



        var begin = event.startsAt.getDay();
        var end = event.endsAt.getDay()  ;
        /*
         boucle for to modify the cell
         */

        for(var i=0;i<end;i++)
        {

        }
        vm.cellModifier = function(cell) {



            for(var i=begin;i<=end;i++)
            {
                if (cell.label === i  && cell.inMonth) {
                    cell.cssClass = 'odd-cell';
                }

            }

        };

    });