import React from "react";
import { Col, Nav, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Row>
        <Col xs={12} md={2}>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/addemployee">
            Add Employee
            </Nav.Link>
            <Nav.Link as={Link} to="/employeelist">
            See All Employee
            </Nav.Link>
            {/* <Nav.Link onClick={SignOut}>SignOut</Nav.Link> */}
          </Nav>
        </Col>
        <Col xs={12} md={10}>
          <Outlet></Outlet>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
