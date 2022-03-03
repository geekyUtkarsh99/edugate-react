import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import './Banner.css'
import { useState } from "react";
import { resolve } from "node:path/win32";
import { read } from "node:fs";
import axios from "axios";

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

const Banner = () =>{

    const fileRef = React.useRef<HTMLInputElement>(null);

    const upload = (e:React.ChangeEvent<HTMLInputElement>) =>{
        
        let reader = new FileReader()
        e.target.files instanceof FileList
            ?reader.readAsDataURL(e.target.files[0]): Error('null value detected')
        reader.onload = (e)=>{

            let formdata = new FormData()
           var blob = fetch(e.target?.result as RequestInfo).then(async r=>{formdata.append('banner',await r.blob())})
           .then(()=>{
               console.log(formdata.get('banner'))
            var res =  axios.post('http://64.227.161.183/addbanner',formdata,{
                headers:{
                 'Content-Type': 'multipart/form-data'
                }
            })
            res.then(response=>{
                console.log(response)
            }).catch(error =>{
                console.log(error)
            })
           }) 
        //    formdata.append('banner',blob)
        
    }
    
    }

   

return(


<div className="parent">
<meta name="viewport"/>

<text className="text">Click on the below "Upload" button to upload banners(images).</text>


<label htmlFor="contained-button-file">
<button className="btn" onClick={()=>{if (fileRef.current !== null)fileRef.current.click()}}>UPLOAD</button>
</label>
<input
ref = {fileRef}
type='file'
accept="image/*"
style={{ display: 'none' }}
id="contained-button-file"
onChange={(e)=>{if (window.confirm('Upload document to database ?')) upload(e)}}
hidden
/>
</div>

)

}


export default Banner;