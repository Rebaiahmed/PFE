var email   = require("emailjs/email");
var server  = email.server.connect({
    user:    "ahmed.bouhmid94@gmail.com",
    password:"radhiabelhaj123A",
    host:    "smtp.gmail.com",
    ssl:     true
});

// send the message and get a callback with an error or details of the message that was sent
server.send({
    text:    "i hope this works",
    from:    "you <ahmed.bouhmid94@gmail.com>",
    to:      "someone <ahmed.bouhmid94@gmail.com>",

    subject: "testing emailjs"
}, function(err, message) { console.log(err || message); });





































module.exports.sendMail = function(req,res)
{

    //get the mail
    var mail_client = req.body.mail ;

    // get the subject
    var subject = req.body.object ;

    // get the text

    var text = req.body.text ;

    console.log("data recived is :" + mail_client + "" + subject + "" + text);





    //send the mail
    transporter.sendMail({
        from: 'ahmed.bouhmid94@gmail.com',
        to: mail_client,
        subject: subject,
        text: text
    }, function(err,response){
        if(err)
        {
            console.log('err !' + err)
            res.json(err);
        }
        else{
            console.log('response'+ JSON.stringify(response));
            res.json(response);
        }
    });


}
















module.exports.sendMailClient_Agence = function(req,res)
{


    //le nom du client
    var nom = req.body.nom ;
    //get the mail
    var mail_client = req.body.email ;

    //sujet de contact
    var sujet = req.body.sujet ;


     //message message
    var message = req.body.message ;
console.log('data recived is ' + nom + ' ' + mail_client + ' ' + sujet + ' ' + message);





    //send the mail
    transporter.sendMail({
        from: 'ahmed.bouhmid94@gmail.com',
        to: 'ahmed.bouhmid94@gmail.com',
        subject: sujet,
        text: message
    }, function(err,response){
        if(err)
        {
            console.log('err !' + err)
            res.json(err);
        }
        else{
            console.log('response'+ JSON.stringify(response));
            res.json(response);
        }
    });









}





















