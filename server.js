const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const getJoke = require('./script');
const { v4: uuidv4 } = require('uuid');

var JokesModel = require("./models/jokes");

const app = express();


// Middleware
app.use(bodyParser.json());
app.use(cors());

app.get("/", (api_req, api_res) => {
    api_res.send({ "message": "Hello World" }, 200);
});

app.get("/get_new_joke", async (api_req, api_res) => {
    const joke = await getJoke("");

    let FoundJoke = await JokesModel.findOne({ joke: joke }).exec();
    console.log(`Found Joke = ${FoundJoke}`);
    let JokeExists = FoundJoke !== null;
    console.log(`Joke exists? ${JokeExists}`);
    if (!JokeExists) {
        var newJoke = new JokesModel({ joke: joke, joke_id: uuidv4() });
        newJoke.save((err, joke) => {
            if (err) {
                api_res.send({ "message": "Error saving new joke!", "error": err }, 500);
            }
            else {
                console.log("New Joke saved!");
                api_res.send({ "message": "Success!", "joke": joke.joke }, 200);
            }
        });
    } else {
        api_res.send({ "message": "Success!", "joke": joke.joke }, 200);
    }
});

app.get("/get_joke_from_db", async (api_req, api_res) => {
    body_json = api_req.params;
    // api_res.send(JSON.stringify({ "message": "Body Parsed!", "body": body_json }));
    if (body_json.joke_id == null) {
        JokesModel.count().exec(function (err, count) {

            // Get a random entry
            var random = Math.floor(Math.random() * count)

            // Again query all users but only fetch one offset by our random #
            JokesModel.findOne().skip(random).exec(
                (err, result) => {
                    // Tada! random joke
                    console.log(result);
                    api_res.send({ "message": "Success!", "joke": result }, 200);
                })
        })
    } else {
        JokesModel.findOne({}, (err, joke) => {
            if (err) {
                api_res.send({ "message": "Error!", "error": err }, 500);
            } else if (joke == null) {
                api_res.send({ "message": "Joke not found!", "error": err }, 404);
            }
            else {
                api_res.send({ "message": "Success!", "joke": joke }, 200);
            }
        });
    }
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});

