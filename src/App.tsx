import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Banner from './routes/Banner/Banner';
import Navigator from './navigator/Navigation'
import {Routes,Route,Outlet,Navigate,Router} from 'react-router-dom';
import Qpaper from './routes/Question/Qpaper';
import { Anchor, Col, Container, Row } from 'react-bootstrap';
import './navigator/Navigation.css'
import Notes from './routes/Notes/Notes';
import Paid from './routes/Paid/Paid'
import Subjects from './routes/Subjects/Subjects';
import Branches from './routes/Branches/Branches';
import VideoClasses from './routes/Video/VideoClasses';

function SideNav(){

return(
  <>
         <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">      
                      <Navigator />
                    </Col>
                    <Col  xs={10} id="page-content-wrapper">
                       <Outlet/>
                    </Col> 
                </Row>

            </Container>
        </>
  )

}




function App() {

  const [loginopen,setLoginOpen] = useState(false)

  const loginDialog =(state:boolean)=>{

    return(<dialog open={false} className ="dialoglogin">
  
  <div className='dialoginterns'>
  <text className='txt'>Login</text>
  
  <input className='edittext' type="text" placeholder='username/email'></input>
  
  <input className='edittext' type="text" placeholder='password'></input>
  
  <button className='butn'  onClick={()=>{setLoginOpen(false)}}>Login</button>
  
  <div style={{
    "display":"flex",
    "flexDirection":"row",
    "margin":"6px"
  }}>
  <text className='txt'>don't have an account ?</text>
  <Anchor onClick={()=>{setLoginOpen(false)}}>Sign up</Anchor>
  </div>
  
  
  
  
  
  
  </div>
  
    </dialog>);
  
  }

  return (
    <Container className='App'>
    <SideNav/>
    {/* <Navigator/> */}
    <Routes >
      {/* <Route path='/*' element={<><Navigator /></>}>
      <Route path='banner' element ={<Banner/>}/>
      <Route path='questionpapers' element = {<Qpaper/>}/> 
      <Route path='notes' element={<Notes/>}/>
      <Route path = "paid" element={<Paid/>}/>
      <Route path='subjects' element={<Subjects/>}/>
      <Route path='branches' element={<Branches/>}/>
      <Route path='video' element={<VideoClasses/>}/>
      <Route path='*' element={<Banner/>}/>
      </Route> */}

       <Route path='/' element ={<Banner/>}/>
      <Route path='questionpapers' element = {<Qpaper/>}/> 
      <Route path='notes' element={<Notes/>}/>
      <Route path = "paid" element={<Paid/>}/>
      <Route path='subjects' element={<Subjects/>}/>
      <Route path='branches' element={<Branches/>}/>
      <Route path='video' element={<VideoClasses/>}/>
      {/* <Route path='/' element ={<Navigate replace to='/Banner'/> }/> */}
    </Routes>
    {/* {loginDialog(false)}  */}
    </Container>
  );
}

export default App;
