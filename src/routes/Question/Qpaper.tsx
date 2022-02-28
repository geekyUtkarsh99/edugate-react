import React, { SetStateAction, useRef, useState } from "react";
import './Qpaper.css'
import Select from 'react-select'
import { handleInputChange } from "react-select/dist/declarations/src/utils";
import { read } from "node:fs";
import axios from "axios";
import { type } from "node:os";

const yearops = [
    {values:"Year",label:'Year'},
    {values:"2021",label:'2021'},
    {values:"2022",label:'2022'}
]

const languageops = [
    {values:"lang",label:"Language"},
    {values:"eng",label:"English"},
    {values:"hin",label:"Hindi"}
]

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

function dataURItoBlob(dataURI:any) {
    var byteString = window.atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var bb = new Blob([ab]);
    return bb;
}

const Qpaper = () =>{

    var fileref = useRef<HTMLInputElement>(null)

    const [year,setYear] = useState('Year');
    const [lang , setLanguage] = useState('Language')
    const [course, setCourse] = useState('Course')
    const [sem,setSemenster] = useState('Semester')
    const [filename,setFileName] = useState('')


    const onYearChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{

        setYear(e.target?.value)

    }
    const onLangChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{

        setLanguage(e.target?.value)

    }
    const onCourseChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{

        setCourse(e.target?.value)

    }
    const onSemChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{

        setSemenster(e.target?.value)

    }

    const onHandleFileEvent = (e:React.ChangeEvent<HTMLInputElement>) =>{
        let reader = new FileReader()
    
        let file = null;

         e.target.files instanceof FileList
        ?file = e.target.files[0] : Error('null value')

        reader.readAsDataURL(file as Blob)
        setFileName(file?.name as SetStateAction<string>)

        let type = file?.type


        reader.onload = (e) =>{
       
            let formdata = new FormData()
            formdata.append('year',year)
            formdata.append('course',course)
            formdata.append('sem',sem)
            formdata.append('lang',lang)
            console.log(filename)
            formdata.append('filename',filename)
            let blob = dataURItoBlob(e.target?.result)
            console.log("blob : "+blob)
            formdata.append('file',blob)
            // let blob = fetch(e.target?.result as RequestInfo).then(async r =>{formdata.append('file',await r.blob())})
            // .then(()=>{
                axios.post('http://64.227.161.183/addquestions',formdata,{
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                }).catch(error =>{
                    console.log("erro from axios:"+error)
                })
            // }).catch(error=>{
            //     console.log("error from blob:"+error)
            // })
        }
        e.target.value = '';

    }

    const checkAllFilled = () =>{

        if (year !== 'Year' && lang !== 'Language' && course !== 'Course' && sem !== 'Semester' )
         return true
        else return false
    }

    return(<div className="box">

<text className="text">Fill in the following details (parameters), then click on “Upload file” button to upload question paper.</text>

{/* <Select  className="dropdown" options={options}/> */}

<div className="sub_child1">
<select className="dropdown" onChange={(e)=>{onYearChange(e)}} >
    {
        yearops.map(e=>{
           return <option label={e.label} value ={e.values} />
        })
    }
</select>

<select className="dropdown" onChange={(e)=>{onLangChange(e)}}>
    {
        languageops.map(e=>{
           return <option label={e.label} value ={e.values}/>
        })
    }
</select>

</div>

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
     else {window.alert("Please select all the options .")}}} >
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


export default Qpaper;