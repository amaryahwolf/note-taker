// Require libraries and files
const express = require('express');
const path = require('path');
const api = require('./routes/notes.js');

// Initialize server app and server it will run on
const PORT = process.env.PORT ||  3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);

// GET route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET wildcard route
app.get('*', (req,res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
 );

// Event listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);