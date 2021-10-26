let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Book Model
let Person = require('../models/person');

module.exports.displayPersonList = (req, res, next) => {
    Person.find((err, personList) => {
        if (err) {
            return console.error(err);
        } else {
            //console.log(BookList);

            res.render('person/list', {title: 'Perons', PersonList : personList});
        }
    });

};

module.exports.displayAddPage = (req, res, next) => {
    res.render('person/add', {title: 'Add Person'});
}

module.exports.processAddPage = (req, res, next) => {
    let newPerson = Person({
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email,
        "displayName": req.body.displayName,
    });

    Person.create(newPerson, (err, Person) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the book list
            res.redirect('/person-list');
        }
    });
}

module.exports.displayEditPage =  (req, res, next) => {
    let id = req.params.id;

    Person.findById(id, (err, personToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);    
        } else {
            //show the edit view
            res.render('person/edit', {title: 'Edit Person', person: personToEdit})
        }
    })
}

module.exports.processEditPage =  (req, res, next) => {
    let id = req.params.id;

    let updatedPerson = Person({
        "_id": id,
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email,
        "displayName": req.body.displayName,
    });

    Person.updateOne({_id: id}, updatedPerson, (err) => {
        if (err) {
            console.log(err);
            res.end(err);    
        } else {
            // refresh the book list
            res.redirect('/person-list');
        }
    });

}

module.exports.performDelete =  (req, res, next) => {
    let id = req.params.id;

    Person.remove({_id: id}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);    
        } else {
            // refresh the book list
            res.redirect('/person-list');
        }
    });
}