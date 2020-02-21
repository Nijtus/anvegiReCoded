let fs = require(`fs`);
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./retour.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

var sql = fs.readFileSync("ocDataBase.sql","utf8");
console.log(sql);
db.run(sql, function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Rows inserted ${this.changes}`);
});

db.close();
