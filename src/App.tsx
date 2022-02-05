import React from 'react';
import logo from './logo.svg';
import './App.css';
import Banner from './routes/Banner/Banner';
import Navigator from './navigator/Navigation'
import {Routes,Route,Outlet,Navigate} from 'react-router-dom';
import Qpaper from './routes/Question/Qpaper';
import { Col, Container, Row } from 'react-bootstrap';
import './navigator/Navigation.css'

function SideNav(){

return(
  <>
         <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">      
                      <Navigator />
                    </Col>
                    <Col  xs={10} id="page-content-wrapper">
                       
                    </Col> 
                </Row>

            </Container>
        </>
  )

}


function App() {
  return (
    <>
    <Routes>
      <Route path='/*' element={<SideNav/>}>
      <Route path='banner' element = {<Banner/>}/>
      <Route path='questionpapers' element = {<Qpaper/>}/> 
      <Route path='*' element = {<Navigate to="banner"/>}/>
      </Route>
    </Routes>
    </>
  );
}

export default App;
