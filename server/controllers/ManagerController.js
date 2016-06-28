var models  = require('../models/index.js');
var Manager = models.Manager ;




exports.getManagers = function(req,res)
{

    Manager.findAndCountAll()
        .then(function(result){
        res.json(result.rows);
        }).catch(function(err){
            throw err
        })


}



exports.addManager = function(req,res)
{
    //ge the necessary data
    var nom = req.body.Username ;
    var login = req.body.email ;
    var password = req.body.password ;
var role = req.body.role ;
    //we must chek the email
    Manager.findOne({where :{email :login}}).then(function(mg) {
        if (mg) {
            res.status(400).json({"err_create": "CREATE_ALREADY_HAVE_ACCOUNT"});
        }


        else {
            var manager = Manager.build({
                email: login,
                Username: nom,
                role : role
            })

            manager.setPassword(password);

           manager.save()
                .then(function(){
                    var token ;
                    token = manager.generateJwt();

                    //send the tokne to the front-end system
                    res.status(200).json({
                        "token" : token
                    })

                })
                .catch(function(err){

                  throw err;
                })

        }//end of else


    })//end of findOne





        }





exports.updateManager = function(req,res)
{

    var id = req.params.idManager ;
    //ge the necessary data
    var nom = req.body.nom ;
    var login = req.body.login ;
    var password = req.body.password ;
    //findById
    //updateIt
    Manager.findById(id)
        .then(function(manager){


            if(manager)
            {
                manager.setPassword(password);

                manager.nom = nom,
                    manager.email = login

                manager.save()
                    .then(function(result){
                   res.json(result);
                   }).catch(function(err){
                        throw err;
                    })




            }

            else
            {
                res.status(404).json({"msg" :"no Manager Found!"})
            }



        }).catch(function(err){
            throw err;
        })


}


exports.deleteManager = function(req,res)
{

    var id = req.params.idManager ;
    //findById
    //delete It

    Manager.findById(id)
        .then(function(result){


            if(result)
            {
                Manager.destroy({
                    where: {
                        'idManager': id
                    }
                })
                res.json({"message": "Manager deleted !"})
            }
            else{
                res.status(404).json({"message": "No Manager found !"})
            }



        }).catch(function(err){
            throw err;
        })


}





