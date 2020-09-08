import React from 'react'
import { Modal } from 'antd';


export const SelectColumnModal = ({visible,handleSelect, handleCancel, fruites, handleCheckChieldElement }) => {

    

  
   
    return (
        <>
                  <Modal
            title="Select Column"
            visible={visible}
            onOk={handleSelect}
            onCancel={handleCancel}
          >
             {/* <input type="checkbox" onChange={this.handleAllChecked} className="mycheckbox"  value="checkedall" /> Check / Uncheck All */}
          <ul>
  
          {fruites.map((fruite, index) =>
                <li key={index}>
                
                  <input type="checkbox" id={fruite.id} className=" mycheckbox" checked={fruite.isChecked}  onChange={handleCheckChieldElement(this, index)} />{fruite.value}
                </li>
            )}
          {/* {
            this.state.fruites.map((fruite, index) => {
              return (<CheckBox key={index}  handleCheckChieldElement={this.handleCheckChieldElement} onToggle={this.onToggle}  {...fruite} />)
            })
          } */}
          </ul>
          <h1>
          
          </h1>
          </Modal>
        </>
        
    )
    
  }