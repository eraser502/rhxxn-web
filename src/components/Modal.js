import React from 'react'
import "./Modal.css"
import { useState } from 'react';

export const Modal = (props) => {
  
  return (
    <div className="modalContainer">
      <div className="modalBox">
        <div>{props.children}</div>
        <div className="modalButtonBox">
          <button className="modalButtons" onClick={()=>props.handleOk()}>예</button>
          <button className="modalButtons" onClick={()=>props.handleClose()}>아니요</button>
        </div>
      </div>
    </div>
  )
}

