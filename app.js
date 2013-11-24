
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var home = require('./routes/home.js');
var customer = require('./routes/customer.js');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.use(express.bodyParser( {uploadDir: path.join(__dirname, 'public/images')} ));
console.log(path.join(__dirname, 'public/images'));
app.use(express.methodOverride());
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public/')));

console.log("The path is: " + path.join(__dirname, 'public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//localhost:3000
app.get('/', home.index);

//localhost:3000/customer
app.get('/customer', customer.index);

//localhost:3000/customer/create
app.get('/customer/create', customer.create); //(do not move this line after '/customer/:id')

//localhost:3000/customer/create + (fill the form and submit it)
app.post('/customer/create', customer.createCustomer);

//localhost:3000/customer/1
app.get('/customer/:id', customer.details);

//localhost:3000/customer/1 (this URI is generated only by AJAX. See 'customer/index.jade')
app.delete('/customer/:id', customer.delete);

//localhost:3000/customer/edit/1
app.get('/customer/edit/:id', customer.edit);

//localhost:3000/customer/edit/1 + (edit the fields in form and submit it)
app.put('/customer/:id', customer.editCustomer);





//================= not neccessary ===========================================

//app.get('/', routes.index);
app.get('/users', user.list);

//localhost:3000/customer?id=1
app.get('/customer', function(req,res){
    res.send('Customer selected is ' + req.query.id);
});

//localhost:3000/range/100..300
app.get(/^\/range\/(\d+)(?:\.\.(\d+))?$/, function(req,res){
    var from = req.params[0];
    var to = req.params[1];
    res.send('Range of values using regular expressions for /range/ ' + from + '..' + to);
});

//localhost:3000/empty
app.get('/empty', function(req,res){
    res.render('empty')
});

//Defining custom block layout:
//localhost:3000/my_layout
app.get('/my_layout', function(req,res){
    res.render('view_my', {layout: 'layout_my'})
});

//================= not neccessary ===========================================

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
