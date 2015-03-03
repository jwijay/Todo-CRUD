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
app.use(methodOverride('_method'));
app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('list');
});

app.get('/new_todo', function(req, res) {
  res.render('new_todo');
});

app.post('/todos', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;

  var todo = new Todo(
  {
    title : title,
    description : description,
    is_done : false,
    created_at : new Date()
  });

  todo.save(function(err) {
    if(err) throw err;
    res.redirect('/');
  });
});

//methodOverride(getter, options)
//HANDLE DELETE ROUTE HERE
app.delete('/todos/:id', function() {
  //JK do it here
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Todo app listening at http://%s:%s', host, port);
});