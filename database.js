// not actually in use yet for database
require('dotenv').config();

// database creation or update
const db = require("./models");
db.order.sync().then(result => {
    console.log('Database table for Order model was updated');
});
db.service.sync().then(result => {
    console.log('Database table for Service model was updated');
});
