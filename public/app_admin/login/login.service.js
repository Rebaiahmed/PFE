
angular
    .module('adminApp').service('Authentication',['$http','$window', function($http,$window){


    /*
     define the function
     */
    var saveToken = function(token){
        $window.localStorage['admin-token']=token;
    }

    var getToken = function()
    {
        return  $window.localStorage['admin-token'];

    }

    var logout = function()
    {
        $window.localStorage.removeItem('admin-token');

    }
    var isloggedIn = function()
    {
        // get teh token and check it
        var token = getToken();

        var payload ; // the data is stored here

        if(token)
        {

            payload = token.split('.')[1];
            payload =$window.atob(payload);
            payload = JSON.parse(payload);
            return payload.exp > Date.now() / 1000;
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
            var payload = token.split('.')[1] // !!!!!!
            payload =$window.atob(payload);
            payload = JSON.parse(payload);


            // we will return an objectangular-permission
            return{
                email : payload.email,
                nom : payload.nom,
                role:payload.role
            }
        }


    }






    // the login method

    var login = function(user)
    {
        return $http.post('/auth/admin/admin', user)
            .success(function(data){
                saveToken(data.token);
            })
            .error(function(err){
                console.log('error in login !'+ err)
            })

    }


    // get data for user
    /*var getProfile = function () {
     return $http.get('/auth/profile', {
     headers: {
     Authorization: 'Bearer '+ getToken()
     }//end of headers
     }); // end of return


     }; // end of function*/




    return {
        saveToken: saveToken,
        getToken : getToken,
        logout :logout,
        isloggedIn :isloggedIn,
        currentUser :currentUser,
        //register :register,
        login :login,
        //getProfile :getProfile



    }


}//end of function of service



])//end of service