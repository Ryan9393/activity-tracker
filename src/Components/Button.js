import React from 'react'

const Button = ({bgColor, textColor, text, onClick, padding, bottom, right}) => {
  return (
    <button className = 'buttons'
    style = {{background:bgColor, color:textColor, padding:padding, right:right, bottom:bottom }}
    onClick = {onClick}>{text}</button>
  )
}

export default Button