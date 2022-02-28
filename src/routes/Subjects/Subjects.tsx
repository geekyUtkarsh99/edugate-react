import React, { useState } from "react";

const courseops = [

    {values:"course",label:"Course"},
    {values:"btech",label:"B.Tech"},
    {values:"bsc",label:"B.sc"}
]


const subjectops = [
    {values:'subject',label:'subject'},
    {values:'cse',label:'Computer Science'}
]



const Subjects  =()=>{

    const [course, setCourse] = useState('Course')
    const [subject, setsubject] = useState('Course')
    const onCourseChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{

        setCourse(e.target?.value)
    
    }
    const onSubjectChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{

        setsubject(e.target?.value)
    
    }

    return(<div className="parent">

        <text className="text">Choose the Course and any Subject of that course.</text>

<div className="sub_child1">

<select className="dropdown"onChange={(e)=>{onCourseChange(e)}} >
    {
        courseops.map(e=>{
           return <option label={e.label} value ={e.values}/>
        })
    }
</select>

<select className="dropdown"onChange={(e)=>{onSubjectChange(e)}} >
    {
        subjectops.map(e=>{
           return <option label={e.label} value ={e.values}/>
        })
    }
</select>



</div>

    </div>)
}


export default Subjects