import React from 'react';
import logo from './logo.svg';
import './App.css';
import Banner from './routes/Banner/Banner';
import Navigator from './navigator/Navigation'
import {Routes,Route,Outlet,Navigate,Router} from 'react-router-dom';
import Qpaper from './routes/Question/Qpaper';
import { Col, Container, Row } from 'react-bootstrap';
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

const loginDialog =(state)=>{

  return(<>
  
  

  </>);

}


function App() {
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

    </Container>
  );
}

export default App;
