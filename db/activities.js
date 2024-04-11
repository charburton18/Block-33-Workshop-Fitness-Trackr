const client = require('./client.js');

const createActivity = async(activityName, activityDescription) => {
  try{
    await client.query(`
      INSERT INTO activities (name, description)
      VALUES ('${activityName}', '${activityDescription}')
      RETURNING *;
    `);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createActivity
};