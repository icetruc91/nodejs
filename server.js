var express = require('express')
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect(process.env.MLAB_URI);


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "https://webdev-madness.herokuapp.com");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});




var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));



app.get('/api/session/set/:name/:value',
    setSession);
app.get('/api/session/get/:name',
    getSession);
// app.get('/api/session/get',
//   getSessionAll);
// app.get('/api/session/reset',
//   resetSession);

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
// userModel.createUser({
//     username:'bob', password: 'bob'
// });

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

// require('./services/section.service.server')(app);


app.listen(process.env.PORT || 3000);
