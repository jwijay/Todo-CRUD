var express = require('express');
var bodyParser = require('body-parser');

//TODO: check if i need 'connect' or not
var connect = require('connect');
var methodOverride = require('method-override');
var app = express();

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI);
// mongoose.connect('mongodb://localhost/todo');
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
  var done_count = 0, not_done_count = 0;
  
  Todo.find(function(err, todos) {
    // todos.map(function(todo) {
    //   if (todo.is_done) {
    //     done_count++;
    //   } else {
    //     not_done_count++;
    //   }
    // });

    Todo.count({is_done : true}, function(err, done_count2) {

      Todo.count({is_done : false}, function(err, not_done_count2) {

        if (err) throw err;
        res.render('list', {
          todos : todos, 
          done_count : done_count2, 
          not_done_count : not_done_count2
        });

      });

    });

  });

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
    if (err) throw err;
    res.redirect('/');
  });
});

app.delete('/todos/:_id', function(req, res) {
  var _id = req.params._id || "";
  Todo.findOneAndRemove({"_id" : _id}, function(err) {
    if (err) throw err;
    res.redirect('/');
  });
});

app.put('/todos/:_id/complete', function(req, res) {
  var _id = req.params._id || "";
  Todo.findOneAndUpdate({"_id" : _id}, {$set : {is_done : true}}, function(err) {
    if (err) throw err;
  });
}, 
function(req, res) {
  
  Todo.find(function(err, todos) {

    Todo.count({is_done : true}, function(err, done_count) {

      Todo.count({is_done : false}, function(err, not_done_count) {

        if (err) throw err;
        res.render('list', {
          todos : todos, 
          done_count : done_count, 
          not_done_count : not_done_count
        });

      });

    });

  });

});

app.put('/todos/:_id/uncomplete', function(req, res) {
  var _id = req.params._id || "";
  Todo.findOneAndUpdate({"_id" : _id}, {$set : {is_done : false}}, function(err) {
    if (err) throw err;
    res.send('OK');
  });
}, 
function(req, res) {
  
  Todo.find(function(err, todos) {

    Todo.count({is_done : true}, function(err, done_count) {

      Todo.count({is_done : false}, function(err, not_done_count) {

        if (err) throw err;
        res.render('list', {
          todos : todos, 
          done_count : done_count, 
          not_done_count : not_done_count
        });

      });

    });

  });

});

app.get('/todos/:_id/edit', function(req, res) {
  var _id = req.params._id || "";
  Todo.findOne({"_id" : _id}, function(err, todo) {
    if (err) throw err;
    res.render('update_todo', {todo : todo});
  });
});

app.put('/todos/:_id?', function(req, res) {
  var _id = req.params._id || "";
  var title = req.body.title;
  var description = req.body.description;

  Todo.findOneAndUpdate({"_id" : _id}, {$set : {title : title, description : description}}, function(err) {
    if (err) throw err;
    res.redirect('/');
  });
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  // var host = server.address().address;
  // var port = server.address().port;

  // console.log('Todo app listening at http://%s:%s', host, port);
});