var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static('public'));
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});
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
var Complain=mongoose.model('complain',complainSchema);
module.exports=Complain;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
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
  res.redirect('/')
});
app.set(;port;,(process.env.PORT || 5000));
var server = app.listen(app.get('port'), function () {
   
   console.log("listening at http://%s:%s", host, port)
})
