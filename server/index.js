let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let redirect = require('express-redirect');
let db = require('../database-mongo/index.js');
let Users = require('./Models/users');
let Jobs = require('./Models/jobs');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let expressValidtor = require('express-validator');
let mongoStore = require('connect-mongo')(session);


// It generates a unique id for the session
let generateSecret = function (){
	let j, x;
	let random = "fbCvIfNEjwiHNHz7nna3VI5Q67JQ6L5d3wu"
	for (let i = random.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = random[i];
		random[i] = random[j];
		random[j] = x;
	}
	return random.join('');
};

let app = express();
redirect(app);

// Connects the server with client side
app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidtor());
app.use(session({
	secret: generateSecret(),
	saveUninitialized: false,
	resave: false,
	store:new mongoStore({mongooseConnection: mongoose.connection}),
	cookie:{maxAge: 180*60*1000}
}));

// Renders all the jobs
app.get('/jobs', function(req, res){
	Jobs.allJobs(function(err, jobs){
		if(err){
			throw err;
		} else {
			res.send(jobs);
		}
	});	
});

app.get('/logged', function(req, res){
	if(req.session.userName){
		res.send(true)
	}else{
		res.send(false)
	}
});

// Renders the jobs for each individual user
app.get('/userJobs', function(req, res){
	Jobs.jobByUserName({"user": req.session.userName}, function(err, job){
		if(err){
			throw err;
		} else {
			res.send(job);
		}
	});
});

app.post('/userJob', function(req, res){
		Jobs.getUserJob(req.body.jobTitle, req.body.user, function(err, user){
		if(err){
			throw err;
		} else {

			res.send(user);
		}
	});
});

// Updates the user job
app.put('/updateUserJob', function(req, res){
	Jobs.updateUserJob(req.body.jobTitle, req.body.states.user, req.body.states, function(err, user){
		if(err){
			throw err;
		} else {

			res.send(user);
		}
	});
});

app.get('/userInfo', function(req, res){
		Users.getUserInfo(req.session.userName, function(err, user){
		if(err){
			throw err;
		} else {
			res.send(user);
		}
	});
});

// Updates the user information
app.put('/updateUser', function (req, res) {
	let query = req.session.userName;
	let updatedData = req.body;
	console.log(updatedData)
	Users.updateUsers(query, updatedData, function(err, users){
		if(err){
			throw err;
		} else {
			res.send(users);
		}
	});
});

// Sends the user information to the database
app.post("/signup",function(req, res){
	let user = req.body
	Users.createUsers(user, function(err, userdata){
		if(err){
			throw err;
		} else {
			res.send(userdata);
		}
	});
});

// Destroys sessions when logout
app.get('/logout', function (req, res) {
	req.session.destroy();
	res.redirect('/');
});

// Checks the user information; if it already exists, it will create a session
app.post('/login', function (req, res) {
	Users.getUser(req.body.userName, req.body.password, function(err, user){
		if(err){
			res.send(err);
		} else {
			req.session.userName = user.userName;
			res.locals.login = user;
			res.locals.session = req.session;
			res.redirect('/');
		}
	});
});

// Creates a new job
app.post('/job', function(req, res){
	Jobs.createJob(req.session.userName, req.body, function(err,jobs){
		if(err){
			throw err;
		} else {	
			res.send(jobs);
		}
	})
});

//it searches jobs by title
app.post('/someJobs', function (req, res) {
	Jobs.findSome(req.body.query, function(err, jobs){
		if(err){
			throw err;
		} else {
			res.send(jobs);
		}
	});
});

//it searches jobs by category
app.post('/jobCategory', function (req, res) {
	Jobs.jobsByCategory({"category":req.body.category}, function(err, job){
		if(err){
			throw err;
		} else {
			res.send(job);
		}
	});
});

//?
app.delete('/:jobTitle', function(req, res){
	Jobs.deleteJob(req.body.jobTitle, function(err, job){
		if(err){
			throw err;
		} else {
			res.send(job);
		}
	});
});

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  console.log('listening on port ', app.get('port'));
});

