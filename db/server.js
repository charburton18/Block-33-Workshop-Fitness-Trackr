const express = require('express');
const client = require('./client.js');
const { reset } = require('nodemon');
const { getActivities } = require('../api/activities.js');

const app = express();

// tested that it works in console
app.get('/', (req, res) => {
  res.send('Fitness Trackr Home Page');
});

//ALL API LINKS AND ROUTES

// GET /api/v1/activities - sends back all activities
app.get('/api/v1/activities', async (req, res) => {
  try {
    const allActivities = await getActivities();
    res.send(allActivities);
  } catch (err) {
    console.log(err);
  }
});

// GET /api/v1/activities/:activityId - sends back a specific activity based on the id that is passed in
// POST /api/v1/activities - adds a new activity to the database and sends the newly added activity back
// DELETE /api/v1/activities/:activityId - removes an activity from the database and sends a successful or failed message


app.listen(8080, () => {
  console.log('Server listening on port 8080')
});