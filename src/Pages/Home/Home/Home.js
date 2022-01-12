import React from "react";
import { Col, Nav, Navbar, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import "./Home.css";
import HrImg from "../../../Images/hr-demo.jpg";
import useAuth from "../../../hook/useAuth";

const Home = () => {
  const {SignOut,user}=useAuth();
 
  return (
    <div>
      <Row>
        <Col className="hr-nav flex-column" md={2}>
          <div className="hr-nav-header">
            <span>ASH-HR</span>
          </div>
          <div className="hr-img-div">
          {user.photoURL ?  <img src={user?.photoURL} alt="" /> :  <img src={HrImg} alt="" /> }
           
            {user.displayName ? <span> {user?.displayName} </span>: <span>HR Name</span> }
           
          </div>
          <div className="text-start mt-4">
           
            <Nav.Link as={Link} to="/" className="dashbord">
              <i className="fas fa-tv dashbord-icon"></i> Dashbord
            </Nav.Link>
            <Nav.Link as={Link} to="/employeelist" className="dashbord">
              <i className="fas fa-users dashbord-icon"></i> Employees
            </Nav.Link>
            <Nav.Link as={Link} to="/addemployee" className="dashbord">
              <i className="fas fa-user-plus dashbord-icon"></i> ADD Employee
            </Nav.Link>
            {
              user.email ? <Nav.Link className="dashbord" onClick={SignOut}><i className="fas fa-sign-out-alt dashbord-icon"></i> SignOut</Nav.Link> :
              <Nav.Link as={Link} to="/signin" className="dashbord"><i className="fas fa-sign-out-alt dashbord-icon"></i> Sign In</Nav.Link>
            }
           
          </div>
        </Col>
        <Col className="hr-nav-row" xs={12} md={10}>
          <Navbar collapseOnSelect expand="lg" className="navbar-div" >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              <div className="nav-row-div">
              <Nav.Link as={Link} to="/" className="dashbord">
              <i className="fas fa-tv dashbord-icon"></i> Dashbord
            </Nav.Link>
            <Nav.Link as={Link} to="/employeelist" className="dashbord">
              <i className="fas fa-users dashbord-icon"></i> Employees
            </Nav.Link>
            <Nav.Link as={Link} to="/addemployee" className="dashbord">
              <i className="fas fa-user-plus dashbord-icon"></i> ADD Employee
            </Nav.Link>
            {
              user.email ? <Nav.Link className="dashbord" onClick={SignOut}><i className="fas fa-sign-out-alt dashbord-icon"></i> SignOut</Nav.Link> :
              <Nav.Link as={Link} to="/signin" className="dashbord"><i className="fas fa-sign-out-alt dashbord-icon"></i> Sign In</Nav.Link>
            }
              </div>
              <Navbar.Text>
              <div className="hr-img-row">
              {user.displayName ? <span> {user?.displayName} </span>: <span>HR Name</span> }
              {user.photoURL ?  <img src={user?.photoURL} alt="" /> :  <img src={HrImg} alt="" /> }
           
          </div>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>

        
          <Outlet></Outlet>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
