const client = require('./client.js');

// GET /api/v1/routines - sends back all routines
const getRoutines = async () => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM routines;
    `);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

// GET /api/v1/routines/:routineId - sends back a specific routine based on the id that is passed in
const getRoutineById = async (routineId) => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM routines
      WHERE id=${routineId};
    `);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

// DELETE /api/v1/routines/:routineId - removes a routine from the database and sends a successful or failed message
const deleteRoutineById = async (routineId) => {
  console.log('deleteRoutineById Func working so far');
  try {
    const { rows } = await client.query(`
      DELETE FROM routines
      WHERE id=${routineId}
      RETURNING *;
    `);
    if(!rows || rows.length <= 0) {
      return 'FAILED TO DELETE TABLE';
    } else {
      return 'SUCCESSFULLY DELETED TABLE';
    }
  } catch (err) {
    console.log('ERROR WHILE DELETING TABLE', err);
    return(`ERROR WHILE DELETING TABLE`);
  }
};


// POST /api/v1/routines - adds a new routine to the database and sends the newly added routine back
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
  getRoutines,
  getRoutineById,
  createRoutine,
  deleteRoutineById
};