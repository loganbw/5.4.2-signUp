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
const userId =[
  {
    'name': 'logan',
    'passWord': '1234'
  }

];

app.use((req,res,next) =>{
  if(!req.session.loginCheck){
    req.session.loginCheck = [];
    req.session.dataName = [];
  }
  next();
});

app.get('/', (req,res) =>{
  console.log(req.session);
  if (req.session.loginCheck[0] == 'true') {
    res.render("index", {dataName: req.session.dataName});
  }else {
    res.render('login');
  }

});

// app.post('/',(req,res) =>{
//
//   console.log(req.body);
//   res.render(req.body);
// });

app.post('/settingForm',(req,res) =>{
  let name = req.body.nameLogin;
  let pass = req.body.passLogin;
  userId.forEach(function(user){
    if (user.name === name && user.passWord === pass ) {
      req.session.loginCheck.push('true');
      req.session.dataName.push(user.name);
      console.log(user);
      res.redirect('/')
    }else {
      res.redirect('/');
    }
  });


  //console.log(req.session.name);


});


// app.get('/loggedIn', (req,res) =>{
//   res.render('loggedIn');
// });


app.listen(3000);
