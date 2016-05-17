var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync("/home/ahmed/WebstormProjects/login_pfe/public/app_admin/factures/Create_Facture.html",'utf8');
var options = {

    "directory": "ahmed/home/Bureau",
    format: 'Letter', "border": {
    "top": "2in",            // default is 0, units: mm, cm, in, px
    "right": "1in",
    "bottom": "2in",
    "left": "1.5in"
},
    "header": {
        "height": "45mm",

    },

    "footer": {
        "height": "28mm",

    },
    "base": "file:///home/www/bower_components/materialize/dist/css/materialize.css", };


pdf.create(html, options).toStream( function(err, stream) {
    if (err) return console.log(err);
    stream.pipe(fs.createWriteStream('/home/ahmed/Bureau/foufou.pdf'));
});