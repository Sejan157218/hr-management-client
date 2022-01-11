import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const SeeAllEmployee = () => {
    const [allEmployee, setAllEmployee] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9000/employee')
            .then(res => res.json())
            .then(data => setAllEmployee(data))
    }, []);
    console.log(allEmployee);

    const handlerToDelete = id => {
        console.log(id);
        const proceed = window.confirm('Are You Confirm to delete this');
        if (proceed) {
            axios.delete(`http://localhost:9000/employee/${id}`)
                .then(function (response) {
                    console.log(response);
                    if (response.data.insertId==0) {
                        const filterData = allEmployee.filter(employee => employee.id !== id);
                        setAllEmployee(filterData)
                        alert('successfully deleted');
                    }
                })
        }
    }
  return (
    <div>
      <Table striped bordered hover responsive className="table-custom">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Employee Email</th>
            <th>ACtion</th>
          </tr>
        </thead>
        <tbody>
          {allEmployee.map(employee =>
                        <tr className="mb-2">

                            <td>{employee?.id}</td>
                            <td>{employee?.firstname} {employee?.lastname}</td>
                            <td>{employee?.email}</td>
                          
                            <td><button className="update-btn" onClick={() => handlerToDelete(employee?.id)}><i className="fas fa-trash"></i></button></td>
                        </tr>

                    )}
        </tbody>
      </Table>
    </div>
  );
};

export default SeeAllEmployee;
