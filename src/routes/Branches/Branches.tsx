import React, { useState } from "react";
import './Branches.css'
import { Row,Col } from "react-bootstrap";


const Branches = () =>{

    const [branches,setBranches] = useState([['mba','bba','mca'],['btech','mtech','ds']])

    return(<div className="parent">
       
   
           {
               branches.map((row)=>{
                   return(
                   <div className="row mx-auto">
                       {row.map((branch)=>{ return (<span className="branch" >{branch}</span>) ;})}
                   </div>
                   );
               })
           }

           <button className="addbtn">Add a Branch...</button>
    
    </div>)
}

export default Branches