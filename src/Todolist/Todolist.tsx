import React, { ChangeEvent, KeyboardEvent,  useState } from 'react';
import styles from './Todolist.module.css'

import { FilterValuesType } from "../App"
import { isValidDateValue } from '@testing-library/user-event/dist/utils';

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
  changeTaskStatus: (taskId: string, isDone: boolean)=> void
  filter: FilterValuesType
}

export function Todolist(props:PropsType){

  let [newTaskTitle, setNewTaskTitle] = useState("")
  let [error, setError] = useState<string|null>(null)

  function onKeyPressHandler (e:KeyboardEvent<HTMLInputElement>){
    setError(null)
    if (e.ctrlKey && e.key==="Enter") {
      addTask()
    } 
  }

  function onNewTitleChangeHandler(e:ChangeEvent<HTMLInputElement>){
    setNewTaskTitle(e.currentTarget.value)
  }
  

  function addTask(){
    if (newTaskTitle.trim() !== ""){
      props.addTask(newTaskTitle)
      setError("")
    } else {
      setError("Поле должно быть заполненным")
    }
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

              /* затащить класс в правильный стилевой файл */
              className={error ? "error" : ""}
            />
            <button className={styles.addTask__button} onClick={addTask}>+</button>
            {
            /* затащить класс в правильный стилевой файл */}
            {error && <div className="error-message"> {error}</div> }
          </div>
        </div>

        <div className={styles.taskList}>
          <ul>
            {
              props.tasks.map(t =>{

                function onClickHandler(){props.removeTask(t.id)}
                function onChangeHandler(e:ChangeEvent<HTMLInputElement>){
                  console.log("want to change")
                  props.changeTaskStatus(t.id, e.currentTarget.checked)
                }
                                 
                return <div className={styles.liElement + (t.isDone ? " "+ styles.isDone : "")}>
                  <li key ={t.id}>
                    <input type="checkbox" 
                          onChange={onChangeHandler}
                          checked={t.isDone}/>
                    <span className={styles.taskTitle }>{t.title}</span>
                    <button className={styles.button__deleteTask} onClick={onClickHandler}>x</button>
                  </li>
                </div>
              }
              )  
            }
          </ul>
        </div>
        

        <div>
          <button className={styles.card__button + (props.filter === "all" ? " " + styles.active__filter: "")} 
            onClick={onAllClickHandler}>Все</button>
          <button className={styles.card__button + (props.filter === "active" ? " " + styles.active__filter: "")} 
            onClick={onActiveClickHandler}>Активные</button>
          <button className={styles.card__button + (props.filter === "completed" ? " " + styles.active__filter: "")} 
            onClick={onCompletedlickHandler}>Выполненные</button>
        </div>
      </div>
    </div>
  )
    
  }