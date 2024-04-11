const { Client } = require('pg');
const client = new Client('postgres://localhost:5432/fitness_trackr'); //path to db

// client.connect();
// console.log('CONNECTED TO DATABASE');

//export client.js (same as export default in react. destructure obj if multiple items)
module.exports = client;