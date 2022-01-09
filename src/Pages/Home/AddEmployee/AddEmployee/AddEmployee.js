import React from "react";
import {  Outlet} from "react-router-dom";

import "./AddEmployee.css";

const AddEmployee = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default AddEmployee;
