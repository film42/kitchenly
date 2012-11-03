
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


/***********************************
        Defined Routes
***********************************/
app.defineRoute('search', '/search');
app.defineRoute('payment', '/payment');

app.defineRoute('user', {
  index: '/user/:username',
  reservations: '/user/:username/reservations/:id',
  new_reservation: '/user/:username/reservations/:id/new'
});

app.defineRoute('venue', {
  index: '/venue/:id',
  reservations: '/venue/:id/reservations',
  checkout: '/venue/:id/reservations/checkout',
  menu: '/venue/:id/menu',
  new_meal: '/venue/:id/menu/new'
});

app.defineRoute('auth', {
  login: '/login',
  logout: '/logout',
  register: '/register'
});

app.defineRoute('/blog/:id', '/blog/:id');
app.defineRoute('/blog/new', '/blog/new');

/***********************************
        Routes in Use
***********************************/
app.get('/', routes.index);
app.get('/payment', routes.payment);
// Users
app.get(app.lookupRoute('user.index'), routes.user_index);
app.get(app.lookupRoute('user.reservations'), routes.user_reservations);
app.get(app.lookupRoute('user.new_reservation'), routes.user_new_reservations);
// Venues
app.get(app.lookupRoute('venue.index'), routes.venue_index);
app.get(app.lookupRoute('venue.reservations'), routes.venue_reservations);
app.get(app.lookupRoute('venue.checkout'), routes.venue_checkout);
app.get(app.lookupRoute('venue.menu'), routes.venue_menu);
app.get(app.lookupRoute('venue.new_meal'), routes.venue_new_meal);
// Auth
app.get(app.lookupRoute('auth.login'), routes.login);
app.get(app.lookupRoute('auth.logout'), routes.logout);
app.get(app.lookupRoute('auth.register'), routes.register);


app.get(app.lookupRoute('search'), routes.search);

var stripeApiKey = "sk_test_CM4WZXO8TTKVsY27xUNNmswz";
var stripeApiKeyTesting = "sk_test_CM4WZXO8TTKVsY27xUNNmswz"
var stripe = require('stripe')(stripeApiKey);

app.post("/payment", function(req, res) {
  stripe.charges.create({
    card : req.body.stripeToken,
    description : "thomasbartlett@mail.weber.edu", // customer's email (get it from db or session)
    amount: req.body.amount,
    currency:req.body.currency
  }, function (err, customer) {
    if (err) {
      var msg = customer.error.message || "unknown";
      res.send("Error while processing your payment: " + msg);
    }
    else {
      var id = customer.id;
      console.log('Success! Customer with Stripe ID ' + id + ' just signed up!');
      // save this customer to your database here!
      res.send('ok');
    }
  });
});



app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
