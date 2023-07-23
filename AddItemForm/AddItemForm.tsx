import { ControlPoint } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import React, { ChangeEvent, KeyboardEvent,  useState } from 'react';
//import styles from './AddItemForm.module.css'

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

  return <div >
  <div>
    <TextField 
      variant='outlined'
      label="Введите значение"            
      onChange={onNewTitleChangeHandler}
      onKeyDown={onKeyPressHandler}
      value={newTaskTitle}
      error={!!error}
      helperText={error}
    />
    <IconButton color={"primary"} onClick={addTask}>
      <ControlPoint/>  
    </IconButton>   
  </div>
</div>
}