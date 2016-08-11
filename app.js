var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var debug = require('debug')('pgo-webhook:server');

var pokemon = require('./routes/pokemon');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/pokemon', pokemon);

// Start server ****************************
app.listen(3000, function(err) {
  if (err !== undefined) {
    console.log('Error on startup, ',err);
  }
  else {
    console.log('Listening on port 3000');
  }
});
