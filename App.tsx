import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist/Todolist';
import {v1} from 'uuid'
import { AddItemForm } from './AddItemForm/AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import { Menu } from '@mui/icons-material';

export type FilterValuesType = "all" | "completed" | "active"

/* тест */

type TodolistType = {
  id: string,
  title: string,
  filter: FilterValuesType
}

type TaskStateType = {
  [key: string]: Array<TaskType>
}

export default function App() {

  let [filter,setFilter] = useState<FilterValuesType>("all")

  
  function removeTask(id:string, todolistId: string){
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter(value=>value.id!==id)
    tasksObj[todolistId] = filteredTasks
    setTasks({...tasksObj})
  }

  function addTask(title:string, todolistId: string){
    let task={id:v1(), title:title, isDone:false}
    let tasks = tasksObj[todolistId]
    let newTasks=[task, ...tasks]
    tasksObj[todolistId] = newTasks

    
    setTasks({...tasksObj})
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string){
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t=> t.id === taskId)
    if (task){
      task.isDone = isDone
      setTasks({...tasksObj})
    }
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string){
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t=> t.id === taskId)
    if (task){
      task.title = newTitle
      setTasks({...tasksObj})
    }
  }

  function changeFilter(value:FilterValuesType, todolistId: string){
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist){
      todolist.filter = value
      setTodolists([...todolists])
    }
    /* setFilter(value) */
  }

  let todolistId1 = v1()
  let todolistId2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ])

  let removeTodolist = (todolistId: string)=>{
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolist)
    delete tasksObj[todolistId]
    setTasks({...tasksObj})
  }

  let changeTodolistTitle = (id: string, newTitle: string)=>{
    let todolist = todolists.find(tl=>tl.id===id)
    if (todolist){
      todolist.title = newTitle
      setTodolists([...todolists])
    }
  }

  let [tasksObj, setTasks] = useState<TaskStateType>({
    [todolistId1]:[
    {id:v1(), title:"CSS", isDone: true},
    {id:v1(), title:"JS", isDone: true},
    {id:v1(), title:"React", isDone: false},
    {id:v1(), title:"Redux", isDone: false}
    ],
    [todolistId2]: [
      {id:v1(), title:"Book", isDone: false},
      {id:v1(), title:"Milk", isDone: true},
    ]
  })

  function addTodolist(title: string){
    let todolist: TodolistType = {
      id: v1(),
      filter: 'all',
      title: title
    }
    setTodolists([todolist, ...todolists])
    setTasks({
      ...tasksObj, 
      [todolist.id]:[]
    })
  }

  return (
    <div className='App'>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>  
      </AppBar>
      <Container>
        <Grid container style={{padding:"10px"}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
        {
          todolists.map((tl)=>{
            let tasksForTodoList = tasksObj[tl.id]

            if (tl.filter === "completed"){
              tasksForTodoList = tasksForTodoList.filter( t => t.isDone)
            }
            if (tl.filter === "active"){
              tasksForTodoList = tasksForTodoList.filter( t => !t.isDone)
            }

            return <Grid item>
              <Paper style={{padding:"20px"}}>
                <Todolist 
                  key={tl.id}
                  id={tl.id}
                  title={tl.title} 
                  tasks = {tasksForTodoList}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  changeTaskTitle={changeTaskTitle}
                  filter={tl.filter}
                  removeTodolist = {removeTodolist}
                  changeTodolistTitle = {changeTodolistTitle}
                />
              </Paper>
            </Grid>
        })
      }
      </Grid>
      </Container>
    </div>
  );
}