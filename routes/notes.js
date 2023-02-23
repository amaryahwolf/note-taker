const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const { readFromFile, readAndAppend, deleteAndUpdate } = require("../helpers/fsUtils");


// GET Route for retrieving notes information
app.get('/notes', (req, res) => {
  // Logic for sending all the content of db/db.json
  readFromFile('./db/db.json').then((note) => res.json(JSON.parse(note)));
});

// POST Route for submitting note
app.post('/notes', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    readAndAppend(newNote, './db/db.json');
    const response = {
      status: 'success',
      body: newNote,
    };
    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

//   Delete route to delete a note
app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  deleteAndUpdate(id, './db/db.json');
  res.json(id)
});

module.exports = app;
