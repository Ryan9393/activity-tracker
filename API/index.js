//API for TaskTracker data

const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())

//create sql connection to tasktracker database
const db = mysql.createConnection({
    host: 'LocalHost',
    user: 'root',
    password: '',
    database: 'tasktracker'
})


//sql query users table
app.get('/tasks', (req, res) => {
    const sql = "SELECT * FROM tasks"
    db.query(sql, (err , data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

//insert new tasks into database
//bad practice
app.post('/tasks', (req, res) =>{
    const name = req.body.taskName
    const sql = "INSERT INTO `tasks`(`id`, `Name`) VALUES ( null,'" + name + "')"
    db.query(sql, (err , data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })

})

app.listen(8020, () =>{
    console.log("Listening")
})