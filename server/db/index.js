const db = require('./db');

require('./models'); // calls the index of the models module (here is the associations and the models table schema)

module.exports = db;  // Here is the abstraction of the db as a global object that we can call anywhere in our code
