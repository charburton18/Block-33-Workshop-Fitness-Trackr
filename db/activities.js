const client = require('./client.js');

const createActivity = async(activityName, activityDescription) => {
  try{
    const { rows: [newlyCreatedActivity] } = await client.query(`
    INSERT INTO activities (name, description)
    VALUES ('${activityName}', '${activityDescription}')
    RETURNING *;
    `);
    console.log(newlyCreatedActivity);
    return newlyCreatedActivity;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createActivity
};