import React from "react";
import styles from './EditableSpan.module.css'


export type EditableSpanPropsType = {
    title: string
  }
  
export function EditableSpan(props: EditableSpanPropsType){
    return <span className={styles.taskTitle }>{props.title}</span>
  }