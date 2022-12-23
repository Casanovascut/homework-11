const db = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the feedback
db.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
db.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      tip_id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Tip added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  const delNote = notes.findIndex(note => note.id ==id);

  notes.splice(delNote, 1);
  return res.send();
});

module.exports = db;