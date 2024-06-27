// Use the MariaDB Node.js Connector
var mariadb = require('mariadb');
 
// Create a connection pool
var pool = 
  mariadb.createPool({
    host : "192.168.4.44",
    database : "event_management",
    port : "3306",
    user: "vinojs",
    password : "SQLPass2024!",
    connectionLimit : 5
  });
 
// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
  dbpool: pool
});