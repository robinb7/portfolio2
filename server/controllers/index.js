let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//create user model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home'});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', {title: 'About'});
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index', {title: 'Projects'});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', {title: 'Services'});
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', {title: 'Contact'});
}

module.exports.displayLoginPage = (req, res, next) => {
    // check if user is not already loged in
    if (!req.user) {
        res.render('auth/login', {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else {
        res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        //if server err?
        if (err) {
            return next(err);
        }

        //is there a user login error?
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        } 

        req.login(user, (err) => {
            // server error?
            if(err) {
                return next(err);
            }
            return res.redirect('person-list');
        });
        
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if user is not already loged in
    if (!req.user) {
        res.render('auth/register', {
            title: "Register",
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName
    })

    User.register(newUser, req.body.password, (err) => {
        if(err) {
            console.log("Error: Inserting new user");
            if(err.name == "UserExistsError") {
                req.flash('registerMessage', 'Registration Error: User Already Exists!');
                console.log('Error: User Already Exists!')
            }
            return res.render('auth/register', {
                title: "Register",
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        } else {
            // if no error exists, then  registration is successful

            // redirect the user and authenticate

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/person-list');
            })
        }

    })
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}
