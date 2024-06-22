// Use the MariaDB Node.js Connector
var mariadb = require('mariadb');
 
// Create a connection pool
var pool = 
  mariadb.createPool({
    host : "192.168.1.24",
    database : "event_management",
    port : "3306",
    user: "root",
    password : "password123",
    connectionLimit : 5
  });
 
// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
  dbpool: pool
});