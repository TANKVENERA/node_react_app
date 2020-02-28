const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user.route');
const ad = require('./routes/ad.route');

mongoose.connect('mongodb://localhost/autobox',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, (err) => {
        if (!err) {
          console.log('connected successfully!')
        }
    });

const app = express();
app.use(bodyParser.json());
app.use('/users', user);
app.use('/ads', ad);

let port = 333;

app.listen(port, () => {
  console.log('Server is running on port number ' + port);
});