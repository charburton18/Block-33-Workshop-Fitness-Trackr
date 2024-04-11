const client = require('./client.js');

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