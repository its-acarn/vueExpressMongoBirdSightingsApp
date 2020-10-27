const express = require('express');

const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection
      .find()      // find returns a mongodb cursor, 
      .toArray()   // this needs concverted to an array in order to be converted to json, this takes indeterminate time so is a promise.
      .then(docs => res.json(docs));
  });

  return router;

};

module.exports = createRouter;
