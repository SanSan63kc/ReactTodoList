import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist/Todolist';
import {v1} from 'uuid'

export type FilterValuesType = "all" | "completed" | "active"

export default function App() {

  let [tasks,setTasks] = useState<Array<TaskType>>([
    {id:v1(), title:"CSS", isDone: true},
    {id:v1(), title:"JS", isDone: true},
    {id:v1(), title:"React", isDone: false},
    {id:v1(), title:"Redux", isDone: false}
  ])

  let [filter,setFilter] = useState<FilterValuesType>("all")

  
  function removeTask(id:string){
    let filteredTasks = tasks.filter(value=>value.id!==id)
    setTasks(filteredTasks)
  }

  function addTask(title:string){
    let newTask={id:v1(), title:title, isDone:false}
    let newTasks=[newTask, ...tasks]
    setTasks(newTasks)
  }

  function changeStatus(taskId: string, isDone: boolean){
    let task = tasks.find(t=> t.id === taskId)
    if (task){
      task.isDone = isDone
    }
    
    setTasks(tasks)
  }

  function changeFilter(value:FilterValuesType){
    setFilter(value)
  }

  let tasksForTodoList = tasks

  if (filter === "completed"){
    tasksForTodoList = tasks.filter( t => t.isDone)
  }
  if (filter === "active"){
    tasksForTodoList = tasks.filter( t => !t.isDone)
  }

  return (
    <div className='App'>
      <Todolist title="Что будем учить" 
        tasks = {tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        />
    </div>
  );
}