const mongoose = require('mongoose');
var db = require('../db/db_connect');

const Schema = mongoose.Schema;

const JokeSchema = new Schema({
    joke: {
        type: String,
        required: true
    },
    joke_id: {
        type: String,
        required: true
    }
});

var JokesModel = db.model('Jokes', JokeSchema);
console.log(JokesModel);
module.exports = JokesModel;