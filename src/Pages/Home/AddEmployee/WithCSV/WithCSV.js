import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CSVReader } from "react-papaparse";
import axios from "axios";

const WithCSV = () => {
  const [messege, setMessege] = useState("");
  const [filterData, setFilterData] = useState();
  const buttonRef = React.createRef();
  const handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnError = (err, file, inputElem, reason) => {
    setMessege('')
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    setMessege('')
    console.log(data);
  };

  const handleRemoveFile = (e) => {
    setMessege('')
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };
  const handleOnDrop = (data) => {
    setMessege('')
    const regName = /^[a-z ,.'-]+$/i;
    const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const dataFilter = data.filter(
      (dt) =>
        regName.test(dt.data[0]) &&
        regName.test(dt.data[1]) &&
        regEmail.test(dt.data[2])
    );
    // dataFilter.map(dt=>console.log(dt.data))
    setFilterData(dataFilter);
  };

  const handleToPostData = (e) => {
    e.preventDefault();
    filterData.map((dt) =>{
      const data={
        firstname: dt.data[0],
        lastname: dt.data[1],
        email: dt.data[2],
      };
      axios
      .post("https://agile-dawn-54726.herokuapp.com/employee", data)
      .then(function (response) {
        console.log(response);
        if(response.data.insertId >0){
          setMessege('Employee Added Successfully !');
        };
      })
    });
  };

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
            <Link to="">
              <img
                src="http://res.cloudinary.com/dpcloudinary/image/upload/v1506186248/logo.png"
                alt=""
              />
            </Link>
          </div>

          <div id="slideshow">
            <div className="one">
              <h2>
                <span>New Employee</span>
              </h2>
              <p>
                Adding a new employee usually refers to adding a new hire's
                record to the system. This includes adding general details about
                the employees.{" "}
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
                  <CSVReader
                    ref={buttonRef}
                    onError={handleOnError}
                    onDrop={handleOnDrop}
                    addRemoveButton
                    onRemoveFile={handleOnRemoveFile}
                  >
                    {({ file }) => (
                      <>
                        <div
                          style={{
                            border: "1px solid #5a6374",
                            height: "5rem",
                          }}
                          className="input"
                        >
                          <div className="ms-2 mt-2">
                            {!file && <p>Upload file Or Drag File</p>}
                            {file && file.name}
                          </div>
                        </div>
                        {!file && (
                          <button
                            style={{ display: "inline" }}
                            onClick={handleOpenDialog}
                            className="button me-2"
                          >
                            Upload
                          </button>
                        )}
                        {file && (
                          <button
                            style={{ display: "inline" }}
                            onClick={handleRemoveFile}
                            className="button me-2"
                          >
                            Remove
                          </button>
                        )}

                        <button
                          onClick={handleToPostData}
                          style={{ display: "inline" }}
                          className="button"
                        >
                          Submit
                        </button>
                      </>
                    )}
                  </CSVReader>
                </form>
                {messege && <p style={{ color: "#fff" }}>{messege}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithCSV;
