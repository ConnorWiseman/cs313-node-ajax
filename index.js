/**
 * @file A basic Express application that serves static files and JSON.
 */
'use strict';

// Required Node.js modules.
const express = require('express');
const path    = require('path');

// Sample JSON data. This file takes the place of some server-side data store,
// like a PostgreSQL database.
const data = require('./data.json');

// Application constants.
const PORT = process.env.PORT || 3000;

// Create a new application.
let app = express();

// Serve static files only.
app.use('/', express.static(path.join(__dirname, 'static')));

// Handle GET requests to /data.
app.get('/data', function(request, response) {

  // Retrieve the person from the URI query string.
  let person = request.query.person;

  // If there is a person, and the raw JSON data has such a key, return the
  // associated data.
  // If there is no person, or the raw JSON data has no such key, return
  // an error object.
  if (person !== undefined && data.hasOwnProperty(person)) {
    response.json(data[person]);
  } else {
    response.json(data['error']);
  }

  // End the response.
  response.end();
});

// Listen on the specified port.
app.listen(PORT, function() {
  console.log(`The application is now listening on port ${PORT}`);
});
