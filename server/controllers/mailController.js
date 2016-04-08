
var nodemailer = require('nodemailer');







module.exports.sendMail = function(req,res)
{

    //get the mail
    var mail_client = req.body.mail ;

    // get the subject
    var subject = req.body.object ;

    // get the text

    var text = req.body.text ;

    console.log("data recived is :" + mail_client + "" + subject + "" + text);



// create the transporter object
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ahmed.bouhmid94@gmail.com',
            pass: 'radhiabelhaj123A'
        }
    });

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