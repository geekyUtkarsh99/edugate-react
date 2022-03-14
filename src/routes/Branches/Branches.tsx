import React, { SetStateAction, useState } from "react";
import './Branches.css'
import { Row,Col } from "react-bootstrap";
import axios from "axios";
import { listenerCount } from "process";


const Branches = () =>{

    const [branches,setBranches] = useState([['mba','bba','mca'],['btech','mtech','ds']])
    const [open,setOpen] = useState(false)

    const [branch,setBranch] = useState('')
    const [yors,setsems] = useState('')
    const [year,setyear] = useState('')

    const addNewBranch = ()=>{

        if (branch !== "" && yors !== '')
        axios.get('http://64.227.161.183/addbranch',{
            params:{
                branch:branch, //branch
                sem:yors      //sem
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
            setsems('')
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
                   <button className="butn" onClick={()=>{setOpen(!open)}}>X</button>
                   </div>
           
                   <text className="dialtext">Enter Branch name</text>

                   <input className="edittext" type="text" onChange={(e)=>{setBranch(e.target.value)}}></input>

                   <text className="dialtext">Enter number of semesters</text>
                   <input className="edittext" type="number" onChange={(e)=>{setsems(e.target.value)}}></input>

                   <text className="dialtext">Enter number of Years</text>
                   <input className="edittext" type="number" onChange={(e)=>{setyear(e.target.value)}}></input>


                <button className="butn" onClick={()=>{addNewBranch()}}>Submit</button>

               </div>

               

           </dialog>

    
    </div>)
}

export default Branches