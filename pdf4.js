var fs = require('fs');
var ipp = require('ipp');

fs.readFile('/home/ahmed/Bureau/test.pdf', function(err, data) {
    if (err)
        throw err;

    var printer = ipp.Printer("http://YOUR.PRINTER.SERVER.HOSTNAME:631/ipp/printer");
    var msg = {
        "operation-attributes-tag": {
            "requesting-user-name": "William",
            "job-name": "My Test Job",
            "document-format": "application/pdf"
        },
        data: data
    };
    printer.execute("Print-Job", msg, function(err, res){
        console.log(res);
    });
});