var wkhtmltopdf = require('wkhtmltopdf');
//var wkhtmltopdf = require('../lib/wkhtmltopdf')

// Add some options
var options = [
    '--grayscale',
    '--quiet'
]

// Convert the Google.com HTML page to PDF
var input = 'https://google.com'

var convertHtmlToPdf = function (req, res) {
    // Exec WKHTMLTOPDF
    var pdf = wkhtmltopdf(options, input)

    // Pipe stdout directly to res (pipe where you want)
    pdf.stdout.pipe(res)

    // Listener stderr error event
    pdf.stderr.on('data', function (err) {
        console.log('There was an error: ' + err)
    })

    // Listener error event
    pdf.on('error', function (err) {
        console.log('Error:' + err)
    })

    // Listener close event
    pdf.on('close', function (code) {
        console.log('WKHTMLTOPDF closed with code: ' + code)
    })

    // Listener exit event
    pdf.on('exit', function (code) {
        console.log('WKHTMLTOPDF exited with code: ' + code)
    })
}


