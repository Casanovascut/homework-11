const db = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving all the feedback
db.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
db.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

  // If all the required properties are present
    if ( title && text ) {
    // Variable for the object we will save
    const newFeedback = {
        title,
        text,
        feedback_id: uuidv4(),
    };

    readAndAppend(newFeedback, './db/db.json');

    const response = {
        status: 'success',
        body: newFeedback,
    };

    res.json(response);
    } else {
    res.json('Error in posting feedback');
    }
});

module.exports = db;