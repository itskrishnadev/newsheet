import React from 'react'

export const CheckBox = props => {
    return (
      <li>
       <input key={props.id} id={props.id} onChange={props.handleCheckChieldElement} onClick={() => props.onToggle.bind(props, index)} type="checkbox" className=" mycheckbox " checked={props.isChecked} value={props.value} /> {props.value}
      </li>
    )
}


export default CheckBox