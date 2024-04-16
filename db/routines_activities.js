const client = require('./client.js');

// POST /api/v1/routines_activities/ - adds a new routines_activities to the database and sends the newly added routines_activities back 
// DELETE /api/v1/activities/:activityId - removes an activity from the database and sends a successful or failed message

const createRoutine_Activities = async(activities_id, routines_id, count) => {
  try{
    await client.query(`
      INSERT INTO routines_activities (activities_id, routines_id, count)
      VALUES (${activities_id}, '${routines_id}', ${count})
      RETURNING *;
    `);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createRoutine_Activities
};