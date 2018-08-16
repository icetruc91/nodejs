module.exports = function (app){

    // User Services
    // app.get('/api/session/set/:name/:value', setSession);
    app.post('/api/login', login);
    app.get('/api/user/:username/username/:password/password', findUserByCredentials);
    app.get('/api/profile', profile);
    app.put('/api/updateProfile', updateProfile);
    app.get('/api/user/:username/username', findUserByUsername);
    app.post('/api/register', createUser);
    app.post('/api/logout', logout);
    app.get('/api/user/:userId', findUserById);

    app.get('/api/user', findAllUsers);
    app.get('/api/profile', profile);
    app.put('/api/profile', updateProfile);
    app.delete('/api/profile', deleteProfile);



    var userModel = require('../models/user/user.model.server');

    function profile(req, res){
        res.send(req.session['currentUser'])
    }


    function login(req, res) {
        var credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.json(user);
            })
    }

    function logout(req, res){
        req.session.destroy();
        res.send(200);
    }

    function createUser(req, res){
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.params['username'];
        var password = req.params['password'];

        userModel.findUserByCredentials({
            username: username,
            password: password
        }).then(function (user) {
            if(user === null) {
                res.send(404);
            }
            req.session['currentUser'] = user;
            res.send(user);
        })
    }

    function findUserByUsername(req, res) {
        var username = req.params['username'];
        userModel.findUserByCredentials({username: username})
            .then(function (user) {
                if(user === null ){
                    res.status(404);
                }
                req.session['currentUser'] = user;
                res.send(user);
            })
    }

    function findUserById(req, res) {
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }



    //Hoping this works. 
    function updateProfile(req, res){
        var user = req.session['currentUser'];
        var tempUser = req.body;
        if(tempUser.username !== undefined) user.username = tempUser.username;
        if(tempUser.firstName !== undefined)  user.firstName = tempUser.firstName;
        if(tempUser.lastName !== undefined) user.lastName = tempUser.lastName;
        if(tempUser.email !== undefined) user.email = tempUser.email;
        if(tempUser.address !== undefined) user.address = tempUser.address;
        if(tempUser.city !== undefined) user.city = tempUser.city;
        if(tempUser.state!== undefined) user.state = tempUser.state;
        if(tempUser.zip!== undefined) user.zip= tempUser.zip;
        if(tempUser.phoneNumber !== undefined) user.phoneNumber = tempUser.phone;

        userModel.updateProfile(user)
            .then(function (response) {
                res.json(response);
            });

    }

    function deleteProfile(req, res) {
        var user = req.session['currentUser'];
        userModel.deleteProfile(user.username)
            .then(function () {
                res.send(200);
            })
    }
};