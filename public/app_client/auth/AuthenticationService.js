/*
define our service
 */

angular
    .module('meanApp')
    .service('Authentication',['$http','$window', function($http,$window){


        /*
        define the function
         */
        var saveToken = function(token){
           $window.localStorage['client-token']=token;
        }

        var getToken = function()
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
             var token = getToken();

             var payload ; // the data is stored here

             if(token)
             {
                 console.log('token exist ' + token);
                 payload = token.split('.')[1];
                 payload =$window.atob(payload);
                 payload = JSON.parse(payload);

                  console.log((payload.exp >Date.now() /1000))
                 //return payload.exp >Date.now() /10000;  // a expliquer
                 return true;

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

                       var token = getToken();
                       payload =$window.atob(payload);
                       payload = JSON.parse(payload);
                       console.log('currentUser the payload is :' +payload);

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



        // the login method

           var login = function(user)
           {
               return $http.post('/auth/login', user)
                   .success(function(data){
                   saveToken(data.token);
                                  })
                   .error(function(){
                       console.log('error in login !')
                   })

           }


        // get data for user
        var getProfile = function () {
            return $http.get('/auth/profile', {
                headers: {
                    Authorization: 'Bearer '+ getToken()
                }//end of headers
            }); // end of return


        }; // end of function




        return {
            saveToken: saveToken,
            getToken : getToken,
            logout :logout,
            isloggedIn :isloggedIn,
            currentUser :currentUser,
            register :register,
            login :login,
            getProfile :getProfile



        }


    }//end of function of service



    ])//end of service