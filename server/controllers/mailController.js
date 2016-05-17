
var nodemailer = require('nodemailer');
var mailOpts, smtpTrans;
//Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
smtpTrans = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
        user: "ahmed.bouhmid94@gmail.com",
        pass: "radhiabelhaj123A"
    }
});



//var mailgun = require('mailgun.js');
//var mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});
































module.exports.sendMail = function(req,res)
{

    //get the mail
    var mail_client = req.body.mail ;

    // get the subject
    var subject = req.body.object ;

    // get the text

    var text = req.body.text ;

    console.log("data recived is :" + mail_client + "" + subject + "" + text);





    //Mail options
    mailOpts = {
        from: "ahmed.bouhmid94@gmail.com",
        to: mail_client,
        subject: subject,
        text: text
    };
    smtpTrans.sendMail(mailOpts, function (error, response) {
        //Email not sent
        if (error) {
            console.log('error ' + error);
            res.json(error);
        }
        //Yay!! Email sent
        else {
            console.log('success ' + JSON.stringify(response));
            res.json("send succesfuly !");
        }
        smtpTrans.close();

    })


}
















module.exports.sendMailClient_Agence = function(req,res)
{

    //get the data
    var email = req.body.email ;
    var nom = req.body.nom ;
    var text = req.body.text ;


    console.log('we recived data ' + email + ' ' + nom + ' text' + text);




    //Mail options
    mailOpts = {
        from: email,
        to: "ahmed.bouhmid94@gmail.com",

        text: text
    };
    smtpTrans.sendMail(mailOpts, function (error, response) {
        //Email not sent
        if (error) {
            console.log('error ' + error);
            res.json(error);
        }
        //Yay!! Email sent
        else {
            console.log('success ' + JSON.stringify(response));
            res.json("send succesfuly !");
        }
        smtpTrans.close();

    })



}








module.exports.Newsletter = function(req,res)
{
    //get the mail
    var mail_client = req.body.email ;



    console.log("data recived is :" + mail_client );





    //Mail options
    mailOpts = {
        from: "ahmed.bouhmid94@gmail.com",
        to: mail_client,
        subject: 'newsleeter King Rent Car !',
        text: 'vous etes abonné a notre newsleeter'
    };
    smtpTrans.sendMail(mailOpts, function (error, response) {
        //Email not sent
        if (error) {
            console.log('error ' + error);
            res.json(error);
        }
        //Yay!! Email sent
        else {
            console.log('success ' + JSON.stringify(response));
            res.json(response);
        }
        smtpTrans.close();

    })


}












