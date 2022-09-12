import React from 'react'

const EditorButton = (props) => {
  const action = props.action ? props.action : () => { }
  const style = {
    ...props.style,
    padding: '0.4em 1em',
    border: 'none',
    fontSize: '18px',
    borderRadius: '0.2em',
    cursor: 'pointer',

  }
  return (
    <button className="btn" onClick={() => { action() }} style={style}>{props.btnText}</button>
  )
}

export default EditorButton