const express = require('express');
const app = express();
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router');

app.use(parser.json());

MongoClient.connect('mongodb://localhost:27017')      // mongodb not http because we are using mongodbs own language. returns a promise so anything afterwards in the .then runs after promise is fullfilled.
  .then(client => {
    const db = client.db('games_hub');                //  client is banana, it could be connectionToMongoDBLand
    const gamesCollection = db.collection('games');
    const gamesRouter = createRouter(gamesCollection);
  })

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
