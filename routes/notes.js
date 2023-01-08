const express = require("express");
const app = express();
// const notes = require('express').Router();
const { v4: uuidv4 } = require("uuid");
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");


// GET Route for retrieving notes information
app.get('/notes', (req, res) => {
  // Logic for sending all the content of db/db.json
  readFromFile("/Users/amaryahwolf/Desktop/ucla-bootcamp/homework/note-taker/db/db.json").then((note) => res.json(JSON.parse(note)));
});

// POST Route for submitting note
app.post('/notes', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (req.body) {
      // Variable for the object will save
      const newNote = {
        title, 
        text,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, '/Users/amaryahwolf/Desktop/ucla-bootcamp/homework/note-taker/db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting note');
    }
  });

module.exports = app;
