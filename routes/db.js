const db = require('express').Router();
const { readFromFile, readAndAppend , writeToFile} = require('../helpers/fsUtils');
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
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Tip added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});

db.delete('/:id', (req, res) => {
  const { id } = req.params
  readFromFile('./db/db.json').then((data) =>{
    const notes = JSON.parse(data)
    const deleteNote =  notes.filter(note => note.id !== id)
    writeToFile('./db/db.json',deleteNote)
    res.json(deleteNote)
  })
});

module.exports = db;