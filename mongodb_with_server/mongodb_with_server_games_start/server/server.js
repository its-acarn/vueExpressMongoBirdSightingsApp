const express = require('express');
const app = express();
const parser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router');

app.use(parser.json());
app.use(cors());

MongoClient.connect('mongodb://localhost:27017')      // mongodb not http because we are using mongodbs own language. returns a promise so anything afterwards in the .then runs after promise is fullfilled.
  .then(client => {
    const db = client.db('games_hub');                //  client is banana, it could be connectionToMongoDBLand
    const gamesCollection = db.collection('games');
    const gamesRouter = createRouter(gamesCollection);
    app.use('/api/games', gamesRouter);
  })
  .catch(err => console.error(err));      // if anything goes wrong with theis promise chain, catch it (handle that error using this - a catch produces and error, send this error to the console. this stops the error from crashing the whole api)

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
