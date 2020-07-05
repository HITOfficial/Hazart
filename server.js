const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');
const port = 3000;
const fs = require('fs')
app.use(express.static('public')); // adding 'public' folder to use
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({extendet: true}))
//connecting to mysql DB
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Hazart"
  });
  //database conn

// fs
// fs.readFileSync('readme.txt', 'utf8', (error, data) => {
//     console.log(data);
// });
// fs.writeFileSync('writeme.txt','Siema')


  con.connect((error) => {
    if (error) console.log('FailedConnecttoDB');
    else console.log("Connected!");
    con.query('Select money from money where id_money = 1', (error, rows, fields) => {
        console.log(rows);
    })
  });


// route
app.get('/', (req, res) => {
    connection.query("SELECT * FROM hazart.money", (error, rows, fields) => {
        if(!!error) {
            console.log('BUG WITH DB');
        }
        else {
            console.log(rows);
        }
    } );
    res.sendFile(path.join('C:/Users/HIT/Desktop/Hazart/public/index.html'));
})

app.post('/', (req, res) => {
  fs.writeFileSync('./public/user_data.json', JSON.stringify(req.body))
  console.log('Saved data of user', req.body[0].login)
})

app.listen(port, () => {
    console.log(`listening at http:/localhost:${port}`);
})