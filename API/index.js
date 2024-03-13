//API for TaskTracker data

const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express();
app.use(cors())

//create sql connection to tasktracker database
const db = mysql.createConnection({
    host: 'LocalHost',
    user: 'root',
    password: '',
    database: 'tasktracker'
})

//test
app.get('/', (re, res) =>{
    return res.json("Hello World")
})

//sql query users table
app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err , data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8020, () =>{
    console.log("Listening")
})