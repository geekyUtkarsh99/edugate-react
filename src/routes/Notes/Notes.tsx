import React from "react";
import './Notes.css';
import { useState } from "react";
import { useRef } from "react";


const courseops = [

    {values:"course",label:"Course"},
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




const Notes = () =>{

    var fileref = useRef<HTMLInputElement>(null)
    const [course, setCourse] = useState('Course')
    const [sem,setSemenster] = useState('Semester')

    const onCourseChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{

        setCourse(e.target?.value)
    
    }
    const onSemChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    
        setSemenster(e.target?.value)
    
    }

    const checkAllFilled = () =>{

        if (course !== 'Course' && sem !== 'Semester' )
         return true
        else return false
    }


    const onHandleFileEvent = (e:React.ChangeEvent<HTMLInputElement>) =>{



    }

    return(<div className="parent">
        <text className="text">Fill in the following details (parameters), then click on “Upload file” button to upload notes.</text> 

        <div className="sub_child2">
<select className="dropdown"onChange={(e)=>{onCourseChange(e)}} >
    {
        courseops.map(e=>{
           return <option label={e.label} value ={e.values}/>
        })
    }
</select>

<select className="dropdown" onChange={(e)=>{onSemChange(e)}}>
    {
        semesterops.map(e=>{
           return <option label={e.label} value ={e.values}/>
        })
    }
</select>

</div>


<button className="btn" onClick={()=>{if (fileref.current !== null && checkAllFilled())fileref.current.click()
     else {window.alert("Please select all the options .")}}}>
    UPLOAD FILE
</button>
<input 
ref={fileref}
type = 'file'
accept=".pdf,.doc,.docx"
onChange = {(e)=>{ if (checkAllFilled())if(window.confirm('Upload Document to database ?'))onHandleFileEvent(e)}}
hidden
/>

    </div>)
}


export default Notes;