import { useState } from 'react'
import style from './component.module.css'

const Component = (props: any) => {

  return (
    <div className={style.component}>
        {props.children}
    </div>
  )
}

export default Component;
