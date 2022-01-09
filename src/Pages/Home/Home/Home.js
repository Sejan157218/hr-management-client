import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link, Outlet, Route ,Routes} from "react-router-dom";
import AddEmployee from "../AddEmployee/AddEmployee/AddEmployee";

import SeeAllEmployee from "../SeeAllEmployee/SeeAllEmployee";

const Home = () => {
  return (
    <div>
      <Row>
        <Col xs={12} md={2}>
         <Link to="/addemployee">AddEmployee</Link>
         <br />
         <Link to="/employeelist">SeeAllEmployee</Link>
        </Col>
        <Col xs={12} md={10}>
            <Outlet></Outlet>
       
        </Col>
      </Row>
    </div>
  );
};

export default Home;
