const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user.route');
const adRoute = require('./routes/ad.route');
const session = require('express-session');
const {v4: uuidv4}   = require('uuid');
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

app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    genid:function(req){
        return uuidv4();
    },
}));
app.use(bodyParser.json());
app.use('/users', userRoute);
app.use('/ads', adRoute);

let port = 5000;

app.listen(port, () => {
  console.log('Server is running on port number ' + port);
});