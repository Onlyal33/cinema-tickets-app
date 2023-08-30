const express = require('express');
const api = require('./api');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(bodyParser.json());
app.use('/api', api);

app.listen(port, isProduction ? '0.0.0.0' : 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at:' + port);
});
