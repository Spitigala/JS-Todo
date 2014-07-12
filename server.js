// setup ======
var express = require('express');
var app = express();
var mongoose = require('mongoose');


// config ======

mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu');

app.configure(function(){
		app.use(express.static('/public'));
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
});

// model ======

var Todo = mongoose.model('Todo', {
		text: String
});

// routes ======

		// api ------
		// get all todos
		app.get('/api/todos', function(req, res){

				// use mongoose to get all todos in the DB
				Todo.find(function(err, todos){
						// if there is an error, send error.
						if (err)
								res.send(err)

						res.json(todos); // return all todos in json format		
				});
		});

		// create a todo and send back all todos after creation

		app.post('/api/todos', function(req, res){

				// create a todo, information comes from ajax request from angular
				Todo.create({
						text : req.body.test,
						done: false
				}, function(err, todo) {
					if (err)
							res.send(err);

						// get and return all todos after you create one
						Todo.find(function(err, todos){
								if (err)
									res.send(err);
								res.json(todos);
						});	
				});

		});

		// delete a todo

		app.delete('/api/todos/:todo_id', function(req, res) {
				Todo.remove({
						_id : req.params.todo_id
				}, function(err, todo) {
						if (err)
							res.send(err);

					// get and return all todos after deleting one
						Todo.find(function(err, todos){
								if (err)
										res.send(err);
								res.json(todos);
						});
				});
		});


		// application ------

		app.get('*', function(req, res){
				res.sendfile('./public/index.html'); // load single view file
		});

// listen (start app with node server.js) ======

app.listen(8080);
console.log("App listening on port 8080");