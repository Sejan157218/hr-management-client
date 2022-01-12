import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./SeeAllEmployee.css";

const SeeAllEmployee = () => {
  const [loadData,setLoadData]=useState(false)
  const [allEmployee, setAllEmployee] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`https://agile-dawn-54726.herokuapp.com/employee?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setAllEmployee(data.result);
        setPageCount(data.numberOfPages);
      });
  }, [page,loadData]);
  const handlerToDelete = (id) => {
    const proceed = window.confirm("Are You Confirm to delete this");
    if (proceed) {
      axios
        .delete(`https://agile-dawn-54726.herokuapp.com/employee/${id}`)
        .then(function (response) {
          console.log(response);
          if (response.data.insertId == 0) {
            setLoadData(true)
            const filterData = allEmployee.filter(
              (employee) => employee.id !== id
            );
            setAllEmployee(filterData);
            alert("successfully deleted");
            setLoadData(false)
          }
        });
    }
  };

  return (
    <div>
      <Table striped bordered hover responsive className="table-custom">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allEmployee.map((employee) => (
            <tr key={employee?.id} className="mb-2">
              <td>{employee?.firstname}</td>
              <td>{employee?.lastname}</td>
              <td>{employee?.email}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handlerToDelete(employee?.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        {
          <div className="pagination">
            {[...Array(pageCount).keys()].map((number) => (
              <button
                key={number}
                onClick={() => setPage(number + 1)}
              >
                {number + 1}
              </button>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default SeeAllEmployee;
