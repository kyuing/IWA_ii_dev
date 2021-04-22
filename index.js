//https://stackoverflow.com/questions/40546231/sh-react-scripts-command-not-found-after-running-npm-start
//https://github.com/yarnpkg/yarn/issues/5240

const http = require('http'),
// axios = require('axios'),
logger = require('morgan'),
cors = require('cors'),
express = require('express'),
bodyParser = require('body-parser'),
// path = require('path'),
dotenv = require('dotenv'),
mongoose = require('mongoose'); 

var app = express();
var port = process.env.PORT || 8000;

// Middlewares 
dotenv.config();
app.use(logger('tiny'));   // app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))  // get our app to use body parser 
app.use(express.urlencoded({ extended: true })); //We allow the data sent from the client to be coming in as part of the URL in GET and POST requests
app.use(bodyParser.json());
app.use(require('./routes'));  //import routes.js

app.listen(port, function(err){
    console.log('Listening on port: ' + port);
});

const dbURI = process.env.DB_URL;
mongoose.connect(dbURI, { 
  useNewUrlParser: true, 
  useFindAndModify: false,
  useUnifiedTopology: true 
}).then((result) => console.log('connected to db')).catch((err) => console.log(err));