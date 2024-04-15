const client = require('../db/client');
const express = require('express');
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//getActivities function
const getActivities = async () => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM activities;
    `);
    return rows;
  } catch (err) {
    console.log(err);
  }
};


// GET /api/v1/activities/:activityId - sends back a specific activity based on the id that is passed in
// POST /api/v1/activities - adds a new activity to the database and sends the newly added activity back
// DELETE /api/v1/activities/:activityId - removes an activity from the database and sends a successful or failed message

module.exports = {
  getActivities
};