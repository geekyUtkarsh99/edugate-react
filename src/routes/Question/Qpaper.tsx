import React from "react";
import './Qpaper.css'
import Select from 'react-select'

const yearops = [
    {values:"1",label:'Year'},
    {values:"1",label:'2021'},
    {values:"1",label:'2022'}
]

const languageops = [
    {values:"eng",label:"Language"},
    {values:"eng",label:"English"},
    {values:"hin",label:"Hindi"}
]

const courseops = [

    {values:"btech",label:"Course"},
    {values:"btech",label:"B.Tech"},
    {values:"bsc",label:"B.sc"}
]


const semesterops = [
    
    {values:"sem",label:"Semester"},
    {values:"1",label:"1st"},
    {values:"2",label:"2nd"},
    {values:"3",label:"3rd"},
    {values:"4",label:"4th"},
    {values:"5",label:"5th"},
    {values:"6",label:"6th"},
    {values:"7",label:"7th"},
    {values:"8",label:"8th"},
]


const Qpaper = () =>{
    return(<div className="box">

<text className="text">Fill in the following details (parameters), then click on “Upload file” button to upload question paper.</text>

{/* <Select  className="dropdown" options={options}/> */}

<div className="sub_child1">
<select className="dropdown" >
    {
        yearops.map(e=>{
           return <option label={e.label} value ={e.values}/>
        })
    }
</select>

<select className="dropdown" >
    {
        languageops.map(e=>{
           return <option label={e.label} value ={e.values}/>
        })
    }
</select>

</div>

<div className="sub_child2">
<select className="dropdown" >
    {
        courseops.map(e=>{
           return <option label={e.label} value ={e.values}/>
        })
    }
</select>

<select className="dropdown" >
    {
        semesterops.map(e=>{
           return <option label={e.label} value ={e.values}/>
        })
    }
</select>

</div>

<button className="btn" >
    UPLOAD FILE
</button>
 


</div>)
}


export default Qpaper;