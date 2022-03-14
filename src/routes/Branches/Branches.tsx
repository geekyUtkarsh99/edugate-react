import React, { SetStateAction, useEffect, useState } from "react";
import './Branches.css'
import { Row,Col } from "react-bootstrap";
import axios from "axios";
import { listenerCount } from "process";

interface single{
    branch:string;
    sem:string;
    year:string
}

interface branches{
    branch:Array<single>;
    status:number;
}


const Branches = () =>{

    const [branches,setBranches] = useState<Array<Array<string>>>([])
    const [open,setOpen] = useState(false)
    const [brc,setBRC] = useState<branches>()
    const [didRun,setDidRun] = useState(false)

    const [branch,setBranch] = useState('')
    const [sem,setsems] = useState('')
    const [year,setyear] = useState('')

    // useEffect(()=>{
        
    //     return ()=>{setDidRun(true)}
    // },[])

    if (!didRun)
        axios.get<branches>('http://64.227.161.183/getbranch').then(
            res=>{
               setBRC(res.data)
               console.log("branches rec : "+brc?.branch[0].branch)
               var list:string[] = []
               if (brc?.branch.length !== undefined)
               if (brc?.branch.length > 3){
               brc.branch.forEach(branch=>{
                 
                   if (list.length < 3){
                       list.push(branch.branch)
                   }else {
                       branches.push(list)
                       list = [] //refresh
                   }
               })
            }else {
               brc.branch.forEach(branch=>{
                   list.push(branch.branch)
               })
               branches.push(list)
            }
        
               setDidRun(true)
               window.location.reload()
            }
        ).catch(exp=>{
            console.log("axios error : " + exp)
            setDidRun(true)
        })


    const refresh =()=>{
        axios.get<branches>('http://64.227.161.183/getbranch').then(
            res=>{
               setBRC(res.data)
               setBranches([])
               console.log("branches rec : "+brc?.branch[0].branch)
               var list:string[] = []
               if (brc?.branch.length !== undefined)
               if (brc?.branch.length > 3){
               brc.branch.forEach(branch=>{
                 
                   if (list.length < 3){
                       list.push(branch.branch)
                   }else {
                       setBranches(old =>[...old,list])
                       list = [] //refresh
                   }
               })
            }else {
               brc.branch.forEach(branch=>{
                   list.push(branch.branch)
               })
               setBranches(old =>[...old,list])
            }
               setDidRun(true)
            }
        ).catch(exp=>{
            console.log("axios error : " + exp)
            setDidRun(true)
        })
    }

    const addNewBranch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{

        if (branch !== "" && sem !== '' && year !== '')
        axios.get('http://64.227.161.183/addbranch',{
            params:{
                branch:branch, //branch
                sem:sem,       //sem
                year:year      //year
            }
        }).catch(error=>{
            console.log("error branches : "+ error)
        }).then(res=>{
    
            // var last:string[] = []
            // if (branches !== undefined)
            // for (var i = 0 ; i < branches.length ; i++ ){
            //  last = branches[i]
        
            // }
            // if (last.length >= 3){
            //     branches.push([branch])
            // }else {
            //    branches[i].push(branch)
            // }

            setOpen(!open)
            setBranch('')
            setsems('')
            setyear('')
            refresh()
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


                <button className="butn" onClick={(e)=>{addNewBranch(e)}}>Submit</button>

               </div>

               

           </dialog>

    
    </div>)
}

export default Branches