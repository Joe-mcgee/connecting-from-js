const query = process.argv.slice(2).toString();
const settings = require("./settings"); // settings.json
let knex = require('knex')({
  client: 'pg',
  version: '9.5.10',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});


let search = knex.select().from('famous_people').where({
  last_name: query
}).then(function(rows) {
  console.log(rows.length + " person(s) by the name of '" + query + "': ");
    for (row in rows) {
    console.log('- ' + Object.values(rows[row])[0] + ': ' + Object.values(rows[row])[1] + ' ' + Object.values(rows[row])[2] + ', ' + "born, '" + Object.values(rows[row])[3] + "'");
  }
/*  console.log(Object.values(results[0]));*/
}).asCallback();


