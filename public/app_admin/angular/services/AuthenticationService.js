/*
define our service
 */

angular
    .module('meanApp')
    .service('Authentication',['$htttp','$window', function($http,$window){


        /*
        define the function
         */
        var saveToken = function(token){
           $window.localStorage['client-token']=token;
        }

        var gettoken = function()
        {
             return  $window.localStorage['client-token'];

        }

        var logout = function()
        {
            $window.localStorage.removeItem('client-token');

        }
         var isloggedIn = function()
         {
             // get teh token and check it
             var token = gettoken();

             var payload ; // the data is stored here

             if(token)
             {
                 payload = token.split('.')[1];
                 payload =$window.atob(payload);
                 payload = JSON.parse(payload);
                 console.log(payload);

                 return payload.exp >Date.now() /1000;  // a expliquer

             }
             else{
                 return false;
             }

         }


               var currentUser = function()
               {
                   // we must chekf it

                   if(isloggedIn())
                   {

                       var token = gettoken();
                       payload =$window.atob(payload);
                       payload = JSON.parse(payload);
                       console.log(payload);

                       // we will return an object
                       return{
                           email : payload.email,
                           name : payload.name
                       }
                   }


               }



        // teh register method

           var register = function(user)
          {
               return $http.post('/auth/register', user).success(function(data){
                   saveToken(data.token);
               })

          }



        // teh login method

           var login = function(user)
           {
               return $http.post('/auth/login', user).success(function(data){
                   saveToken(data.token);
               })

           }





    }//end of function



    ])//end of service