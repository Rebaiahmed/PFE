var PDFKit= require('pdfkitjs'); // add pdfkit module to access it
pdf = new PDFKit('url', 'http://google.com');

pdf.toFile('ahmedTest.pdf', function (err, file) {

    console.log('err' + err)
    console.log('File ' + file + ' written');
});