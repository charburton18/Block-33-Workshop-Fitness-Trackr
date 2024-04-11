// creating fake data to put inside our database & test db

//connect client.js to seed.js
const client = require('./client.js');
const { createActivity } = require('./activities.js');
const { createRoutine } = require('./routines.js');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS routines_activities;
      DROP TABLE IF EXISTS activities;
      DROP TABLE IF EXISTS routines;
    `)
  } catch (error) {
    console.log(error);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(40),
        description TEXT
      );

      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        is_public BOOLEAN,
        name VARCHAR(40),
        goal INT,
        description TEXT
      );

      CREATE TABLE routines_activities (
        id SERIAL PRIMARY KEY,
        routines_id INT REFERENCES routines(id),
        activities_id INT REFERENCES activities(id),
        count INT
      )
    `);
  } catch (error) {
    console.log(error);
  }
}


const syncAndSeed = async() => {
  await client.connect();
  console.log('SEED.JS CONNECTED TO DATABASE');

  await dropTables();
  console.log(`TABLES DROPPED`);

  await createTables();
  console.log(`TABLES CREATED`);

  await createActivity(`Push-ups`, `Do push-ups`);
  await createActivity(`Jumping-Jacks`, `Do jumping-jacks`);
  await createActivity(`Pull-ups`, `Do pull-ups`);
  // console.log(`ACTIVITIES CREATED`);

  await createRoutine(true, 'Squats', 5);
  await createRoutine(false, 'Curls', 500);
  await createRoutine(true, 'Bench-press', 327);
  // console.log(`ROUTINES CREATED`)

  await client.end();
  console.log('SEED.JS DISCONNECTED FROM DATABASE');
}

syncAndSeed();