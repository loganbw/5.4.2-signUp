const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
//--------------------------------
const app = express();
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set("view engine", 'handlebars');
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('combined'));
app.use(session({
  secret:"rowOfKeys",
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req,res) =>{
  res.render('index');
});



app.listen(3000);
