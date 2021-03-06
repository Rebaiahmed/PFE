var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

//les routes du projet

var routes = require('./routes/api.js');


var helmet = require('helmet')








var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));




//utiliser helmet pour sécruiser
app.use(helmet())
//to disable client-side caching
app.use(helmet.noCache())
// to prevent clickjacking
app.use(helmet.frameguard())
//xssFilter
//adds some small XSS protections
app.use(helmet.xssFilter())








// THE ROUTING MIDDELWARE //
app.use('/', routes);




/* config the authentifcation */






//
var cors = require('cors')
app.use(cors());


app.use(cors({
  origin: true,
  credentials: true
}))




//catch the 401 aunothorized
app.use(function(err,req,res,next){
  if(err.name="UnauthorizedError")
  {
    res.status(401);
    console.log('401 !' + JSON.stringify(err));
    res.json({"error" :err.name + " :" +  err.message});

next();
  }
})



// error handlers

// development error handler
// will print stacktrace

  /*app.use(function(err, req, res, next) {
    res.status(404);
    console.log('404 !');
     res.sendFile('/home/ahmed/WebstormProjects/login_pfe/views/404.html')
  });*/
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404);
  res.render('404')

});



///500 page
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(500);
    res.render('500')
  });
}






//middelware

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});



/*
 run the server and listen to the port
 */




app.set('port',process.env.PORT | 3000);



var server = require('http').Server(app);
var io = require('socket.io')(server);


//store the socket.io in the app container
app.set('socketio', io);

//store the server in the app
app.set('server', server);



/*
si l'admin est connectée
 */




server.listen(3000, function()
{
  console.log('server runnung in port 3000 !');
})

/*io.set('transports', ['websocket', 'xhr-polling', 'jsonp-polling', 'htmlfile', 'flashsocket']);
io.set('origins', '*:*');*/












io.sockets.on('connection', function(socket, user ){



  socket.on('admin_online', function(user ){

    console.log("l'admin est connecte !");

    socket.broadcast.emit('client');
  })


  //quna l'amdin envoie un message


  socket.on('admin_message', function(msg ){

    console.log("msg d'apres l'aadmin !",msg);

    socket.broadcast.emit('client_recive', msg);
  })



  /*
  _-___--_-_-_-_-_-_-_-_--_
   */


  socket.on('client_message', function(msg ){

    console.log("msg d'apres le client !",msg);

    socket.broadcast.emit('admin_recive', msg);
  })




})











module.exports = server;
