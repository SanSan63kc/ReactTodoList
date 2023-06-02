import React, { ChangeEvent, useState } from "react";
import styles from './EditableSpan.module.css'


export type EditableSpanPropsType = {
    title: string
  }
  
export function EditableSpan(props: EditableSpanPropsType){
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState("")

  function activateEditMode(){
    setEditMode(true)
  }

  function activateViewMode(){
    setEditMode(false)
    console.log("фокус ушёл")
  }

  function onChangeTitleHandler(e: ChangeEvent<HTMLInputElement>){
    setTitle(e.currentTarget.value)
  }

  return editMode
  ? <input  value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
  : <span onDoubleClick={activateEditMode} className={styles.taskTitle }>{props.title}</span>
}
