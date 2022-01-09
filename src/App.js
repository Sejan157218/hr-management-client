
import {BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Pages/Home/Home/Home";

import SeeAllEmployee from "./Pages/Home/SeeAllEmployee/SeeAllEmployee";
import AddEmployee from "./Pages/Home/AddEmployee/AddEmployee/AddEmployee";
import WithForm from "./Pages/Home/AddEmployee/WithForm/WithForm";
import WithCSV from "./Pages/Home/AddEmployee/WithCSV/WithCSV";

function App() {
  return (
    <div className="App">
     <Router>
     <Routes>
        <Route path="/" element={<Home />} >
          <Route path="addemployee" element={<AddEmployee />} >
            <Route path="" element={<WithForm />} />
            <Route path="withcsv" element={<WithCSV />} />
          </Route>
          <Route path="employeelist" element={<SeeAllEmployee />} />
          
        </Route>
        
      </Routes>
     </Router>
    </div>
  );
}

export default App;
