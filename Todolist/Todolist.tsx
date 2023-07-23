import React, { ChangeEvent, KeyboardEvent,  useState } from 'react';
//import styles from './Todolist.module.css'
import { AddItemForm } from '../AddItemForm/AddItemForm';

import { FilterValuesType } from "../App"
import { EditableSpan } from '../EditableSpan/EditableSpan';
import { Button, Checkbox, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

export type TaskType = {
  id:string
  title:string
  isDone:boolean
}

type PropsType = {
  id: string
  title:string
  tasks:Array<TaskType>
  removeTask:(int:string, todolistId: string)=>void
  addTask:(title:string, todolistId: string)=>void
  changeFilter:(value:FilterValuesType, todolistId: string)=>void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string)=> void
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string)=> void
  filter: FilterValuesType
  removeTodolist: (todolistId: string)=> void
  changeTodolistTitle: (id: string, newTitle: string)=> void
}

export function Todolist(props:PropsType){

  function onAllClickHandler(){
    props.changeFilter("all", props.id)
  }

  function onActiveClickHandler(){
    props.changeFilter("active", props.id)
  }

  function onCompletedlickHandler(){
    props.changeFilter("completed", props.id)
  }

  function removeTodolist(){
    props.removeTodolist(props.id)
  }

  function changeTodolistTitle(newTitle: string){
    props.changeTodolistTitle(props.id, newTitle)
  }

  const addTask = (title:string) =>{
    props.addTask(title, props.id)
  }

  return (
    <div /* className={styles.card} */>
      <div /* className={styles.cardItem} */>
        <div /* className={styles.cardItemTitle} */>
          <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
          </h3>
          {/* <button onClick={removeTodolist}>X</button> */}
          <IconButton onClick={removeTodolist}>
            <Delete/>
          </IconButton>
        </div>

        <AddItemForm addItem={addTask}/>

        <div /* className={styles.taskList} */>
          <ul>
            {
              props.tasks.map(t =>{

                function onClickHandler(){props.removeTask(t.id, props.id)}

                function onChangeStatusHandler(e:ChangeEvent<HTMLInputElement>){
                  console.log("want to change")
                  props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                }

                function onChangeTitleHandler(newValue: string){
                  props.changeTaskTitle(t.id,newValue, props.id)
                }
                                 
                return <div>
                  <div key ={t.id}>
                    <Checkbox 
                          onChange={onChangeStatusHandler}
                          checked={t.isDone}/>
                    <EditableSpan title={t.title}
                        onChange={onChangeTitleHandler}/>
                    <IconButton onClick={onClickHandler}>
                      <Delete/>
                    </IconButton>
                  </div>
                </div>
              }
              )  
            }
          </ul>
        </div>
        
        <div>
          <Button variant={props.filter === "all" ? "contained": "text"}
            onClick={onAllClickHandler}>Все</Button>
          <Button color='primary' variant={props.filter === "active" ? "contained": "text"} 
            onClick={onActiveClickHandler}>Активные</Button>
          <Button color='secondary' variant={props.filter === "completed" ? "contained": "text"}
            onClick={onCompletedlickHandler}>Выполненные</Button>
        </div>
      </div>
    </div>
  )
    
}