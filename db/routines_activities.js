const client = require('./client.js');

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