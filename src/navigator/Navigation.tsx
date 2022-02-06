import React from "react";
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import './Navigation.css'
import { Radio, RadioGroup} from 'react-radio-group'
import { Link } from "react-router-dom";
import { useState } from "react";

const Navigation = () =>{
    var [color,setColor] = useState(true)

return (
<div className="box">
    <Link to="banner" className="navbutton" style={{"background":color?"#3E3E3E":"#1045FF"}} onClick ={()=>{setColor(!color)}}>Banner</Link>
    <Link to="questionpapers" className="navbutton">Question papers</Link>
    <Link to="notes" className="navbutton">Notes</Link>
    <Link to="paid" className="navbutton">Paid</Link>
    <Link to="subjects" className="navbutton">Subjects</Link>
    <Link to="branches" className="navbutton">Branches</Link>
    <Link to="video" className="navbutton">video Classes</Link>
</div>
)

}


export default Navigation