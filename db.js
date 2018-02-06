let query = process.argv.slice(2).toString()
const pg = require("pg");
const settings = require("./settings"); // settings.json

function performQuery(query, terms, callback) {
  const client = new pg.Client({
    user: settings.user,
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
    console.log('searching . . .');
    client.query(query, terms, (err, results)  => {
      callback(results.rows);
      client.end();
    });
  });
}


function getPerson(searchTerm, callback) {
  const query = {
    text: 'SELECT * FROM famous_people WHERE last_name = $1::text',
    values: [searchTerm]
  };

  performQuery(query.text, query.values, callback);
}

getPerson(query, (rows) => {
  console.log(rows.length + " person(s) by the name of '" + query + "': " );
  for (row in rows) {
      console.log('- ' + Object.values(rows[row])[0] + ': ' + Object.values(rows[row])[1] + ' ' + Object.values(rows[row])[2] + ', ' + "born, '" + Object.values(rows[row])[3] +"'");
    }
})


