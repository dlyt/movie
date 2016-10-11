var express = require('express');
var jade = require('jade');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session)
var path = require('path');
var bodyParser= require('body-parser');
var port = process.env.PORT || 3000;
var app = express();
var dbUrl = 'mongodb://localhost/imooc'
var morgan = require('morgan');


app.locals.moment = require('moment');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); 
app.use(require('connect-multiparty')());
app.use(cookieParser())
app.use(session({
    secret: 'imooc',
    store: new mongoStore({
      url: dbUrl,
      collection: 'sessions'
    })
}))

if('development' === app.get('env')){
  app.set('showStackError', true)
  app.use(morgan(':method :url :status'))
  app.locals.pretty = true
  mongoose.set('debug', true)
}

require('./config/routes')(app)

mongoose.connect(dbUrl)
app.set('views', './app/views/pages');
app.set('view engine', 'jade');

app.listen(port);

console.log("obj start on port"+ port);

