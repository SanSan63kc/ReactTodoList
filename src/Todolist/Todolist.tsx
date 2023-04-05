import React, { ChangeEvent, KeyboardEvent,  useState } from 'react';
import styles from './Todolist.module.css'

import { FilterValuesType } from "../App"

export type TaskType = {
  id:string
  title:string
  isDone:boolean
}

type PropsType = {
  title:string
  tasks:Array<TaskType>
  removeTask:(int:string)=>void
  addTask:(title:string)=>void
  changeFilter:(value:FilterValuesType)=>void
}

export function Todolist(props:PropsType){

  let [newTaskTitle, setNewTaskTitle] = useState("")

  function onKeyPressHandler (e:KeyboardEvent<HTMLInputElement>){
    if (e.ctrlKey && e.key==="Enter") {
      props.addTask(newTaskTitle)
      setNewTaskTitle("")
    }
  }

  function onNewTitleChangeHandler(e:ChangeEvent<HTMLInputElement>){
    setNewTaskTitle(e.currentTarget.value)
  }
  

  function addTask(){
    props.addTask(newTaskTitle)
    setNewTaskTitle("")
  }

  function onAllClickHandler(){
    props.changeFilter("all")
  }

  function onActiveClickHandler(){
    props.changeFilter("active")
  }

  function onCompletedlickHandler(){
    props.changeFilter("completed")
  }

  

  return (
    <div className={styles.card}>
      <div className={styles.cardItem}>
        <div className={styles.cardItemTitle}>
          <h3>{props.title}</h3>
        </div>

        <div className={styles.textInput}>
          <div className={styles.textInputInner}>
            <input             
              onChange={onNewTitleChangeHandler}
              onKeyDown={onKeyPressHandler}
              value={newTaskTitle} 
            />
            <button className={styles.addTask__button} onClick={addTask}>+</button>
          </div>
        </div>

        <div className={styles.taskList}>
          <ul>
            {
              props.tasks.map(t =>{

                function onClickHandler(){props.removeTask(t.id)}
                function onChangeHandler(e:ChangeEvent<HTMLInputElement>){console.log("want to change")}
                                 
                return <div className={styles.liElement}>
                  <li key ={t.id}>
                    <input type="checkbox" 
                          onChange={onChangeHandler}
                          checked={t.isDone}/>
                    <span className={styles.taskTitle}>{t.title}</span>
                    <button className={styles.button__deleteTask} onClick={onClickHandler}>x</button>
                  </li>
                </div>
              }
              )  
            }
          </ul>
        </div>
        

        <div>
          <button className={styles.card__button} onClick={onAllClickHandler}>Все</button>
          <button className={styles.card__button} onClick={onActiveClickHandler}>Активные</button>
          <button className={styles.card__button} onClick={onCompletedlickHandler}>Выполненные</button>
        </div>
      </div>
    </div>
  )
    
  }