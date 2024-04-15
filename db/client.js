const { Client } = require('pg');
const client = new Client('postgres://localhost:5432/fitness_trackr'); //path to db

// client.connect();
// console.log('CONNECTED TO DATABASE');

module.exports = client;