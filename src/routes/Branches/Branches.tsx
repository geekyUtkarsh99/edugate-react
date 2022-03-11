import React, { SetStateAction, useState } from "react";
import './Branches.css'
import { Row,Col } from "react-bootstrap";
import axios from "axios";
import { listenerCount } from "process";


const Branches = () =>{

    const [branches,setBranches] = useState([['mba','bba','mca'],['btech','mtech','ds']])
    const [open,setOpen] = useState(false)

    const [branch,setBranch] = useState('')
    const [yors,setyors] = useState('')

    const addNewBranch = ()=>{

        if (branch !== "" && yors !== '')
        axios.get('http://64.227.161.183/addbranch',{
            params:{
                branch:branch, //branch
                yors:yors      //year/sem
            }
        }).catch(error=>{
            console.log("error branches : "+ error)
        }).then(res=>{
    
            var last:string[] = []
            for (var i = 0 ; i < branches.length ; i++ ){
             last = branches[i]
        
            }
            if (last.length >= 3){
                branches.push([branch])
            }else {
               branches[i].push(branch)
            }
            setOpen(!open)
            setBranch('')
            setyors('')
            console.log("branch res : "+ res)
        
        })
     

    }

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

           <button className="addbtn" onClick={()=>{setOpen(!open)}}>Add a Branch...</button>


           <dialog open = {open} className="branchdialog">

               <div className="dialogself">

                   <div className="subdialogcomp">
                   <button onClick={()=>{setOpen(!open)}}>X</button>
                   </div>
           
                   <text>Enter Branch name</text>

                   <input type="text" onChange={(e)=>{setBranch(e.target.value)}}></input>

                   <text>Enter number of semesters/years</text>
                   <input type="number" onChange={(e)=>{setyors(e.target.value)}}></input>

                <button onClick={()=>{addNewBranch()}}>Submit</button>

               </div>

               

           </dialog>

    
    </div>)
}

export default Branches