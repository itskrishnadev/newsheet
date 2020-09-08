import React from 'react'
import { CSVLink } from 'react-csv'
import {Button } from 'reactstrap'

let disable;
let krishna;

export const ExportReactCSV = ({csvData, fileName}) => {
    console.log(csvData);
    return (
        <button  class="my-buttoninform1"  >
        {/* <button class="btn waves-effect waves-light lightcarminepink" > */}
              <CSVLink data={csvData} filename={"my-file.csv"} className="black-text">Export</CSVLink>
          </button>
        
    )
    
}

export const ExportReactCSV1 = ({csvData,type,  fileName, handlesubmit}) => {
    console.log(csvData);
    console.log(fileName);
    
    const handleclick = () =>{

        if(fileName==""){
         alert("please fill the form details")
        } 
    }

    if(fileName==""){
        disable= true;
        krishna= "none";
    }

    if(fileName!==""){
      disable = false
    }
    return (
        <div onClick={handleclick}  >
     
              <CSVLink data={csvData}  onClick={handlesubmit} disabled={disable} type={type} filename={fileName+".csv"} className="black-text remem">Export</CSVLink>
          </div>
        
    )
    
}

export const ExportReactCSV2 = ({csvData,exportdis, fileName}) => {
    console.log(csvData);
    console.log(fileName+".csv")
      
    const handleclick = (e) =>{
       
        if(exportdis==true){
            e.preventDefault();
         alert("Please Select Column to export")
        } 
    }
    return (
        <div onClick={handleclick} class="my-buttoninform1"  >
        {/* <button class="btn waves-effect waves-light lightcarminepink" > */}
              <CSVLink data={csvData} style={{    margin: "0.7em 5em",
    position: "absolute"}} disabled={exportdis}  filename={fileName+".csv"} className="black-text">Export</CSVLink>
          </div>
        
    )
    
}

export const ExportReactCSVINeditFOrm = ({csvData, fileName}) => {
    console.log(csvData);
    return (
        <Button style={{    border: "1.3px solid #FABE00",
            background: "#FABE00",
            boxShadow: "none",
            color:" black",
            borderRadius:"37px",
            borderColor: "#FABE00",
            fontSize: "0.76em"}}  >
        {/* <button class="btn waves-effect waves-light lightcarminepink" > */}
              <CSVLink data={csvData} filename={"my-file.csv"} className="black-text">Export</CSVLink>
          </Button>
        
    )
    
}














