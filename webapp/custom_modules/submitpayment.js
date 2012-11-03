var express = require("express");

var stripeApiKey = "sk_test_CM4WZXO8TTKVsY27xUNNmswz";
var stripeApiKeyTesting = "sk_test_CM4WZXO8TTKVsY27xUNNmswz"
var stripe = require('stripe')(stripeApiKey);

app = express.createServer(express.bodyParser);

app.post("/plans/kitchenly", function(req, res) {
  stripe.customers.create({
    card : req.body.stripeToken,
    email : "thomasbartlett@mail.weber.edu", // customer's email (get it from db or session)
    plan : "kitchenly"
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