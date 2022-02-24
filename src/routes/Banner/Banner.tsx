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

    const fileRef = useRef

    const upload = (e:React.ChangeEvent<HTMLInputElement>) =>{
        let reader = new FileReader()
        e.target.files instanceof FileList
            ?reader.readAsDataURL(e.target.files[0]): Error('null value detected')
        reader.onload = (e)=>{
            var result = e.target?.result
           console.log(result)
           var blob = dataURItoBlob(result)
           console.log(blob.stream)
           let formdata = new FormData()
           formdata.append('banner',blob)
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
        }
    }

   

return(<div className="parent">

<text className="text">Click on the below "Upload" button to upload banners(images).</text>


<label htmlFor="contained-button-file">
<button className="btn">UPLOAD</button>
</label>
<input
type='file'
accept="image/*"
style={{ display: 'none' }}
id="contained-button-file"
onChange={(e)=>{upload(e)}}
/>
</div>)

}


export default Banner;