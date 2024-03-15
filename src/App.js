import './App.css';
import { useState, useRef, useEffect} from 'react'
import TaskList from './Components/TaskList'
import Button from './Components/Button'


function App() {

  const [tasks, setTasks] = useState([])
  const taskRef = useRef()

  //Collect tasks from api
  useEffect(()=>{
    fetch('http://localhost:8020/tasks')
    .then(res => res.json())
    .then(function (data){
      //append complete status to tasks
      data.forEach((task) => task.complete = false)
      //add to task list
      setTasks(data)

    })
    .catch(err => console.log(err))

  }, [])

  function addTasks(){
    let taskName = taskRef.current.value 
    //create random task id (can repeat probably not best)
    // let id = Math.floor(Math.random()*10000)

    //if user input no task name alert
    if(taskName === '') return alert('Please Add a Task')

    //add new task to database
    const taskObj= {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({taskName})
    }
    fetch('http://localhost:8020/tasks', taskObj)
      .then(res => res.json)
      .catch(err => console.log(err))

    //retrive auto-increment id of new task
    fetch('http://localhost:8020/taskID', taskObj)
      .then(res => res.json())
      .then(data =>
        //append new task to task list
        setTasks(PrevTasks => {
        return [...tasks, {id:data[0].id, name:taskName, complete:false}]
      })) 
      .catch(err => console.log(err))

    //resent user input to empty
    taskRef.current.value = null

  }

  //look for task with matching id
  function toggleTask(id){
    const newTasks = [...tasks]
    const task = newTasks.find(task => task.id === id)
    //reverse complete status
    task.complete = !task.complete
    setTasks(newTasks)
  }

  //remove completed tasks
  function removeTasks(){
    //filter for tasks with complete = false
    const newTasks = tasks.filter(task => !task.complete)
    setTasks(newTasks)
  }

  //set task list to empty array
  function removeAllTasks(){
    const taskObj= {
      method: 'POST',
    }
    fetch('http://localhost:8020/deleteTasks',taskObj)
    .then(res => res.json)
    .catch(err => console.log(err))

    setTasks([])
  }


  return (
    <div className="container">
        <h1 className = 'title'>Task Tracker</h1>
        {
          tasks.length === 0 ? <h1>No Tasks</h1>: <h1 className='total-tasks'>Number of tasks: {tasks.filter(task => !task.complete).length}</h1>
        }

        <input className='input-field' ref = {taskRef} placeholder = 'Add Task...'/>
        <Button onClick={addTasks} text = "Add Task"/>
        <Button onClick={removeTasks} text = "Remove Task"/>
        <Button onClick={removeAllTasks} text = "Remove All Tasks"/>

        <TaskList tasks = {tasks} toggleTask = {toggleTask}/>



    </div>

  );
}

export default App;
