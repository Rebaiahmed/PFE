var htmlToPdf = require('html-to-pdf');
htmlToPdf.setInputEncoding('UTF-8');
htmlToPdf.setOutputEncoding('UTF-8');
 //Some HTML String from code above

htmlToPdf.convertHTMLString('Create_Facture.html', 'ahmed.pdf',
    function (error, success) {
        if (error) {
            console.log('Oh noes! Errorz!');
            console.log(error);
        } else {
            console.log('Woot! Success!');
            console.log(success);
        }
    }
);