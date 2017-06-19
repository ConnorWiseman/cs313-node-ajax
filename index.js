/**
 * @file A basic Express application that serves static files and JSON.
 */
'use strict';

// Required Node.js modules.
const express = require('express');
const path    = require('path');

// Sample JSON data.
const data = require('./data.json');

// Application constants.
const PORT = process.env.PORT || 3000;

// Create a new application.
let app = express();

// Serve static files only.
app.use('/', express.static(path.join(__dirname, 'static')));

// Handle GET requests to /data.
app.get('/data', function(request, response) {
  let person = request.query.person;

  if (person !== undefined && data.hasOwnProperty(person)) {
    response.json(data[person]);
  } else {
    response.json(data['error']);
  }

  response.end();
});

// Listen on the specified port.
app.listen(PORT, function() {
  console.log(`The application is now listening on port ${PORT}`);
});
