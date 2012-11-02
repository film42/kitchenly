
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , enr = require('express-named-routes');

var app = module.exports = express.createServer();
    enr.extend(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/results', routes.searchResults);
app.get('/user', routes.user);

app.defineRoute('/blog', '/blog');
app.defineRoute('/blog/:id', '/blog/:id');
app.defineRoute('/blog/new', '/blog/new');

app.get(app.lookupRoute('/blog'), function(req,res) {
  res.send("hello");
});

app.get(app.lookupRoute('/blog/:id'), function(req,res) {
  res.send(req.params.id);
});

app.get(app.lookupRoute('/blog/new'), function(req,res) {
  res.send("new");
});
/*
app.get('/search', routes.index);

app.get('/users', routes.index);
app.get('/user/:username', routes.index);
app.get('/user/:username', routes.index);
app.get('/user/:username/reservations', routes.index);
app.get('/user/:username/reservations/new', routes.index);

app.get('/venues', routes.index);
app.get('/venue/:id', routes.index);
app.get('/venue/:id/reservations', routes.index);
app.get('/venue/:id/reservations/checkout', routes.index);
app.get('/venue/:id/menu', routes.index);
app.get('/venue/:id/menu/:id', routes.index); // NEEDED????

app.get('/login', routes.index);
app.get('/logout', routes.index);
app.get('/register', routes.index);
*/
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
