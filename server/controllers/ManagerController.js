var models  = require('../models/index.js');
var Manager = models.Manager ;




exports.getManagers = function(req,res)
{

    Manager.findAndCountAll().then(function(result){
        res.json(result.rows);
    })


}



exports.addManager = function(req,res)
{
    //ge the necessary data
    var nom = req.body.nom ;
    var login = req.body.email ;
    var password = req.body.password ;

    //affiche dans le console avant l'affichage
    console.log('data recived ' + nom + ' ' + login+ ' ' + password);

    //we must chek the email
    Manager.findOne({where :{email :login}}).then(function(mg) {
        if (mg) {
            res.json({"err_create": "CREATE_ALREADY_HAVE_ACCOUNT"});
        }


        else {
            var manager = Manager.build({
                email: login,
                nom: nom
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
                    console.log('error :' + err);
                   res.json(err);
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

                manager.save().then(function(result){
                   res.json(result);
                })




            }

            else
            {
                res.json({"msg" :"no Manager Found!"})
            }



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
                res.json({"message": "Manager deletd deleted !"})
            }
            else{
                res.json({"message": "No Manager found !"})
            }



        })


}





