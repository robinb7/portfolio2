let mongoose = require('mongoose');

// create a model class
let personModel = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    displayName: String,

},
{
    collection: "users"
});

module.exports = mongoose.model('Person', personModel);