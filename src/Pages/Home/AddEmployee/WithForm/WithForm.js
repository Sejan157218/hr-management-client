import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./WithForm..css";

const WithForm = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});

  const handlerOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newData = { ...formData };
    newData[field] = value;
    setFormData(newData);
  };

  const handleToSubmit = (e) => {
    const regName = /^[a-z ,.'-]+$/i;
    const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regName.test(formData.firstname)) {
      setError("Invalid First Name Given.");
    } else if (!regName.test(formData.lastname)) {
      setError("Invalid Last Name Given..");
    } else if (!regEmail.test(formData.email)) {
      setError("Invalid Email.");
    } else {
     
      setError("");
      axios
        .post("https://agile-dawn-54726.herokuapp.com/employee", formData)
        .then(function (response) {
          console.log(response);
          if(response.data.insertId >0){
            setFormData("")
            alert('Employee Added Successfully !');
          };
        })
       
     
    }
    e.preventDefault();
  };
  console.log(error);
  return (
    <div className="login">
      <div className="wrap">
        <div id="toggle-wrap">
          <div id="toggle-terms">
            <div id="cross"></div>
          </div>
        </div>

        <div className="content">
          <div className="logo">
            <a href="#">
              <img
                src="http://res.cloudinary.com/dpcloudinary/image/upload/v1506186248/logo.png"
                alt=""
              />
            </a>
          </div>

          <div id="slideshow">
            <div className="one">
              <h2>
                <span>New Employee</span>
              </h2>
              <p>
                Adding a new employee usually refers to adding a new hire's
                record to the system. This includes adding general details about
                the employees.
              </p>
            </div>
          </div>
        </div>

        <div className="user">
          <div className="actions">
            <Link to="/addemployee">With Form</Link>
            <Link to="/addemployee/withcsv">With CSV File</Link>
          </div>

          <div className="form-wrap">
            <div className="tabs-content">
              <div id="login-tab-content" className="active">
                <form className="login-form" action="" method="post">
                  <input
                    onChange={handlerOnBlur}
                    name="firstname"
                    type="text"
                    className="input"
                  
                    placeholder="First Name"
                  />
                  <input
                    onChange={handlerOnBlur}
                    name="lastname"
                    type="text"
                    className="input"
               
                    placeholder="Last Name"
                  />
                  <input
                    onChange={handlerOnBlur}
                    name="email"
                    type="email"
                    className="input"
               
                    placeholder="Email"
                    required
                  />

                  <input
                    onClick={handleToSubmit}
                    type="submit"
                    className="button"
                    value="Submit"
                  />
                </form>
                {error && <p style={{ color: "#fff" }}>{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithForm;
