import React, { ChangeEvent, KeyboardEvent,  useState } from 'react';
import styles from './AddItemForm.module.css'

type AddItemFormPropsType ={
  addItem: (title: string)=>void
}

export function AddItemForm(props: AddItemFormPropsType){

  let [newTaskTitle, setNewTaskTitle] = useState("")
  let [error, setError] = useState<string|null>(null)

  function onNewTitleChangeHandler(e:ChangeEvent<HTMLInputElement>){
    setNewTaskTitle(e.currentTarget.value)
  }

  function onKeyPressHandler (e:KeyboardEvent<HTMLInputElement>){
    setError(null)
    if (e.ctrlKey && e.key==="Enter") {
      addTask()
    } 
  }

  function addTask(){
    if (newTaskTitle.trim() !== ""){
      props.addItem(newTaskTitle)
      setError("")
    } else {
      setError("Поле должно быть заполненным")
    }
  }

  return <div className={styles.textInput}>
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
}