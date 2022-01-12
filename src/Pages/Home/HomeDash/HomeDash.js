import React from 'react';
import "./HomeDash.css";
const HomeDash = () => {
    return (
        <div className="text-start mt-4 p-5 dashbord-div-card">
        <div className="dashbord-div">
          <span>Total Employees</span>
          <br />
          <span>25</span>
       <div className="dashbord-div-img">
       <i class="fas fa-users dashbord-div-icon"/>
       </div>
        </div>
      </div>
    );
};

export default HomeDash;