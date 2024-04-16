const client = require('./client.js');

// GET /api/v1/routines - sends back all routines
// GET /api/v1/routines/:routineId - sends back a specific routine based on the id that is passed in
// POST /api/v1/routines - adds a new routine to the database and sends the newly added routine back
// DELETE /api/v1/routines/:routineId - removes a routine from the database and sends a successful or failed message

const createRoutine = async(routineIs_Public, routineName, routineGoal) => {
  try{
    const { rows: [newlyCreatedRoutine] } = await client.query(`
      INSERT INTO routines (is_public, name, goal)
      VALUES (${routineIs_Public}, '${routineName}', ${routineGoal})
      RETURNING *;
    `);
    return newlyCreatedRoutine;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createRoutine
};