var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static('public'));
var mongoose = require('mongoose');
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://james:james@ds031607.mlab.com:31607/complainportal';
var sql_url="sql6.freemysqlhosting.net:3306"
//var con=mysql.createConnection({
//	host: "sql6.freemysqlhosting.net:3306/",
//	user:"sql6141657",
//	password: "L9yBHXjJdb"
//});
//con.connect(function(err){
//  if(err){
//    console.log('Error connecting to Db',err);
//    return;
//  }
//  console.log('Connection established');
//});
mongoose.connect(url, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected',url);
});
// Use connect method to connect to the Server
var Schema = mongoose.Schema;
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// create a schema
var complainSchema = new Schema({
  name: String,
  email: String,
  date: Date,
  hostel: String,
  issue: String,
  type: String,
  Status: String,
  rollno:String
});
var staffSchema=new Schema({
  name: String,
  email: String,
  job: String,
  password: String
});
var Complain=mongoose.model('complain',complainSchema);
module.exports=Complain;
var Staff=mongoose.model('staff',staffSchema);
module.exports=Staff;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/templates/" + "index.html" );
})
app.get('/hostel.htm', function (req, res) {
   res.sendFile( __dirname + "/templates/" + "a.html" );
})
app.get('/form.htm', function (req, res) {
   res.sendFile( __dirname + "/templates/" + "y.html" );
})
app.get('/signup', function (req, res) {
   res.sendFile( __dirname + "/templates/" + "register.html" );
})
app.get('/signin', function (req, res) {
   res.sendFile( __dirname + "/templates/" + "login.html" );
})
app.get('/profile.htm', function (req, res) {
   res.sendFile( __dirname + "/templates/" + "profile.html" );
})
app.post('/saveComplain',urlencodedParser, function(req, res){
   data = Complain({
      name:req.body.name,
      email:req.body.email,
      date: Date.now(),
      type: req.body.type,
      hostel: req.body.hostel,
      issue: req.body.issue,
      rollno: req.body.rollno,
      Status: "left"
   });
   data.save(function(err) {
  if (err) throw err;

  console.log('Complain Added');
  });
 res.redirect('/');
});
app.post('/signup',urlencodedParser, function (req, res,next) {
    var data = Staff({
       name:req.body.name,
       email:req.body.email,
       password:req.body.password,
       job: req.body.job
   });
	data.save(function(err) {
  if (err) throw err;

  console.log('user added');
  });
 res.redirect('/signin');

});

app.post('/signin',urlencodedParser, function (req, res, next) {
   var email = req.body.email;
   var pass = req.body.pass;

   Staff.findOne({email: email, password: pass}, function(err, user) {
      if(err) return next(err);
      if(!user) return res.redirect('/');
      console.log("user login");
      req.session.user = email;
      return res.redirect('/');
   });
});

app.get('/logout', function (req, res) {
   req.session.user = null;
});
var server = app.listen(process.env.PORT || 8095, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
