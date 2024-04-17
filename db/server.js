const express = require('express');
const client = require('./client.js');
const { reset } = require('nodemon');
const { getActivities, getActivityById, createActivity, deleteActivityById } = require('./activities.js');
const { getRoutines, getRoutineById, createRoutine, deleteRoutineById } = require('./routines.js');

const app = express();

// connect server.js to db
client.connect();

// tested that it works in console
app.get('/', (req, res) => {
  res.send('Fitness Trackr Home Page');
});

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//ALL API LINKS AND ROUTES



//ACTIVITIES

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
app.get('/api/v1/activities/:activityId', async (req, res) => {
  try { // { activityId: 2 }
    const selectedActivity = await getActivityById(req.params.activityId);
    res.send(selectedActivity);
  } catch (err) {
    console.log(err);
  }
});

// POST /api/v1/activities - adds a new activity to the database and sends the newly added activity back
app.post('/api/v1/activities', async (req, res) => {
  try {
    const newActivity = await createActivity(req.body.activityName, req.body.activityDescription);
    res.send(newActivity);
  } catch (err) {
    console.log(err);
  }
});

// DELETE /api/v1/activities/:activityId - removes an activity from the database and sends a successful or failed message
app.delete('/api/v1/activities/:activityId', async (req, res) => {
  try {
    const selectedActivity = await deleteActivityById(req.params.activityId);
    res.send(selectedActivity);
  } catch (err) {
    console.log(err);
  }
});



// ROUTINES

// GET /api/v1/routines - sends back all routines
app.get('/api/v1/routines', async (req, res) => {
  try {
    const allRoutines = await getRoutines();
    res.send(allRoutines);
  } catch (err) {
    console.log(err);
  }
});

// GET /api/v1/routines/:routineId - sends back a specific routine based on the id that is passed in
app.get('/api/v1/routines/:routineId', async (req, res) => {
  try {
    const selectedRoutine = await getRoutineById(req.params.routineId);
    res.send(selectedRoutine);
  } catch (err) {
    console.log(err);
  }
});

// POST /api/v1/routines - adds a new routine to the database and sends the newly added routine back
app.post('/api/v1/routines', async (req, res) => {
  try {
    const newRoutine = await createRoutine(req.body.is_public, req.body.name, req.body.goal);
    res.send(newRoutine);
  } catch (err) {
    console.log(err);
  }
});

// DELETE /api/v1/routines/:routineId - removes a routine from the database and sends a successful or failed message
app.delete('/api/v1/routines/:routineId', async (req, res) => {
  try {
    const selectedRoutine = await deleteRoutineById(req.params.routineId);
    res.send(selectedRoutine);
  } catch (err) {
    console.log(err);
  }
});



// ROUTINES_ACTIVITIES

// POST /api/v1/routines_activities/ - adds a new routines_activities to the database and sends the newly added routines_activities back 
// DELETE /api/v1/activities/:activityId - removes an activity from the database and sends a successful or failed message

app.listen(8080, () => {
  console.log('Server listening on port 8080')
});