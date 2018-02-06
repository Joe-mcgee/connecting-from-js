let query = process.argv.slice(2, 5);
console.log(query)
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


knex('famous_people').insert({first_name: query[0], last_name: query[1], birthdate: new Date(query[2]) }).then(function(result) {
  console.log('success')
})

