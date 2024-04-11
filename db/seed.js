// creating fake data to put inside our database & test db

//connect client.js to seed.js
const client = require('./client.js');
const { createActivity } = require('./activities.js');
const { createRoutine } = require('./routines.js');
const { createRoutine_Activities } = require('./routines_activities.js');

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

  const pushups = await createActivity(`Push-ups`, `Do push-ups`);
  const jumpingJacks = await createActivity(`Jumping-Jacks`, `Do jumping-jacks`);
  const pullups = await createActivity(`Pull-ups`, `Do pull-ups`);
  console.log(`ACTIVITIES CREATED`);

  const squats = await createRoutine(true, 'Squats', 5);
  const curls = await createRoutine(false, 'Curls', 500);
  const bench = await createRoutine(true, 'Bench-press', 327);
  console.log(`ROUTINES CREATED`);

  await createRoutine_Activities(pushups.id, squats.id, 6);
  await createRoutine_Activities(jumpingJacks.id, curls.id, 10);
  await createRoutine_Activities(pullups.id, bench.id, 234);
  await createRoutine_Activities(pushups.id, bench.id, 45);
  await createRoutine_Activities(jumpingJacks.id, squats.id, 8);
  await createRoutine_Activities(pushups.id, curls.id, 9);
  console.log(`ROUTINE_ACTIVITIES CREATED`);

  await client.end();
  console.log('SEED.JS DISCONNECTED FROM DATABASE');
}

syncAndSeed();