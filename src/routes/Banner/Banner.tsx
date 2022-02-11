import React from "react";
import { Button } from "react-bootstrap";
import './Banner.css'


export default class Banner extends React.Component{

constructor(props:any){
super(props);


}



render(){


return(<div className="parent">

<text className="text">Click on the below "Upload" button to upload banners(images).</text>

<button className="btn">UPLOAD</button>

</div>)

}






}