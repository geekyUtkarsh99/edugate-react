import React from "react";
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import './Navigation.css'
import { Radio, RadioGroup} from 'react-radio-group'
import { Link } from "react-router-dom";
import { useState } from "react";

const Navigation = () =>{
    var [color,setColor] = useState(0)

return (
<div className="box">
    <Link to="banner" className="navbutton" style={{"background":(color === 0)?"#1045FF":"#3E3E3E"}} onClick ={()=>{setColor(0)}}>Banner</Link>
    <Link to="questionpapers" className="navbutton" style={{"background":(color === 1)?"#1045FF":"#3E3E3E"}} onClick ={()=>{setColor(1)}}>Question papers</Link>
    <Link to="notes" className="navbutton" style={{"background":(color === 2)?"#1045FF":"#3E3E3E"}} onClick ={()=>{setColor(2)}}>Notes</Link>
    <Link to="paid" className="navbutton" style={{"background":(color === 3)?"#1045FF":"#3E3E3E"}} onClick ={()=>{setColor(3)}}>Paid</Link>
    <Link to="subjects" className="navbutton" style={{"background":(color === 4)?"#1045FF":"#3E3E3E"}} onClick ={()=>{setColor(4)}}>Subjects</Link>
    <Link to="branches" className="navbutton" style={{"background":(color === 5)?"#1045FF":"#3E3E3E"}} onClick ={()=>{setColor(5)}}>Branches</Link>
    <Link to="video" className="navbutton" style={{"background":(color === 6)?"#1045FF":"#3E3E3E"}} onClick ={()=>{setColor(6)}}>video Classes</Link>
</div>
)

}


export default Navigation