var  SuperTset = require('supertest');
var should = require('should');

//déclarer un agent réfere au port du programme dans laquelle excute le programme
var server = SuperTset.agent('http://localhost:3000/');


var app  = require(__dirname + '' +
    '/../server.js');
var port = 3333;


var assert = require('assert');

var request = require('supertest');

var http = require('http');


function defaultGetOptions(path) {
    var options = {
        "host": "localhost",
        "port": port,
        "path": path,
        "method": "GET",
        "headers": {
            "Cookie": sessionCookie
        }
    };
    return options;
}






describe('loading express', function () {
    var server;
    beforeEach(function () {
        server = require(__dirname + '' +
            '/../server.js');
    });
    afterEach(function () {
        server.close();
    });
    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });
    it('404 everything else', function testPath(done) {
        request(server)
            .get('/page/not_exist')
            .expect(404, done);
    });


    it('should retunr a 500 error', function(done){
        this.timeout(5000)
        request({
            method :'POST',
            url :'http://localhost:3000/auth/admin/reservations'
        }, function(eroor,response,body){
            expect(response.statusCode).equal(500);
            done();

        })
    })
});















/*describe('app', function () {

    before(function (done) {
        app.listen(3000, function (err, result) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });

        after(function (done) {
            app.close();
        });

        it('should exist', function (done) {
            should.exist(app);
            done();
        });

        it('should be listening at localhost:3000', function (done) {
            var headers = defaultGetOptions('/');
            http.get(headers, function (res) {
                res.statusCode.should.eql(404);
                done();
            });
        });

    })


})*/



/*describe('Sample unit tests', function () {
    function add(x, y){
        return x+y;
    }

    it('should return 5', function () {
        assert.equal(add(2,3), 5);
    });
})*/




/*it('should respond with an htmL file when root is requested', function (done) {
    request(server)
        .get('/')
        .expect(200)
        .end(function (err, response) {
            assert.equal(response.header['content-type'], 'text/html; charset=UTF-8');
            done();
        });
});*/



//test Pour home page
/*describe('homepage', function(){
    it('should respond to GET',function(done){
        server
            .get('http://localhost:'+3000)
            .end(function(res){
                expect(res.status).to.equal(200);
                done();
            })
    })*/


   /* it('should return 404', function(done){


        //calling home page
        server
            .get("/random")

            .expect(400) //http response
            .end(function(err,res){


                console.log('err' + JSON.stringify(err));
                //http statut doit etre 200
                res.status.should.equal(400);

                done();
            })

    })*/



//})













