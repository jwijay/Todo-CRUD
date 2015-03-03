var express = require('express');
var bodyParser = require('body-parser');

//TODO: check if i need 'connect' or not
var connect = require('connect');
var methodOverride = require('method-override');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  title : String,
  description : String,
  is_done : Boolean,
  created_at : Date
});

var Todo = mongoose.model('Todo', todoSchema);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('list');
});


//methodOverride(getter, options)

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Todo app listening at http://%s:%s', host, port);
});