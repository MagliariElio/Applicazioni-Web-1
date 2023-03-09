"use strict";


console.log("This is an example of database access");

const sqlite = require("sqlite3");
const db = new sqlite.Database('exams.sqlite', (err) => {if(err) throw err;});

const sql = "SELECT * FROM course";
db.all(sql, (err, rows) => {
    if(err) throw new err;
    for(let row of rows) {
        console.log(row);
    }
});


db.close();