var express = require('express')
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://icetruc91:Highland91@ds215822.mlab.com:15822/webdevmadness');


var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});




var session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

app.get('/', function(req,res) {
    res.send("Hello World");
})


app.get('/api/session/set/:name/:value',
    setSession);
app.get('/api/session/get/:name',
    getSession);


function setSession(req, res) {
    var name = req.params['name'];
    var value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}

function getSession(req, res) {
    var name = req.params['name'];
    var value = req.session[name];
    res.send(value);
}

var userModel = require('./models/user/user.model.server');
var sectionModel = require('./models/section/section.model.server');


var users = [];
    userModel.findAllUsers()
        .then(function(users) {
            console.log(users);
        });
console.log(users);

var userService = require('./services/user.service.server');
userService(app);

var sectionService = require('./services/section.service.server.js');
sectionService(app);

var questionService = require('./services/question.service.server');
questionService(app);

var quizService = require('./services/quiz.service.server');
quizService(app);

var submissionService = require('./services/submission.service.server');
submissionService(app);


// require('./services/quiz.service.server')(app);

app.listen(process.env.PORT || 3000);

// process.env.PORT ||