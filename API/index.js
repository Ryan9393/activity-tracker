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

//get the auto increment task id from database
//bad practice
app.post('/taskID', (req, res) => {
    const name = req.body.taskName
    const sql = "SELECT id FROM tasks WHERE name = '" + name + "';"
    db.query(sql, (err , data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

//remove specific from task list
app.post('/deleteTask', (req, res) => {
    const name = req.body.taskName
    const sql = "DELETE FROM tasks WHERE name = '" + name + "';"
    db.query(sql, (err , data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


//remove all tasks from task list
app.post('/deleteTasks', (req, res) => {
    //work around since DELETE without conditional always fails
    const sql = "DELETE FROM tasks WHERE id > 0;"
    db.query(sql, (err , data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8020, () =>{
    console.log("Listening")
})