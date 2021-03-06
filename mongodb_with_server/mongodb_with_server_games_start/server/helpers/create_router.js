const express = require('express');
const ObjectId = require('mongodb').ObjectId;   //   imports objectid from mongodb

const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection
      .find()                                   // find returns a mongodb cursor, 
      .toArray()                                // this needs concverted to an array in order to be converted to json, this takes indeterminate time so is a promise.
      .then(docs => res.json(docs))             // converts our found array to json
      .catch(err => {                           // in the event of error in promise, catch runs
        console.error(err);                     // send error to console (red)
        res.status(500);                        //  default 500 comes from ??????
        res.json({ status: 500, error: err });  // creates error object - ?????
      });
  });

  router.get('/:id', (req, res) => {
    const idAsAString = req.params.id;                    // mongodb stores ids as object ids which are like classes for each id, not a string or int or bool, but an obj.
    const idAsAMongoDbObjectId = ObjectId(idAsAString);   // this converts our id as a string into a mongodb object id.
    collection
      .findOne({ _id: idAsAMongoDbObjectId })             // findOne is passed a QueryObject eg { minPlayers: 2 }, to search on id use _id, so { _id: idAsAMongoDbObjectId }
      .then(doc => res.json(doc))                         // gives us the document directly not a cursor, so we can just convert it to json and send it to the client
      .catch(err => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.post('/', (req, res) => {
    const newData = req.body;                   // make sure you are using bodyparsor.json for req.body
    collection
      .insertOne(newData)                       // insertOne(newData) inserts the newData into the DB.
      .then(result => res.json(result.ops[0]))  // ops is an array in the object of results which contains an object of the data plus an object of the _id
      .catch(err => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

    router.delete('/:id', (req, res) => {
      const id = ObjectId(req.params.id);         // on the request there are params, they can come from multiple places, we are using params to pull out stuff like :id (:id adds a param to params with the value of whatever is passed into :id)
      collection
        .deleteOne({ _id: id })                            // deleteOne takes a query object like findOne does
        .then(result => res.json(result))
        .catch(err => {
          console.error(err);
          res.status(500);
          res.json({ status: 500, error: err });
    });
  });

    router.put('/:id', (req, res) => {
      const id = ObjectId(req.params.id);
      const updatedData = req.body;
      collection
        .findOneAndUpdate(                        // findOneAndUpdate takes 2 objects and one optional object
          { _id: id },                            // find object
          { $set: updatedData },                  // set the document to this. $set is an alias for addFields.
          { returnOriginal: false }               // on return, getting the database to give us the new docuemnt after the update and not the original before the object
        )
        .then(result => res.json(result.value))   // .ops came out of nowhere, so does .value they are just different responses from different database operations
        .catch(err => {
          console.error(err);
          res.status(500);
          res.json({ status: 500, error: err });
    });
  });
  
  return router;

};

module.exports = createRouter;
