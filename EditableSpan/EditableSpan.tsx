import { TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";


export type EditableSpanPropsType = {
    title: string
    onChange:(newValue: string) => void
  }
  
export function EditableSpan(props: EditableSpanPropsType){
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState("")

  function activateEditMode(){
    setEditMode(true)
    setTitle(props.title)

  }

  function activateViewMode(){
    setEditMode(false)
    /* console.log("фокус ушёл") */
    props.onChange(title)
  }

  function onChangeTitleHandler(e: ChangeEvent<HTMLInputElement>){
    setTitle(e.currentTarget.value)
  }

  return editMode
  ? <TextField  value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
  : <span onDoubleClick={activateEditMode} /* className={styles.taskTitle } */>{props.title}</span>
}
