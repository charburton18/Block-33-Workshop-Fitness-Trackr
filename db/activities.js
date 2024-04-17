const client = require('./client.js');

//GET /api/v1/activities - sends back all activities in the activities table
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
const getActivityById = async (activityId) => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM activities
      WHERE id=${activityId};
    `);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

// POST /api/v1/activities - adds a new activity to the database and sends the newly added activity back
const createActivity = async (activityName, activityDescription) => {
  try {
    const { rows: [newlyCreatedActivity] } = await client.query(`
    INSERT INTO activities (name, description)
    VALUES ('${activityName}', '${activityDescription}')
    RETURNING *;
    `);
    return newlyCreatedActivity;
  } catch (error) {
    console.log(error);
  }
}

// DELETE /api/v1/activities/:activityId - removes an activity from the database and sends a successful or failed message
const deleteActivityById = async (activityId) => {
  console.log('deleteActivity Func working so far');
  try {
    const { rows } = await client.query(`
      DELETE FROM activities
      WHERE id=${activityId}
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


module.exports = {
  getActivities,
  getActivityById,
  createActivity,
  deleteActivityById
};