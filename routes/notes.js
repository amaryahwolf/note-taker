const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');