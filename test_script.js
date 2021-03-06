const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client({
  user : settings.user,
  password: settings.password,
  database: settings.databse,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error('connection error', err);
  }
  client.query("SELECT $1::int AS number", ["1"], (err, result) => {
    if (err) {
      return console.error('error returning query', err);
    }
    console.log(result.rows[0].number);
    client.end()
  })
})
