import React, { useEffect, useState } from 'react';
import "./HomeDash.css";
const HomeDash = () => {
  const [totalCount, setTotalCount] = useState([]);
  const page=1;
  useEffect(() => {
    fetch(`https://agile-dawn-54726.herokuapp.com/employee?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setTotalCount(data?.numOfResults);
      });
  }, []);

    return (
        <div className="text-start mt-4 p-5 dashbord-div-card">
        <div className="dashbord-div">
          <span>Total Employees</span>
          <br />
          <span>{totalCount}</span>
       <div className="dashbord-div-img">
       <i class="fas fa-users dashbord-div-icon"/>
       </div>
        </div>
      </div>
    );
};

export default HomeDash;